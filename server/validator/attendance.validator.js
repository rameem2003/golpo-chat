const { default: z } = require("zod");

// const booleanFromQuery = z.string().transform((val) => {
//   if (val === "true") return true;
//   if (val === "false") return false;
//   throw new Error("Invalid boolean value");
// });

const singleAttendanceValidator = z.object({
  date: z.string({ message: "Date must be a valid string" }),
  batch: z.string({ message: "Batch must be a valid string" }),
  student: z.string({ message: "Student must be a valid string" }),
  attend: z.boolean({ message: "Attend must be a valid boolean" }),
});

const allAttendanceValidator = z.array(singleAttendanceValidator);

const attendanceSearchValidator = z.object({
  batch: z.string({ message: "Batch must be a valid string" }),
  student: z.string({ message: "Student must be a valid string" }),
});

module.exports = {
  singleAttendanceValidator,
  allAttendanceValidator,
  attendanceSearchValidator,
};
