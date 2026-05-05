const { default: z } = require("zod");

const booleanFromQuery = z.string().transform((val) => {
  if (val === "true") return true;
  if (val === "false") return false;
  throw new Error("Invalid boolean value");
});

const purchaseQuerySchema = z.object({
  limit: z.coerce
    .number()
    .refine((val) => val >= 0, {
      message: "Limit must be a non-negative number",
    })
    .optional(),
  isApproved: booleanFromQuery.optional(),
  courseCompleted: booleanFromQuery.optional(),
});

module.exports = {
  purchaseQuerySchema,
};
