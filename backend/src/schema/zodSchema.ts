import { email, z } from 'zod'

export const signupSchema = z.object({
    email: z.email('Please enter valid email'),
    fullName: z.string().min(3, "Name is required").max(100, "Name can not be 100 char"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*\d).{8,}$/,"Enter at least 8 char, with uppercase, lowercase and a number")
})
export const signinSchema = z.object({
    email: z.email('Please enter valid email'),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*\d).{8,}$/,"Enter at least 8 char, with uppercase, lowercase and a number")
})

export const contentSchema = z.object({
    contentType: z.string().min(3, 'Content type is required'),
    link: z.string().min(3, 'Link is required').max(200, "Maximum char"),
    title: z.string().min(3, 'Title required').max(200, "Maximum char"),
    // description: z.string().min(3, "description required")
})