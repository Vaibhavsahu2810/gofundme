import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
// Mock donation data based on the Donation model
const mockDonations = [
  {
    id: "1",
    donorId: "a1",
    amount: 50,
    message: null,
    isAnonymous: true,
    createdAt: new Date(),
    donor: { name: "Anonymous" },
  },
  {
    id: "2",
    donorId: "a2",
    amount: 2500,
    message: null,
    isAnonymous: false,
    createdAt: new Date(),
    donor: { name: "Andreas Richter" },
  },
  {
    id: "3",
    donorId: "a3",
    amount: 100,
    message: null,
    isAnonymous: true,
    createdAt: new Date(),
    donor: { name: "Anonymous" },
  },
];

interface DonationCardProps {
  currentAmount: number;
  target: number;
  donationCount: number;
  donations?: typeof mockDonations;
}

export default function DonationCard({
  currentAmount = 252934,
  target = 250000,
  donationCount = 2600,
  donations = mockDonations,
}: DonationCardProps) {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">
            ${currentAmount.toLocaleString()} USD
          </h2>
          <p className="text-gray-600 mt-2">raised</p>
          <p className="text-gray-500 mt-1">
            <span className="mr-2">${(target / 1000).toFixed(0)}K target</span>·
            <span className="ml-2">
              {(donationCount / 1000).toFixed(1)}K donations
            </span>
          </p>
          <Progress value={(currentAmount / target) * 100}></Progress>
        </div>
        <div className="space-y-3">
          <Button className="w-full py-6 text-lg font-semibold bg-[#FFE5B4] hover:bg-[#FFD700] text-black">
            Share
          </Button>
          <Button className="w-full py-6 text-lg font-semibold bg-[#FFA500] hover:bg-[#FF8C00] text-black">
            Donate now
          </Button>
        </div>

        <div className="pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-purple-600 font-semibold text-lg">
              195 people have just made a donation
            </p>
          </div>

          <div className="space-y-4">
            {donations.map((donation) => (
              <div key={donation.id} className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  <span className="text-2xl">🤲</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{donation.donor.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">${donation.amount}</span>·
                    <span className="underline">
                      {donation.amount === 2500
                        ? "Top donation"
                        : donation.amount === 100
                        ? "First donation"
                        : "Recent donation"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button variant="outline" className="py-6">
              See all
            </Button>
            <Button variant="outline" className="py-6">
              <Star className="w-4 h-4 mr-2" />
              See top
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
