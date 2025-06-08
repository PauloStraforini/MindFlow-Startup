"use server";
import {signOut} from "@/auth";


export async function SingOut() {
    await signOut({
        redirectTo: "/"
    });
}