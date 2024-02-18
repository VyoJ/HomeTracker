"use server";

import { db } from "@/drizzle/config";
import { items, users } from "@/drizzle/schema";
import { string, z } from "zod";
import { eq } from "drizzle-orm";

const schema = z.object({
  userid: z.string().min(1),
  name: z.string().min(1),
  qty: z.string().min(1),
  category: z.string().min(1),
});

export const createItem = async (formData: FormData) => {
  try {
    const validated = schema.parse({
      userid: formData.get("userid"),
      name: formData.get("name"),
      qty: formData.get("qty"),
      category: formData.get("category"),
    });
    await db.insert(items).values({
      user: validated.userid,
      name: validated.name,
      qty: validated.qty,
      category: validated.category,
    });
    return {
      status: 200,
      message: "Item added successfully!",
      revalidated: true,
      now: Date.now(),
    };
  } catch (error) {
    return {
      status: 500,
      message: "Something went wrong when creating the item!",
    };
  }
};
