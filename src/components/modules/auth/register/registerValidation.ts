import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .max(20, "Name have max 20 characters")
    .min(4, "Name must be at least 4 characters"),

  phone: z.string({
    required_error: "Phone No is required",
  })
  .min(11, "Phone must be at least 11 characters"),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});
