"use server";

import { db } from "@/drizzle/config";
import { items } from "@/drizzle/schema";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  qty: z.string().min(1),
  category: z.string().min(1),
});

export const createItem = async (formData: FormData) => {
  try {
    const validated = schema.parse({
      name: formData.get("name"),
      qty: formData.get("qty"),
      category: formData.get("category"),
    });
    await db.insert(items).values({
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

//To be implemented: Delete, Update, Get one item by id

// export const getItems = async () => {
  //   try {
  //     const itms: any = await db.select().from(items);
  //     console.log(itms);
  //     return itms;
  //   } catch (error) {
  //     throw new Error("Something went wrong when fetching items!");
  //   }
  // };
  
  // export const editItem = async (formData: FormData) => {
  //   console.log(formData);
  // };

  
// export async function deleteItem(id: any) {
//   try {
//     const res: any = await db.delete(items).where(eq(items.id, id));
//     console.log(res);
//     // return res;
//   } catch (error) {
//     throw new Error("Something went wrong when fetching items!");
//   }
// }
