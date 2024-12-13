import { z } from 'zod'

export const FundraiserCategoryEnum = z.enum([
  'MEDICAL',
  'MEMORIAL',
  'EMERGENCY',
  'CHARITY',
  'EDUCATION',
  'ANIMALS',
  'BUSINESS',
  'COMMUNITY',
  'COMPETITIONS',
  'CREATIVE'
])

export const FundraiserStatusEnum = z.enum([
  'ACTIVE',
  'COMPLETED',
  'CANCELLED'
])

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  country: z.string(),
  postcode: z.string(),
  walletAddress: z.string(),
  createdAt: z.date(),
})

export const FundraiserSchema = z.object({
  id: z.string(),
  organizerId: z.string(),
  title: z.string(),
  story: z.string(),
  category: FundraiserCategoryEnum,
  target: z.number(),
  currentAmount: z.number(),
  country: z.string(),
  postcode: z.string(),
  status: FundraiserStatusEnum,
  images: z.array(z.string()),
  createdAt: z.date(),
  transactionHash: z.string().optional(),
})

export const DonationSchema = z.object({
  id: z.string(),
  fundraiserId: z.string(),
  donorId: z.string(),
  amount: z.number(),
  message: z.string().optional(),
  isAnonymous: z.boolean(),
  transactionHash: z.string(),
  createdAt: z.date(),
})

export const CommentSchema = z.object({
  id: z.string(),
  fundraiserId: z.string(),
  userId: z.string(),
  message: z.string(),
  createdAt: z.date(),
})

export type User = z.infer<typeof UserSchema>
export type Fundraiser = z.infer<typeof FundraiserSchema>
export type Donation = z.infer<typeof DonationSchema>
export type Comment = z.infer<typeof CommentSchema>
export type FundraiserCategory = z.infer<typeof FundraiserCategoryEnum>
export type FundraiserStatus = z.infer<typeof FundraiserStatusEnum>

