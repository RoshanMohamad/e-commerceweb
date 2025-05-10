"use client"

import type React from "react"
import { createContext, useContext, ReactNode, useEffect, useState } from "react"
import { ID } from "appwrite"
import { account } from "./appwrite"
import { useRouter } from "next/navigation"

type User = {
  $id: string;
  name: string;
  email: string;
} | null

interface AuthContextType {
  user: User;
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  loading: boolean
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user as User);
      } catch {
        console.log("No active session");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setUser(user as User);
      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true);
  try {
    await account.create(ID.unique(), email, password, name);
    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Auto-login after registration failed:", error);
      throw error;
    }
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  } finally {
    setLoading(false);
  }
  }

  const signOut = async () => {
    setLoading(true);
    try {
      await account.deleteSession('current');
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signOut,
      signUp,
      setUser
    }}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
