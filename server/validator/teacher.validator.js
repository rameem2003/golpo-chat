const z = require("zod");

const name = z.string().min(3, "Name is required");
const email = z.string().email("Invalid email address");
const phone = z.string().min(11, "Phone number must be at least 11 digits");
const role = z.string().min(1, "Role is required");
const tags = z.string().min(3, "Tags are required");
const linkedin = z.string().min(3, "LinkedIn profile is required");

// const avatar = z.instanceof(File).refine((file) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
//   return allowedTypes.includes(file.type);
// }, "Only JPEG, PNG, and GIF files are allowed");

const teacherCreateSchema = z.object({
  name,
  email,
  phone,
  role,
  tags,
  linkedin,
  // avatar,
});

module.exports = {
  teacherCreateSchema,
};
