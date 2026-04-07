const { z } = require('zod');

const airplaneSchema = z.object({
    modelNumber: z.string().min(2, "Model number must be at least 2 chars"),
    capacity: z.number().int().positive().max(1000).optional() // Optional if you have a DB default
}).passthrough();

module.exports = airplaneSchema;