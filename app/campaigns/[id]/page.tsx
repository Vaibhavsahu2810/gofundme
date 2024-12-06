"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { sendTransaction } from "@/lib/web3";
import { motion } from "framer-motion";

interface Campaign {
  id: number;
  title: string;
  description: string;
  goalAmount: string;
  collectedAmount: string;
  blockchainAddress: string;
  user: {
    name: string;
  };
  donations: Array<{
    amount: string;
    donor: {
      name: string;
    };
    donatedAt: string;
  }>;
}

export default function CampaignDetail() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const response = await fetch(`/api/campaigns/${id}`);
        if (!response.ok) throw new Error("Failed to fetch campaign");
        const data = await response.json();
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
        toast({
          title: "Error",
          description: "Failed to load campaign details",
          variant: "destructive",
        });
      }
    }

    if (id) fetchCampaign();
  }, [id]);

  async function handleDonate() {
    if (!campaign || !donationAmount) return;

    setIsLoading(true);
    try {
      const tx = await sendTransaction(
        campaign.blockchainAddress,
        donationAmount,
      );

      await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: campaign.id,
          amount: donationAmount,
          transactionHash: tx.hash,
        }),
      });

      toast({
        title: "Thank you!",
        description: "Your donation has been processed successfully.",
      });

      setDonationAmount("");
    } catch (error) {
      console.error("Error processing donation:", error);
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (!campaign) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>{campaign.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            by {campaign.user.name}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>{campaign.description}</p>

          <div className="space-y-2">
            <Progress
              value={
                (Number(campaign.collectedAmount) /
                  Number(campaign.goalAmount)) *
                100
              }
            />
            <div className="flex justify-between text-sm">
              <span>{campaign.collectedAmount} ETH raised</span>
              <span>Goal: {campaign.goalAmount} ETH</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Amount in ETH"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              min="0.01"
              step="0.01"
            />
            <Button onClick={handleDonate} disabled={isLoading}>
              {isLoading ? "Processing..." : "Donate"}
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Donations</h3>
            <div className="space-y-2">
              {campaign.donations.map((donation, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{donation.donor.name}</span>
                  <span>{donation.amount} ETH</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
