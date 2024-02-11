"use server";

import { db } from "@/drizzle/config";
import { items, users } from "@/drizzle/schema";
import { string, z } from "zod";
import { eq } from "drizzle-orm";

const schema = z.object({
  name: z.string().min(1),
  qty: z.string().min(1),
  category: z.string().min(1),
});

export const authUser = async (email: string) => {
  try {
    let result = await db
      .select()
      .from(users)
      .where(eq(users.email, `${email}`));
    console.log("Server action:", result);
    if (result) {
      return {
        data: result[0].id,
        status: 200,
        message: "User authenticated successfully!",
        now: Date.now(),
      };
    } else {
      return {
        status: 404,
        message: "User not found",
        now: Date.now(),
      };
    }
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (userData: any) => {
  try {
    let userid = await db
      .insert(users)
      .values({
        name: userData.name,
        email: userData.email,
      })
      .returning({ userid: users.id });
    console.log(userid);
    return {
      data: userid[0].userid,
      status: 200,
      message: "User added and authenticated successfully!",
      now: Date.now(),
    };
  } catch (error) {
    return {
      status: 500,
      message: "Something went wrong when creating the user!",
    };
  }
};

export const createItem = async (formData: FormData) => {
  try {
    const validated = schema.parse({
      name: formData.get("name"),
      qty: formData.get("qty"),
      category: formData.get("category"),
    });
    await db.insert(items).values({
      user: "1",    //change
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
