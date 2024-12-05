"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface Campaign {
  id: number;
  title: string;
  description: string;
  goalAmount: string;
  collectedAmount: string;
  blockchainAddress: string;
  createdAt: string;
  user: {
    name: string;
  };
  donations: Array<{
    amount: string;
  }>;
}

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch("/api/campaigns");
        if (!response.ok) throw new Error("Failed to fetch campaigns");
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    }

    fetchCampaigns();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Active Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{campaign.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  by {campaign.user.name} • {formatDistanceToNow(new Date(campaign.createdAt))} ago
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{campaign.description.slice(0, 150)}...</p>
                <div className="space-y-2">
                  <Progress 
                    value={(Number(campaign.collectedAmount) / Number(campaign.goalAmount)) * 100} 
                  />
                  <div className="flex justify-between text-sm">
                    <span>{campaign.collectedAmount} ETH raised</span>
                    <span>Goal: {campaign.goalAmount} ETH</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/campaigns/${campaign.id}`} className="w-full">
                  <Button className="w-full">View Campaign</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}