import * as zod from "zod";

export const LoginSchema = zod.object({
  email: zod
    .string()
    .nonempty("email is required")
    .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "invalid email"),
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Use at least 8 characters including letters, numbers, and a special symbol",
    ),
});



export const RegisterSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("name is required")
      .min(3, "most be at lest 3 characters")
      .max(15, "most be at max 15 characters"),
    email: zod
      .string()
      .nonempty("email is required")
      .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "invalid email"),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Use at least 8 characters including letters, numbers, and a special symbol",
      ),
    rePassword: zod.string().nonempty("password is required"),
    phone: zod.string().nonempty("your phone number is required").length(11 ,"invalid phone number" )
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "password and rePassword moust be the same",
  });