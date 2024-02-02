// "use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { PlusSquare, Trash2, Pencil } from "lucide-react";

// import { db } from "@/drizzle/config";
// import { items } from "@/drizzle/schema";
import { getItems } from "../actions";

// const getItems = async () => {
//   try {
//     const itms = await db.select().from(items);
//     // console.log(itms);
//     return itms;
//   } catch (error) {
//     throw new Error("Something went wrong when fetching items!");
//   }
// };

// const handleDeleteClick = (item: any) => {
//   console.log(`Deleting item with id ${item.id}`);
//   console.log(`Item name: ${item.name}`);
//   console.log(`Item category: ${item.category}`);
//   console.log(`Item quantity: ${item.qty}`);
// };

export default async function ItemsPage() {
  const itms = await getItems();

  return (
    <div className="mx-4">
      <div className="mt-4">
        <Link href="/createItem">
          <Button>
            <PlusSquare className="mr-2" />
            Create Item
          </Button>
        </Link>
        <h2 className="my-4 text-2xl font-bold">Your Items</h2>

        <ul className="grid grid-cols-1 lg:grid-cols-4">
          {itms.length
            ? itms.map((itm: any) => {
                return (
                  <Card key={itm.id} className="m-2">
                    <CardHeader className="grid grid-cols-2">
                      <div>
                        <CardTitle>{itm.name}</CardTitle>
                        <CardDescription>{itm.category}</CardDescription>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="destructive"
                          size="icon"
                          // action={}
                        >
                          <Trash2 />
                        </Button>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="mr-2"
                            >
                              <Pencil />
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Edit item</SheetTitle>
                              <SheetDescription>
                                Make changes to your item here. Click save
                                when you're done.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="name"
                                  value="Item Name"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="quantity"
                                  className="text-right"
                                >
                                  Quantity
                                </Label>
                                <Input
                                  id="qty"
                                  value="1"
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Category
                                </Label>
                                <Input
                                  id="category"
                                  value="Category"
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <SheetFooter>
                              <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                              </SheetClose>
                            </SheetFooter>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>Quantity: {itm.qty}</p>
                    </CardContent>
                  </Card>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}
