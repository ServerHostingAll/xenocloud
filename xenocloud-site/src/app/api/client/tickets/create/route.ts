import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { userId, subject, department, priority, message } = await request.json();

    if (!userId || !subject || !message) {
      return NextResponse.json({ error: "Dati incompleti" }, { status: 400 });
    }

    // Inserimento record reale nella tabella 'tickets' di Supabase
    const { data, error } = await supabase
      .from("tickets")
      .insert([
        { 
          user_id: userId, 
          subject: subject, 
          department: department, 
          priority: priority, 
          message: message,
          status: "Aperto" 
        }
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });

  } catch (err) {
    return NextResponse.json({ error: "Errore del server" }, { status: 500 });
  }
}