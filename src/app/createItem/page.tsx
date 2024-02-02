import { revalidatePath } from "next/cache";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { z } from "zod";

import { db } from "@/drizzle/config";
import { items } from "@/drizzle/schema";
import { redirect } from "next/navigation";

const schema = z.object({
  name: z.string().min(1),
  qty: z.string().min(1),
  category: z.string().min(1),
});

function CreateItem() {
  const createItem = async (formData: FormData) => {
    "use server";

    const validated = schema.parse({
      name: formData.get("name"),
      qty: formData.get("qty"),
      category: formData.get("category"),
    });

    try {
      await db.insert(items).values({
        name: validated.name,
        qty: validated.qty,
        category: validated.category,
      });

      revalidatePath("/pantry");
      redirect("/pantry");
      return {
        message: "Item added successfully!",
        revalidated: true,
        now: Date.now(),
      };
    } catch (error) {
      return {
        message: "Something went wrong when creating the item!",
      };
    }
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Add Item
        </h1>
        <form className="space-y-4" action={createItem}>
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" name="qty" placeholder="Enter quantity" type="number" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <Select name="category">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Staples</SelectItem>
                <SelectItem value="fashion">Ingredients</SelectItem>
                <SelectItem value="books">Utilities</SelectItem>
                <SelectItem value="home">Home</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateItem;


    // <form
    //   className="inline-flex items-start flex-col space-y-4 border-solid border-black border-2 p-4 mt-2 w-80"
    //   action={createItem}
    // >
    //   <div className="w-full">
    //     <label htmlFor="name" className="block">
    //       Name:
    //     </label>

    //     <input
    //       id="name"
    //       name="name"
    //       type="text"
    //       className="border-solid border-black border-2 block w-full"
    //       required
    //     />
    //   </div>

    //   <div className="w-full">
    //     <label htmlFor="content" className="block">
    //       Quantity:
    //     </label>

    //     <textarea
    //       id="qty"
    //       name="qty"
    //       className="border-solid border-black border-2 block w-full"
    //       required
    //     />
    //   </div>

    //   <div className="w-full">
    //     <label htmlFor="category" className="block">
    //       Category:
    //     </label>

    //     <select
    //       id="category"
    //       name="category"
    //       className="border-solid border-black border-2 block w-full"
    //       required
    //     >
    //       <option value="">Select category</option>
    //       <option value="yellow">Yellow</option>
    //       <option value="green">Green</option>
    //       <option value="blue">Blue</option>
    //       <option value="purple">Purple</option>
    //     </select>
    //   </div>

    //   <button
    //     className="border-solid border-black border-2 py-1 px-4 hover:bg-black hover:text-white w-full"
    //     type="submit"
    //   >
    //     Create Item
    //   </button>
    // </form>