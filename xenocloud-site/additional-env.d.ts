declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    DISCORD_BOT_TOKEN: string;
    DISCORD_GUILD_ID: string;
  }
}