import z from "zod";

export const configSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string(),
})
const configProcess = configSchema.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT
})
if (!configProcess.success) {
    console.error(configProcess.error.issues)
    throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}
const envConfig = configProcess.data
export default envConfig