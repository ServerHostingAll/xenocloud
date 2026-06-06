import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { title, content, type } = await request.json();

    const { data, error } = await supabase
      .from("announcements")
      .insert([{ title, content, type }])
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: "Errore server" }, { status: 500 });
  }
}