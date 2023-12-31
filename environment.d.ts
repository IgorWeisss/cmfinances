declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_ALLOWED_ORIGIN: string
    NEXT_PUBLIC_API_KEY: string
    SALT_ROUNDS: number
    JWT_SECRET: string
  }
}
