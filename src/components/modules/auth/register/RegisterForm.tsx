'use client'

import registerImage from "../../../../../public/login-img.png"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Facebook, Github, GoalIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./registerValidation";
import { useState } from "react";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";

export default function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false);
    const form = useForm({
        resolver: zodResolver(registrationSchema)
    });

    const { formState: { isSubmitting } } = form;


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        try {
            const res = await registerUser(data);

            if (!res.success) toast.error(res.message);
            if (res.success) {
                toast.success(res.message);
                // redirect ? router.push(redirect) : router.push('/')
            }
        } catch (err: any) {
            console.error(err)
        }

    }

    return (
        <div className="grid md:grid-cols-2 w-full h-screen p-3">
            {/* left colum */}
            <div className="flex flex-col w-full md:max-w-[480px] ml-auto px-6 py-10">
                <div className="mb-8">
                    {/* <h2>Logo</h2> */}
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-[400px]">
                        <div>
                            <h2 className="text-3xl font-semibold text-[#181D25]">Welcome back</h2>
                            <p className="text-sm font-normal text-[#4E5562] mt-4 mb-6">Already have an account?<Link href={'/login'} className="text-sm text-[#181D25] font-medium cursor-pointer underline ml-2">Login in</Link></p>
                        </div>

                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">


                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input {...field} value={field.value || ''}
                                                    placeholder="Name"
                                                    className="rounded-[8px] w-full h-12 border-[1.5px] border-[#CAD0D9] placeholder:text-[#9CA3AF]" />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input {...field} value={field.value || ''}
                                                    placeholder="Email"
                                                    className="rounded-[8px] w-full h-12 border-[1.5px] border-[#CAD0D9] placeholder:text-[#9CA3AF]" />
                                            </FormControl>
                                            <FormMessage className="text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <div className="relative">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type={showPassword ? 'text' : 'password'} {...field} value={field.value || ''}
                                                        placeholder="Password"
                                                        className="rounded-[8px] w-full h-12 border-[1.5px] border-[#CAD0D9] placeholder:text-[#9CA3AF]" />

                                                </FormControl>
                                                <FormMessage className="text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    <Button onClick={() => setShowPassword(!showPassword)}
                                        type="button"
                                        className="absolute top-1.5 right-0"
                                    >
                                        {
                                            showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye />
                                            )
                                        }
                                    </Button>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex items-center gap-2">
                                        {/* <Checkbox className="text-[#9CA3AF] rounded-[2px]" />
                                        <p className="text-sm text-[#4E5562] font-normal">Remember for 30 days</p> */}
                                    </div>
                                    {/* <p className="text-sm text-[#333D4C] font-normal">Forgot password?</p> */}
                                </div>

                                <Button
                                    className="w-full h-10 mt-5 bg-[#F55266] text-white cursor-pointer rounded-[8px] hover:bg-[#F55266] hover:bg-opacity-80 hover:text-white"
                                    type="submit">
                                    {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : 'Create an account'}

                                </Button>
                            </form>
                        </Form>

                        <div className="flex items-center justify-center gap-4 my-6">
                            <div className="h-[2px] flex-1 bg-[#E0E5EB]" />
                            <span className="text-base font-medium text-[#333D4C]">or continue with</span>
                            <div className="h-[2px] flex-1 bg-[#E0E5EB]" />
                        </div>

                        <div className="flex gap-4">
                            <Button className="w-32 h-12 border border-[#E0E5EB] rounded-[8px]"><GoalIcon />
                                <span className="text-[#333D4C] font-normal">Google</span>
                            </Button>
                            <Button className="w-32 h-12 border border-[#E0E5EB] rounded-[8px]"><Facebook />
                                <span className="text-[#333D4C] font-normal">Facebook</span>
                            </Button>
                            <Button className="w-32 h-12 border border-[#E0E5EB] rounded-[8px]"><Github />
                                <span className="text-[#333D4C] font-normal">GitHub</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-gradient-to-r from-[#ACCBEE] to-[#E7F0FD] overflow-hidden rounded-2xl">
                <Image
                    src={registerImage}

                    alt="login-image"
                    className="w-full h-full"
                />

            </div>
        </div>
    )
}
