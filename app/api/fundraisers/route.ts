import { NextResponse } from "next/server"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { FundraiserSchema } from "@/types"

export async function GET(request: Request) {
    try {
        const fundraisers = await prisma.fundraiser.findMany()
        return NextResponse.json(fundraisers)
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const fundraiser = FundraiserSchema.parse(body)

        const newFundraiser = await prisma.fundraiser.create({
            data: {
                ...fundraiser,
                organizerId: fundraiser.organizerId,
            },
        })

        return NextResponse.json(newFundraiser, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
