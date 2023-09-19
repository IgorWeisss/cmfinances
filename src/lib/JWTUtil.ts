import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

export const JWT_DURATION_IN_SECONDS = 60

export async function sign(
  payload: JWTPayload,
  secret: string,
): Promise<string> {
  const issuedAt = Math.floor(Date.now() / 1000)
  const expirationTime = issuedAt + JWT_DURATION_IN_SECONDS

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(expirationTime)
    .setIssuedAt(issuedAt)
    .setNotBefore(issuedAt)
    .sign(new TextEncoder().encode(secret))
}

export async function verify(
  token: string,
  secret: string,
): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload
}
