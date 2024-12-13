import { NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  country: z.string(),
  postcode: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, country, postcode } = RegisterSchema.parse(body)

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        country,
        postcode,
        walletAddress: '', // You might want to generate this or let the user provide it
      },
    })

    return NextResponse.json({ message: 'User registered successfully', userId: user.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

