import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  gender: z.enum(['male', 'female']),
  role: z.enum(['admin', 'user']).default("user"),
  email: z.string().email({ message: "Invalid email format" }),
  photo: z.string().optional(),
  dataOfBirth: z.string()
});

export const userValidation = {
  schema
}
