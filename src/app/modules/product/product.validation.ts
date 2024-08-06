import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "Give your product name" }),
  authorName: z.string(),
  publishedData: z.string(),
  price: z.number().min(1, { message: "give right price of your product" }),
  stock: z.number(),
  category: z.string({ required_error: "give your product category" }),
});
const update = z.object({
  name: z.string().min(1, { message: "Give your product name" }).optional(),
  authorName: z.string().optional(),
  publishedData: z.string().optional(),
  price: z.number().min(1, { message: "give right price of your product" }).optional(),
  stock: z.number().optional(),
  category: z.string({ required_error: "give your product category" }).optional()
});

export const ProductValidation = {
  schema,
  update
}
