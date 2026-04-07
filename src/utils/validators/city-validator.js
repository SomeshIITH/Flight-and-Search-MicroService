const citySchema = z.object({
    name: z.string().min(2, "City name is too short")
}).passthrough();