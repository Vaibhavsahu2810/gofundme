"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { User } from "@/types"
import { Donation, Fundraiser } from "@prisma/client"

// This would typically come from an API call
const mockUser: User & { fundraisers: Fundraiser[]; donations: Donation[] } = {
    id: "1",
    email: "user@example.com",
    name: "John Doe",
    country: "USA",
    postcode: "12345",
    walletAddress: "0x1234567890123456789012345678901234567890",
    createdAt: new Date(),
    fundraisers: [],
    donations: [],
}

export default function Dashboard() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>User Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                <strong>Name:</strong> {mockUser.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {mockUser.email}
                            </p>
                            <p>
                                <strong>Country:</strong> {mockUser.country}
                            </p>
                            <p>
                                <strong>Postcode:</strong> {mockUser.postcode}
                            </p>
                            <p>
                                <strong>Wallet Address:</strong>{" "}
                                {mockUser.walletAddress}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Fundraisers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {mockUser.fundraisers.length === 0 ? (
                                <p>
                                    You haven&apos;t created any fundraisers
                                    yet.
                                </p>
                            ) : (
                                <ul>
                                    {mockUser.fundraisers.map((fundraiser) => (
                                        <li key={fundraiser.id}>
                                            {fundraiser.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}
