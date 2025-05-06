namespace NodeJS {
  interface ProcessEnv {
    // Database
    DATABASE_URL: string;

    // ElEVENLAP API Key
    NEXT_PUBLIC_ELEVENLABS_AGENT_ID: string;

    // Auth
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;

    // mail
    RESEND_API_KEY: string;
  }
}
