"use client"
import {z} from "zod"
import React from 'react';

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {LoginBody, LoginBodyType} from "@/schemaValidations/auth.schema";
import envConfig from "@/config";


function LoginForm() {
    const { toast } = useToast()

    // 1. Define your form.
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof LoginBody>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(async (response) => {
                    const payload = await response.json()
                    const data = {
                        status: response.status,
                        payload,
                    }
                    if (!response.ok) {
                        throw data
                    }
                    return data

                })
            toast({
                description: result.payload.message,
            })

        }
        catch (e: any) {
            console.error(e)
            const errors = (e as any).payload.errors as { field: string, message: string }[]
            const status = e.status as number
            if (status === 422) {
                for (const error of errors) {
                    form.setError(error.field as ("email" | "password"), {message: error.message})
                }
                toast({
                    title: "server",
                    description: e.payload.message,
                })
            }
            else {
                toast({
                    title: "loi",
                    description: e.payload.message,
                })
            }
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[500px] w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="abc@example.com" formNoValidate={true} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="******" type={"password"} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button className={"!mt-6 w-full"} type="submit">Login</Button>
                </form>
            </Form>
        </>
    );
}

export default LoginForm;