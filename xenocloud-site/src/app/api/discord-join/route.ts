import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { accessToken, userId } = await request.json();
    
    const guildId = process.env.DISCORD_GUILD_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    // Chiamata alle API di Discord per aggiungere l'utente al server
    const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: accessToken,
      }),
    });

    if (response.status === 201 || response.status === 204) {
      return NextResponse.json({ success: true, message: "Utente inserito nel server Discord!" });
    } else {
      const errData = await response.json();
      return NextResponse.json({ success: false, error: errData });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Errore interno del server API" }, { status: 500 });
  }
}