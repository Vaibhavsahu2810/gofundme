import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, goalAmount, blockchainAddress } = body;

    const campaign = await prisma.campaign.create({
      data: {
        title,
        description,
        goalAmount,
        blockchainAddress,
        userId: 1, // TODO: Get from authenticated user
        status: "active",
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error("Failed to create campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        user: true,
        donations: {
          include: {
            donor: true,
          },
        },
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 },
    );
  }
}
