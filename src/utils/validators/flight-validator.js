const { z } = require('zod');

const flightSchema = z.object({
    flightNumber: z.coerce.string().min(3),
    airplaneId: z.coerce.number().int().positive(),
    departureAirportId: z.coerce.number().int().positive(),
    arrivalAirportId: z.coerce.number().int().positive(),
    
    // Change these to coerce.date()
    arrivalTime: z.coerce.date(), 
    departureTime: z.coerce.date(),

    price: z.coerce.number().positive(),
    totalSeats: z.coerce.number().int().positive(),
    remainingSeats: z.coerce.number().int().positive()
})
.passthrough()
.refine((data) => data.arrivalTime > data.departureTime, {
    message: "Arrival time must be after departure time",
    path: ["arrivalTime"]
});

//refine is used for custom validation
//strict(); <--  Throws error if extra attributes are passed
// .passthrough() <--- This allows extra fields to stay in the object
module.exports = flightSchema ;