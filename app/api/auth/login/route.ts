import { NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = LoginSchema.parse(body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' })

    return NextResponse.json({ message: 'Login successful', token }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

