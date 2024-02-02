"use server";

import { db } from "@/drizzle/config";
import { items } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getItems = async () => {
  try {
    const itms: any = await db.select().from(items);
    console.log(itms);
    return itms;
  } catch (error) {
    throw new Error("Something went wrong when fetching items!");
  }
};


//To be implemented: Delete, Update, Get one item by id

// export async function deleteItem(id: any) {
//   try {
//     const res: any = await db.delete(items).where(eq(items.id, id));
//     console.log(res);
//     // return res;
//   } catch (error) {
//     throw new Error("Something went wrong when fetching items!");
//   }
// }
