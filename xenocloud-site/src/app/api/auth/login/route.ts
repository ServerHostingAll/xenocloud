import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // FIX RAPIDO: Castiamo temporaneamente ad 'any' per saltare il controllo del tipo di SupabaseAuthClient
    const authClient = supabase.auth as any;
    
    const { data, error } = await authClient.signInWithPassword({
      email: email,
      password: password,
    });

    if (error || !data?.user) {
      return NextResponse.json(
        { error: "Credenziali non valide su Supabase: " + error?.message }, 
        { status: 401 }
      );
    }

    // Estrazione dei dettagli del profilo utente dalla tabella 'profiles'
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    return NextResponse.json({ 
      success: true, 
      user: profile ? {
        id: profile.id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: data.user.email,
        phone: profile.phone,
        company: profile.company
      } : { 
        id: data.user.id, 
        firstName: "Utente", 
        lastName: "Xeno",
        email: data.user.email 
      } 
    });

  } catch (err) {
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}