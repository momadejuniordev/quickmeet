"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";

export type UserPlan = "inicial" | "profissional" | "empresarial";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: AuthError | null; user: User | null }>;
  signOut: () => Promise<void>;
  updateFullName: (fullName: string) => Promise<{ error: any }>;
  updatePlan: (plan: UserPlan) => Promise<void>;
  userFullName: string;
  userPlan: UserPlan;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signInWithEmail: async () => ({ error: null }),
  signUpWithEmail: async () => ({ error: null, user: null }),
  signOut: async () => {},
  updateFullName: async () => ({ error: null }),
  updatePlan: async () => {},
  userFullName: "",
  userPlan: "inicial",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [localPlan, setLocalPlan] = useState<UserPlan>("inicial");

  useEffect(() => {
    // 1. Obter sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser?.user_metadata?.plan) {
        setLocalPlan(currentUser.user_metadata.plan);
      } else if (typeof window !== "undefined") {
        const cached = localStorage.getItem("quickmeet_user_plan") as UserPlan;
        if (cached) setLocalPlan(cached);
      }
      setIsLoading(false);
    });

    // 2. Ouvir alterações no estado de autenticação em tempo real
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser?.user_metadata?.plan) {
        setLocalPlan(currentUser.user_metadata.plan);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          plan: "inicial",
        },
      },
    });
    return { error, user: data.user };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    if (typeof window !== "undefined") {
      localStorage.removeItem("quickmeet_user_plan");
    }
    setLocalPlan("inicial");
  };

  const updateFullName = async (fullName: string) => {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
      },
    });
    if (!error && data.user) {
      setUser(data.user);
      try {
        await supabase
          .from("profiles")
          .update({ full_name: fullName, updated_at: new Date().toISOString() })
          .eq("id", data.user.id);
      } catch {
        // Silently continue if profiles table is not yet migrated
      }
    }
    return { error };
  };

  const updatePlan = async (plan: UserPlan) => {
    setLocalPlan(plan);
    if (typeof window !== "undefined") {
      localStorage.setItem("quickmeet_user_plan", plan);
    }
    if (user) {
      await supabase.auth.updateUser({
        data: {
          plan,
        },
      });
      try {
        await supabase
          .from("profiles")
          .update({ plan, updated_at: new Date().toISOString() })
          .eq("id", user.id);
      } catch {
        // Silently continue if profiles table is not yet migrated
      }
    }
  };

  const userFullName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "";

  const userPlan: UserPlan = (user?.user_metadata?.plan as UserPlan) || localPlan || "inicial";

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        updateFullName,
        updatePlan,
        userFullName,
        userPlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
