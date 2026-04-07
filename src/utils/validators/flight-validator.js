const {z} = require('zod');

const flightSchema = z.object({
    flightNumber: z.string().min(3),
    airplaneId: z.number().int().positive(),
    departureAirportId: z.number().int().positive(),
    arrivalAirportId: z.number().int().positive(),
    arrivalTime: z.string().datetime(),
    departureTime: z.string().datetime(),
    price: z.number().positive().optional()
})
.passthrough()
.refine((data) => new Date(data.arrivalTime) > new Date(data.departureTime), {
    message: "Arrival time must be after departure time",
    path: ["arrivalTime"] // This points the error specifically to the arrivalTime field
});
//refine is used for custom validation
//strict(); <--  Throws error if extra attributes are passed
// .passthrough() <--- This allows extra fields to stay in the object
module.exports = flightSchema ;