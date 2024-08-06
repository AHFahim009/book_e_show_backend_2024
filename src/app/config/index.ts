import dotenv from "dotenv";
import path from "path"

dotenv.config({ path: path.join(process.cwd(), '.env') })


export default {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_NAME: process.env.DATABASE_NAME,
  EXPIRE_IN: process.env.EXPIRE_IN,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  STRIPE_KEY: process.env.STRIPE_KEY

}