import * as bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config()

const saltRounds: number = Number(process.env.SALT_ROUNDS)

async function encryptPassword(password: string): Promise<string> {
  const salt: string = await bcrypt.genSalt(saltRounds)
  const hash: string = await bcrypt.hash(password, salt)
  return hash
}

async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const match: boolean = await bcrypt.compare(password, hash)
  return match
}

export { encryptPassword, comparePassword }
