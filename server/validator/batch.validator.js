const z = require("zod");

const batchSchema = z.object({
  name: z.string().min(1, { message: "Batch name is required" }),
  course: z.string().min(1, { message: "Course ID is required" }),
  seats: z.coerce.number().min(1, { message: "Seats are required" }),
  time: z.string().min(1, { message: "Time is required" }),
  students: z.string().optional(), // at a time single student can be added, for multiple students we can use separate API
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  teacher: z.string().min(1, { message: "Teacher ID is required" }),
  comment: z.string().optional(),
  active: z.boolean().optional(),
  isCompleted: z.boolean().optional(),
});

module.exports = {
  batchSchema,
};
