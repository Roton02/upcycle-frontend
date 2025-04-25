"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Settings } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { resetPassword } from "@/services/AuthService";
import { IUser } from "@/types";
import { toast } from "sonner";

export function ChangePasswordModal({ user }: { user: IUser | null }) {
  const form = useForm();
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await resetPassword(user?._id, data);

    if (!res.success) toast.error(res.message);
    if (res.success) toast.success(res.message);

    try {
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="bg-gray-300 rounded-[6px] hover:bg-slate-300 dark:text-black dark:bg-white"
        >
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-black bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Make changes to your password here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    {/* <FormLabel>Current Password</FormLabel> */}
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Current Password"
                        className="rounded-[8px] w-full h-12 border-[1.5px] border-[#CAD0D9] placeholder:text-[#9CA3AF] dark:placeholder:text-gray-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>New Password</FormLabel> */}
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="New Password"
                        className="rounded-[8px] w-full h-12 border-[1.5px] border-[#CAD0D9] placeholder:text-[#9CA3AF] dark:placeholder:text-gray-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                className="w-full h-10 mt-5 bg-[#F55266] text-white cursor-pointer rounded-[8px] hover:bg-[#F55266] hover:bg-opacity-80 hover:text-white"
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
