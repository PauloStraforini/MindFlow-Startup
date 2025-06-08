"use server";
import {signOut} from "@/auth";


export async function handleSingOut() {
    await signOut({
        redirectTo: "/"
    });
}