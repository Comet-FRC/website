import { defineCollection, z } from 'astro:content';

const leadsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(), // e.g., "Senior Pastor", "Deaconess"
    image: z.string().startsWith('/uploads/leads/'),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    bio: z.string().optional(), // Short bio in frontmatter
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const eventsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(), // Event start date
    endDate: z.date().optional(), // Event end date
    time: z.string().optional(), // e.g., "09:00 AM - 11:00 AM"
    location: z.string(),
    image: z.string().startsWith('/uploads/events/').optional(),
    summary: z.string(),
    tags: z.array(z.string()).optional(),
    registrationLink: z.string().url().optional(),
    registrationRequired: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});


// --- NEW SPONSORS COLLECTION ---
const sponsorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    logo: z.string().startsWith('/uploads/sponsors/'), // Path to the sponsor's logo image
    tier: z.string().optional(), // e.g., 'Platinum', 'Gold', 'Silver', 'Bronze'
    description: z.string().optional(),
    website: z.string().url().optional(),
    contactEmail: z.string().email().optional(),
    order: z.number().default(0), // For sorting, lower number appears first
    draft: z.boolean().default(false),
  }),
});

const robotCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    pic: z.string().startsWith('/uploads/robots/'), // Path to the robot image
    season: z.string().optional(), // e.g., 'Rebuilt', 'Crescendo'
    seasonYear: z.string().optional(), // e.g., '2026', '2025'
    description: z.string().optional(),
    cad: z.string().url().optional(),
    order: z.number().default(0), // For sorting, lower number appears first
    competition: z.boolean().default(true), // true = competition robot, false = offseason
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  leads: leadsCollection,
  events: eventsCollection,
  sponsors: sponsorsCollection,
  robots: robotCollection,
};
