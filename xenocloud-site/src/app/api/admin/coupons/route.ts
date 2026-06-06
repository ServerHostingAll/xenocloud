import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Crea un buono sconto reale
export async function POST(request: Request) {
  try {
    const { code, discount } = await request.json();

    if (!code || !discount || discount < 5 || discount > 100) {
      return NextResponse.json({ error: "Dati coupon non validi (5% - 100%)" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("coupons")
      .insert([{ code: code.toUpperCase(), discount_percentage: discount }])
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ error: "Errore server" }, { status: 500 });
  }
}

// Recupera tutti i coupon creati
export async function GET() {
  const { data, error } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}