import { supabase } from '@/utils/supabase/client';

export interface Meeting {
  id?: string;
  room_code: string;
  title: string;
  host_name: string;
  plan: 'inicial' | 'profissional' | 'empresarial';
  status: 'active' | 'scheduled' | 'ended';
  max_participants: number;
  duration_limit_minutes: number;
  created_at?: string;
  scheduled_for?: string | null;
  ended_at?: string | null;
}

export interface MeetingParticipant {
  id?: string;
  room_code: string;
  username: string;
  is_host: boolean;
  joined_at?: string;
  left_at?: string | null;
}

export interface MeetingNote {
  id?: string;
  room_code: string;
  author_name: string;
  content: string;
  created_at?: string;
}

// Local Storage Fallback helpers for resilience if Supabase tables haven't been created in the Dashboard yet
const LOCAL_STORAGE_KEY = 'quickmeet_meetings_cache';
const LOCAL_PARTICIPANTS_KEY = 'quickmeet_participants_cache';
const LOCAL_NOTES_KEY = 'quickmeet_notes_cache';

function getLocalMeetings(): Record<string, Meeting> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalMeeting(meeting: Meeting) {
  if (typeof window === 'undefined') return;
  try {
    const meetings = getLocalMeetings();
    meetings[meeting.room_code] = meeting;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(meetings));
  } catch (err) {
    console.warn('Erro ao salvar em cache local:', err);
  }
}

