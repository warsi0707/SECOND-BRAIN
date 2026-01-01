import { z } from 'zod'

export const signinSchema = z.object({
    email: z.email("Email required"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*\d).{8,}$/,"Enter at least 8 char, with uppercase, lowercase and a number")
})
export const signupSchema = z.object({
    fullName: z.string().min(3, "Full name required").max(100, "Max full name"),
    email: z.email("Email required"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*\d).{8,}$/,"Enter at least 8 char, with uppercase, lowercase and a number")
})
export const postItemLinkSchema = z.object({
    title: z.string("Title required").min(3,"Title required").max(200, 'Max title'),
    link: z.string("Please provide valid link").min(10, "Please provide valid link"),
    contentType: z.string().min(3,"Please select contet type")
})
export const postItemNotesSchema = z.object({
    title: z.string("Title required").min(3,"Title required").max(200, 'Max title'),
    description: z.string("Description required").min(10, "Description required"),
    contentType: z.string().min(3,"Please select contet type")
})