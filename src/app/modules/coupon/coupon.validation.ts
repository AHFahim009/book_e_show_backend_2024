import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  gender: z.enum(['male', 'female']),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least six characters" }),
  photo: z.string().optional(),
  dataOfBirth: z.string()
});

export const userValidation = {
  schema
}