export const meetingService = {
  /**
   * Regra de Negócio 1 & 2: Criar ou Entrar na Reunião com Verificação de Limites do Plano
   */
  async registerOrJoinMeeting(
    roomCode: string,
    username: string,
    options?: { title?: string; plan?: 'inicial' | 'profissional' | 'empresarial' }
  ): Promise<{
    meeting: Meeting;
    isHost: boolean;
    error?: string;
  }> {
    const cleanRoom = roomCode.toLowerCase().trim();
    const cleanUser = username.trim();
    const plan = options?.plan || 'inicial';

    // Regras de negócio por plano
    const maxParticipants = plan === 'profissional' ? 100 : plan === 'empresarial' ? 500 : 5;
    const durationLimit = plan === 'inicial' ? 40 : 0; // 0 = ilimitado

    try {
      // 1. Verificar se a sala já existe no Supabase
      const { data: existingMeeting, error: fetchErr } = await supabase
        .from('meetings')
        .select('*')
        .eq('room_code', cleanRoom)
        .single();

      if (fetchErr && fetchErr.code !== 'PGRST116' && fetchErr.code !== 'PGRST205') {
        console.warn('Supabase fetch aviso:', fetchErr.message);
      }

      let currentMeeting: Meeting;
      let isHost = false;

      if (existingMeeting) {
        currentMeeting = existingMeeting;

        // Regra de Negócio: Verificar se a reunião foi encerrada
        if (currentMeeting.status === 'ended') {
          // Reabrir sala se quem está a entrar é o próprio anfitrião
          if (currentMeeting.host_name.toLowerCase() === cleanUser.toLowerCase()) {
            await supabase
              .from('meetings')
              .update({ status: 'active', ended_at: null })
              .eq('room_code', cleanRoom);
            currentMeeting.status = 'active';
            isHost = true;
          } else {
            return {
              meeting: currentMeeting,
              isHost: false,
              error: 'Esta reunião já foi encerrada pelo anfitrião.',
            };
          }
        } else {
          isHost = currentMeeting.host_name.toLowerCase() === cleanUser.toLowerCase();
        }

        // Regra de Negócio: Verificar limite de participantes activos
        const { count } = await supabase
          .from('meeting_participants')
          .select('*', { count: 'exact', head: true })
          .eq('room_code', cleanRoom)
          .is('left_at', null);

        if (count && count >= currentMeeting.max_participants) {
          return {
            meeting: currentMeeting,
            isHost,
            error: `Limite de participantes atingido para o plano ${currentMeeting.plan.toUpperCase()} (Máximo de ${currentMeeting.max_participants} participantes).`,
          };
        }
      } else {
        // Criar nova Reunião - o primeiro a entrar torna-se o Anfitrião
        isHost = true;
        currentMeeting = {
          room_code: cleanRoom,
          title: options?.title || `Reunião ${cleanRoom}`,
          host_name: cleanUser,
          plan,
          status: 'active',
          max_participants: maxParticipants,
          duration_limit_minutes: durationLimit,
          created_at: new Date().toISOString(),
        };

        const { error: insertErr } = await supabase
          .from('meetings')
          .insert([currentMeeting]);

        if (insertErr) {
          console.warn('Supabase insert aviso (usando cache local se tabela ausente):', insertErr.message);
          saveLocalMeeting(currentMeeting);
        }
      }

      // Registo de Entrada do Participante
      await supabase.from('meeting_participants').insert([
        {
          room_code: cleanRoom,
          username: cleanUser,
          is_host: isHost,
          joined_at: new Date().toISOString(),
        },
      ]);

      saveLocalMeeting(currentMeeting);

      return {
        meeting: currentMeeting,
        isHost,
      };
    } catch (err) {
      console.error('Erro na camada de serviço de reuniões:', err);
      // Fallback gracioso local
      const fallbackMeeting: Meeting = {
        room_code: cleanRoom,
        title: options?.title || `Reunião ${cleanRoom}`,
        host_name: cleanUser,
        plan,
        status: 'active',
        max_participants: maxParticipants,
        duration_limit_minutes: durationLimit,
      };
      saveLocalMeeting(fallbackMeeting);

      return {
        meeting: fallbackMeeting,
        isHost: true,
      };
    }
  },

  /**
   * Regra de Negócio 3: Saída ou Encerramento da Reunião
   */
  async leaveOrEndMeeting(
    roomCode: string,
    username: string,
    endForAll: boolean = false
  ): Promise<void> {
    const cleanRoom = roomCode.toLowerCase().trim();
    const cleanUser = username.trim();

    try {
      // 1. Registar saída do participante
      await supabase
        .from('meeting_participants')
        .update({ left_at: new Date().toISOString() })
        .eq('room_code', cleanRoom)
        .eq('username', cleanUser)
        .is('left_at', null);

      // 2. Se for anfitrião e optar por encerrar para todos
      if (endForAll) {
        await supabase
          .from('meetings')
          .update({
            status: 'ended',
            ended_at: new Date().toISOString(),
          })
          .eq('room_code', cleanRoom);
      }
    } catch (err) {
      console.warn('Erro ao actualizar saída no Supabase:', err);
    }
  },

  /**
   * Regra de Negócio 4: Gestão de Notas & Atas em Tempo Real
   */
  async addMeetingNote(roomCode: string, authorName: string, content: string): Promise<MeetingNote | null> {
    try {
      const note: MeetingNote = {
        room_code: roomCode.toLowerCase().trim(),
        author_name: authorName.trim(),
        content: content.trim(),
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('meeting_notes')
        .insert([note])
        .select()
        .single();

      if (error) {
        console.warn('Aviso notas Supabase:', error.message);
        return note;
      }
      return data || note;
    } catch {
      return null;
    }
  },

  async getMeetingNotes(roomCode: string): Promise<MeetingNote[]> {
    try {
      const { data, error } = await supabase
        .from('meeting_notes')
        .select('*')
        .eq('room_code', roomCode.toLowerCase().trim())
        .order('created_at', { ascending: true });

      if (error) return [];
      return data || [];
    } catch {
      return [];
    }
  },

  /**
   * Regra de Negócio 5: Agendamento de Reuniões Futuras
   */
  async scheduleMeeting(params: {
    roomCode: string;
    title: string;
    hostName: string;
    scheduledFor: string;
    plan?: 'inicial' | 'profissional' | 'empresarial';
  }): Promise<{ meeting?: Meeting; error?: string }> {
    const cleanRoom = params.roomCode.toLowerCase().trim();
    const plan = params.plan || 'inicial';

    const newMeeting: Meeting = {
      room_code: cleanRoom,
      title: params.title.trim(),
      host_name: params.hostName.trim(),
      plan,
      status: 'scheduled',
      max_participants: plan === 'profissional' ? 100 : 5,
      duration_limit_minutes: plan === 'inicial' ? 40 : 0,
      scheduled_for: params.scheduledFor,
      created_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase
        .from('meetings')
        .insert([newMeeting])
        .select()
        .single();

      if (error) {
        saveLocalMeeting(newMeeting);
        return { meeting: newMeeting };
      }

      saveLocalMeeting(data);
      return { meeting: data };
    } catch (err: any) {
      saveLocalMeeting(newMeeting);
      return { meeting: newMeeting };
    }
  },

  /**
   * Regra de Negócio 6: Obter Reuniões Recentes do Utilizador
   */
  async getRecentMeetings(username?: string): Promise<Meeting[]> {
    try {
      if (username) {
        const { data, error } = await supabase
          .from('meetings')
          .select('*')
          .eq('host_name', username)
          .order('created_at', { ascending: false })
          .limit(10);

        if (!error && data && data.length > 0) {
          return data;
        }
      }

      // Fallback para cache local
      const local = getLocalMeetings();
      return Object.values(local).slice(0, 10);
    } catch {
      const local = getLocalMeetings();
      return Object.values(local).slice(0, 10);
    }
  },
};

