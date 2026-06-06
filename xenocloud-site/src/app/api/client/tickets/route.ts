import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID mancante" }, { status: 400 });
  }

  // Prendi i ticket reali ordinati dal più recente
  const { data: tickets, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Mappa i campi di Supabase con quelli che usa il nostro componente frontend
  const formattedTickets = tickets.map(t => ({
    id: t.id,
    subject: t.subject,
    department: t.department,
    status: t.status, // "Aperto", "In Lavorazione", ecc.
    date: new Date(t.created_at).toLocaleDateString("it-IT")
  }));

  return NextResponse.json(formattedTickets);
}