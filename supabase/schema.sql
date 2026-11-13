-- QUICK MEET - Esquema de Base de Dados Supabase (PostgreSQL)
-- Plataforma Moçambicana de Videoconferência

-- 1. Tabela de Reuniões (Meetings / Salas)
CREATE TABLE IF NOT EXISTS public.meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  host_name VARCHAR(150) NOT NULL,
  plan VARCHAR(50) DEFAULT 'inicial', -- 'inicial', 'profissional', 'empresarial'
  status VARCHAR(50) DEFAULT 'active', -- 'scheduled', 'active', 'ended'
  max_participants INT DEFAULT 5,
  duration_limit_minutes INT DEFAULT 40,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE
);

-- 2. Tabela de Participantes da Reunião
CREATE TABLE IF NOT EXISTS public.meeting_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code VARCHAR(100) NOT NULL,
  username VARCHAR(150) NOT NULL,
  is_host BOOLEAN DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  left_at TIMESTAMP WITH TIME ZONE
);

-- 3. Tabela de Notas e Atas da Reunião (Colaboração e IA)
CREATE TABLE IF NOT EXISTS public.meeting_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code VARCHAR(100) NOT NULL,
  author_name VARCHAR(150) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_notes ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso Público para Leitura, Inserção e Actualização com Chave Anon
CREATE POLICY "Permitir leitura publica de reunioes" 
  ON public.meetings FOR SELECT USING (true);

CREATE POLICY "Permitir criacao publica de reunioes" 
  ON public.meetings FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualizacao publica de reunioes" 
  ON public.meetings FOR UPDATE USING (true);

CREATE POLICY "Permitir leitura publica de participantes" 
  ON public.meeting_participants FOR SELECT USING (true);

CREATE POLICY "Permitir registo de participantes" 
  ON public.meeting_participants FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir actualizacao de participantes" 
  ON public.meeting_participants FOR UPDATE USING (true);

CREATE POLICY "Permitir leitura e criacao de notas" 
  ON public.meeting_notes FOR ALL USING (true);



-- ==============================================================================
-- 4. TABELAS DE UTILIZADORES, SUBSCRIÇÕES E FATURAÇÃO (ECOMMERCE & PAYSUITE)
-- ==============================================================================

-- Tabela de Perfis de Utilizador
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  province VARCHAR(100) DEFAULT 'Maputo Cidade',
  plan VARCHAR(50) DEFAULT 'inicial' CHECK (plan IN ('inicial', 'profissional', 'empresarial')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Subscrições
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan VARCHAR(50) NOT NULL DEFAULT 'profissional' CHECK (plan IN ('inicial', 'profissional', 'empresarial')),
  status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'cancelled', 'expired')),
  billing_period VARCHAR(20) NOT NULL DEFAULT 'mensal' CHECK (billing_period IN ('mensal', 'anual')),
  amount NUMERIC(10, 2) NOT NULL DEFAULT 550.00,
  currency VARCHAR(10) NOT NULL DEFAULT 'MZN',
  gateway VARCHAR(50) DEFAULT 'paysuite',
  paysuite_payment_id VARCHAR(100),
  paysuite_link_url TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela de Faturas / Recibos
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL DEFAULT 'Subscrição Quick Meet',
  amount NUMERIC(10, 2) NOT NULL DEFAULT 550.00,
  currency VARCHAR(10) NOT NULL DEFAULT 'MZN',
  status VARCHAR(50) NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  gateway VARCHAR(50) DEFAULT 'paysuite',
  payment_method VARCHAR(50),
  paid_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON public.invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_order_number ON public.invoices(order_number);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Utilizador pode ver o seu proprio perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Utilizador pode atualizar o seu proprio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Insercao de perfil permitida"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id OR auth.role() = 'service_role' OR auth.role() = 'anon');

CREATE POLICY "Utilizador pode ver as suas proprias subscricoes"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Utilizador pode criar/atualizar a sua subscricao"
  ON public.subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Utilizador pode atualizar a sua subscricao"
  ON public.subscriptions FOR UPDATE
  USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "Utilizador pode ver as suas proprias faturas"
  ON public.invoices FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Inserir faturas autorizadas"
  ON public.invoices FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');

-- Gatilho para criação automática de perfil ao registar em auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, plan)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Utilizador Quick Meet'),
    new.email,
    COALESCE(new.raw_user_meta_data->>'plan', 'inicial')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
