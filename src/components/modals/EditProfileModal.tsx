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
import { Edit, Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IUser } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { updateUserProfile } from "@/services/AuthService";
import { toast } from "sonner";

export function EditProfileModal({
  user,
  setIsLoading,
}: {
  user: IUser | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm({
    defaultValues: {
      username: user?.username,
      phone: user?.phone,
    },
  });
  const {
    formState: { isSubmitting },
    reset,
  } = form;

  useEffect(() => {
    if (user) {
      reset({
        username: user?.username || "",
        phone: user?.phone || "",
      });
    }
  }, [user]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const res = await updateUserProfile(user?._id, data);
    console.log(res);
    if (!res.success) toast.error(res.message);
    if (res.success) {
      toast.success(res.message);
      setIsLoading(true);
    }

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
          className="bg-gray-300 rounded-[6px] hover:bg-slate-300 dark:text-black"
        >
          <Edit /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-black bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        // placeholder={user?.username}
                        className="rounded-[8px] w-full h-12 border-[1.5px] border-[#CAD0D9] placeholder:text-[#9CA3AF] dark:placeholder:text-gray-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        // placeholder={user?.phone}
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
                    Updating...
                  </>
                ) : (
                  "Edit Profile"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
