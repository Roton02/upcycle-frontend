/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ProductFormData } from "@/app/(WithDashboardLayout)/dashboard/add-product/page";
import { IListing } from "@/types";
import { cookies } from "next/headers";

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const addProduct = async (submissionData: ProductFormData) => {
  try {
    const token = (await cookies()).get("token")!.value;

    if (!token) {
      return { success: false, message: "No access token found" };
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
      body: JSON.stringify(submissionData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        success: false,
        message: errorData?.message || `HTTP ${res.status}: ${res.statusText}`,
      };
    }

    const result = await res.json();

    return result?.success !== undefined
      ? result
      : { success: false, message: "Invalid response format" };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};

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

export const getPurchaseHistory = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/transactions/purchases/${id}`,
      {
        headers: {
          Authorization: (await cookies()).get("token")!.value,
        },
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};

export const getSalesHistory = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/transactions/sales/${id}`,
      {
        headers: {
          Authorization: (await cookies()).get("token")!.value,
        },
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};
