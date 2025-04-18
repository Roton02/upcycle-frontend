/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IListing } from "@/types";

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const getSingleProduct = async (
  id: string
): Promise<IApiResponse<IListing | undefined>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`
    );
    const result = await res.json();

    if (!result.success) return { success: false, message: result.message };

    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};
