const {z} = require('zod');

const airportSchema = z.object({
    name: z.string().min(2),
    address: z.string().min(2),
    cityId : z.coerce.number().int().positive("cityId must be a positive number")
}).passthrough();

module.exports = airportSchema;