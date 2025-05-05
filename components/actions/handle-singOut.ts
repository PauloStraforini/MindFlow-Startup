"use server";
import {signOut} from "@/lib/auth";


export async function handleSingOut() {
    await signOut({
        redirectTo: "/"
    });
}