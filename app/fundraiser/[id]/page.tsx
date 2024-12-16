"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Share2, MessageCircle } from "lucide-react";
import DonationCard from "@/components/donationCard";
import FundraiserCarousel from "@/components/fundraiserCarousel";

// Mock data based on the Fundraiser model
const mockFundraiser = {
  id: "1",
  organizerId: "1",
  title: "Donate to Support the Gaudio Family",
  story:
    "Our names are Amy Colcher and Booda Sanchez. Bernadette Gaudio is our best friend. Her children, Robert and Andrew, are like our children. The Gaudio family has been the victim of an unfathomable and heinous crime. On Sunday, December 8, 2024 - during a home invasion Bernadette was shot multiple times and paralyzed, and Andrew was murdered. A young man of 25 whose life was just beginning - gone. A mother, who lost her husband 15 years ago, now faces the devastating loss of her son and a long road to recovery.",
  category: "EMERGENCY",
  target: 500000,
  currentAmount: 235000,
  country: "United States",
  postcode: "19103",
  status: "ACTIVE",
  images: [
    "https://images.gofundme.com/K_HL_FyFndaDIHE2_rnrmhSfoxg=/720x405/https://d2g8igdw686xgo.cloudfront.net/84734487_1733880475598071_r.jpeg",
  ],
  createdAt: new Date(),
  organizer: {
    name: "Amy Colcher Booda Sanchez",
    image: "/api/placeholder/40/40",
  },
};

export default function FundraiserPage() {
  const progress = (mockFundraiser.currentAmount / mockFundraiser.target) * 100;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 py-8"
      >
        <h1 className="text-3xl font-bold mb-6">{mockFundraiser.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardContent className="p-0">
                <img
                  src={mockFundraiser.images[0]}
                  alt="Campaign"
                  className="w-full h-[400px] object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Story</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {mockFundraiser.story}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <DonationCard currentAmount={20} target={250} donationCount={10} />
            <Card>
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <img
                    src={mockFundraiser.organizer.image}
                    alt="Organizer"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">
                      {mockFundraiser.organizer.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Organizer • {mockFundraiser.country}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact organizer
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
      <FundraiserCarousel />
    </>
  );
}
