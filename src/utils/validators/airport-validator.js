const airportSchema = z.object({
    name: z.string().min(2),
    address: z.string().min(2),
    cityId: z.number().int().positive()
}).passthrough();