"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
          Empowering Change Through Blockchain
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Start or support meaningful campaigns using secure blockchain
          technology. Make a difference with transparent, decentralized
          fundraising.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/create-campaign">
            <Button size="lg">Start a Campaign</Button>
          </Link>
          <Link href="/campaigns">
            <Button size="lg" variant="outline">
              Explore Campaigns
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
