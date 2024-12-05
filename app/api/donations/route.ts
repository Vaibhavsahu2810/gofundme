import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { campaignId, amount, transactionHash } = body;

    const donation = await prisma.donation.create({
      data: {
        campaignId,
        amount,
        transactionHash,
        donorId: 1, // TODO: Get from authenticated user
      },
    });

    // Update campaign collected amount
    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        collectedAmount: {
          increment: amount,
        },
      },
    });

    return NextResponse.json(donation);
  } catch (error) {
    console.error("Failed to create donation:", error);
    return NextResponse.json(
      { error: "Failed to create donation" },
      { status: 500 }
    );
  }
}