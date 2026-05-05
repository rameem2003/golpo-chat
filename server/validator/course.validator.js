const { default: z } = require("zod");

const booleanSchema = z.union([
  z.boolean(),
  z.enum(["true", "false"]).transform((val) => val === "true"),
]);

const title = z.string().min(8, "Title is required");
const description = z.string().min(10, "Description is required");
const sellingPrice = z.coerce
  .number()
  .min(0, "Selling price must be a positive number");
const discountedPrice = z.coerce
  .number()
  .min(0, "Discounted price must be a positive number");

const category = z.string().min(1, "Category is required");
const thumb = z.instanceof(File).refine((file) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
  return allowedTypes.includes(file.type);
}, "Only JPEG, PNG, and GIF files are allowed");

const active = booleanSchema.optional();
const offer = booleanSchema.optional();

const courseSchema = z.object({
  title,
  description,
  sellingPrice,
  discountedPrice,
  category,
  thumb: thumb.optional(),
  active: active.optional(),
  offer: offer.optional(),
});

module.exports = {
  courseSchema,
};
