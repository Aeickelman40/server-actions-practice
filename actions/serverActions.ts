"use server";

import { Product } from "@/typings";
import { revalidatePath, revalidateTag } from "next/cache";

export const addProductToDatabase = async (e: FormData) => {
  const product = e.get("product")?.toString();
  const price = e.get("price")?.toString();

  if (!product || !price) return;

  const newProduct: Product = {
    product: product,
    price: price,
  };

  await fetch("https://64c098440d8e251fd1123b37.mockapi.io/products", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // revalidate based on tag to pull limited amount
  revalidateTag("products");

  //   revalidate everything
  //   revalidatePath("/products");
};

export const submitImage = async (e: FormData) => {};
