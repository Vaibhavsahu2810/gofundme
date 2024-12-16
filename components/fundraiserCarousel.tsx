import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const mockFundraisers = [
    {
        id: "1",
        title: "Unterstützung für Fabian und seine Familie",
        donations: "765",
        amountRaised: "€51,151",
        image:
            "https://images.gofundme.com/K_HL_FyFndaDIHE2_rnrmhSfoxg=/720x405/https://d2g8igdw686xgo.cloudfront.net/84734487_1733880475598071_r.jpeg",
        category: "Emergencies",
        organizer: "John Doe",
        progress: 75,
    },
    {
        id: "2",
        title: "Kind grandmother needs your love ❤️",
        donations: "2K",
        amountRaised: "$51,440",
        image:
            "https://images.gofundme.com/K_HL_FyFndaDIHE2_rnrmhSfoxg=/720x405/https://d2g8igdw686xgo.cloudfront.net/84734487_1733880475598071_r.jpeg",
        category: "Medical",
        organizer: "Jane Smith",
        progress: 50,
    },
    {
        id: "3",
        title: "Help Vu Family Kids Recover from Deadly Crash",
        donations: "3.4K",
        amountRaised: "$313,315",
        image:
            "https://images.gofundme.com/K_HL_FyFndaDIHE2_rnrmhSfoxg=/720x405/https://d2g8igdw686xgo.cloudfront.net/84734487_1733880475598071_r.jpeg",
        category: "Funerals",
        organizer: "Michael Vu",
        progress: 90,
    },
    {
        id: "4",
        title: "Zurück ins Leben: Clara braucht Euch!",
        donations: "3.6K",
        amountRaised: "€168,692",
        image:
            "https://images.gofundme.com/K_HL_FyFndaDIHE2_rnrmhSfoxg=/720x405/https://d2g8igdw686xgo.cloudfront.net/84734487_1733880475598071_r.jpeg",
        category: "Medical",
        organizer: "Clara Müller",
        progress: 60,
    },
    {
        id: "5",
        title: "Donate to Support the Gaudio Family",
        donations: "1K",
        amountRaised: "$235,000",
        image:
            "https://images.gofundme.com/K_HL_FyFndaDIHE2_rnrmhSfoxg=/720x405/https://d2g8igdw686xgo.cloudfront.net/84734487_1733880475598071_r.jpeg",
        category: "Emergency",
        organizer: "Gaudio Family",
        progress: 80,
    },
];

const FundraiserCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 4;

  const visibleFundraisers = mockFundraisers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const nextFundraisers = () => {
    setStartIndex((prevIndex) =>
      prevIndex + itemsPerPage >= mockFundraisers.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  return (
    <div className="max-w-full text-white mt-3 pt-10 py-10 px-6">
      <h2 className="text-3xl font-semibold mb-6">
        More ways to make a difference. Find fundraisers inspired by what you
        care about.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleFundraisers.map((fundraiser) => (
          <div
            key={fundraiser.id}
            className="mt-3 text-white rounded-lg overflow-hidden relative"
          >
            <Card className="shadow-lg h-[350px] rounded-lg">
              <div className="relative">
                <img
                  src={fundraiser.image}
                  alt={fundraiser.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                {/* Donation Count Overlay */}
                <div className="absolute top-3 left-3 bg-black/60 text-white text-sm px-2 py-1 rounded">
                  {fundraiser.donations} donations
                </div>
              </div>

              <CardContent className="p-4 flex flex-col justify-between h-48">
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {fundraiser.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  by {fundraiser.organizer}
                </p>

                {/* Raised Amount */}
                <div>
                  <p className="text-green-600 font-bold mb-1">
                    {fundraiser.amountRaised} raised
                  </p>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${fundraiser.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Button
          onClick={nextFundraisers}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Next →
        </Button>
      </div>
    </div>
  );
};

export default FundraiserCarousel;
