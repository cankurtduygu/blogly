import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(1, "Required")
    .min(8, "Password must be at least 8 characters")
    .regex(/\d+/, "Must contain a digit")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[@$?!%&*]+/, "Must contain a special character (@$?!%&*)"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/\d+/, "Must contain a digit")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[@$?!%&*]+/, "Must contain a special character (@$?!%&*)"),

    confirmPassword: z.string(),

    email: z.email("Invalid email address"),

    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignUpCredentials = Omit<SignUpFormData, "confirmPassword">;

export const writeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  categoryId: z.string().min(1, "Category is required"),
  image: z.string().url("Enter a valid URL"),
  content: z.string().min(1, "Content is required"),
  isPublish: z.boolean(),
});

export type WriteFormData = z.infer<typeof writeSchema>;
