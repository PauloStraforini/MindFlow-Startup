"use server";
import { signIn } from "@/auth";


export async function handleAuth( provider: string) {
    
  await signIn(provider, {
    redirectTo: "/psicologos/dashboard",
  });
}