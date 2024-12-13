"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { FundraiserSchema, FundraiserCategoryEnum } from "@/types"
import api from "@/lib/api"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { z } from "zod"

export default function Campaign() {
    const { toast } = useToast()
    const router = useRouter()
    const { isAuthenticated, user } = useAuth()
    const [formData, setFormData] = useState({
        title: "",
        story: "",
        category: "",
        target: "",
        country: "",
        postcode: "",
    })

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, router])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSelectChange = (value: string) => {
        setFormData({ ...formData, category: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const validatedData = FundraiserSchema.parse({
                ...formData,
                organizerId: user?.id,
                currentAmount: 0,
                status: "ACTIVE",
                images: [],
                createdAt: new Date(),
            })

            const response = await api.post("/fundraisers", validatedData)
            toast({
                title: "Campaign Created",
                description: "Your campaign has been successfully created!",
            })
            router.push(`/fundraiser/${response.data.id}`)
        } catch (error) {
            if (error instanceof z.ZodError) {
                toast({
                    title: "Validation Error",
                    description: "Please check your input and try again.",
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Error",
                    description:
                        "An error occurred while creating your campaign. Please try again.",
                    variant: "destructive",
                })
            }
        }
    }

    if (!isAuthenticated) {
        return null // or a loading spinner
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-3xl font-bold mb-8">Create a Campaign</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-2xl mx-auto"
            >
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <Input
                        name="title"
                        placeholder="Campaign Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </motion.div>
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Textarea
                        name="story"
                        placeholder="Tell your story"
                        value={formData.story}
                        onChange={handleChange}
                        required
                    />
                </motion.div>
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Select onValueChange={handleSelectChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(FundraiserCategoryEnum).map(
                                (category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                </motion.div>
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Input
                        name="target"
                        type="number"
                        placeholder="Fundraising Target"
                        value={formData.target}
                        onChange={handleChange}
                        required
                    />
                </motion.div>
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Input
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </motion.div>
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <Input
                        name="postcode"
                        placeholder="Postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        required
                    />
                </motion.div>
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
                    >
                        Create Campaign
                    </Button>
                </motion.div>
            </form>
        </motion.div>
    )
}
