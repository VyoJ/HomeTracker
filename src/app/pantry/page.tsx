"use client";

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
import axios from "axios";
import { itm } from "@/@types/item";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ItemsPage() {
  const { toast } = useToast();
  const [itms, setItems] = useState<any>([]);
  const [refresh, setRefresh] = useState<Boolean>(false);

  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [category, setCategory] = useState("");

  async function handleDelete(id: string) {
    console.log(id);
    try {
      let res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL!}/api/items?id=${id}`
      );
      if (res.status === 200) {
        toast({
          title: "Item deleted successfully",
        });
        setRefresh(true);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Item could not be deleted successfully",
        variant: "destructive",
      });
    }
  }

  async function handleEdit(itm: itm) {
    console.log(name, qty, category);
    console.log(itm);
    let updatedFields = { name, qty, category };
    try {
      let res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL!}/api/items?id=${itm.id}`,
        updatedFields
      );
      if (res.status === 200) {
        toast({
          title: "Item edited successfully",
        });
        setRefresh(true);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Item could not be edited successfully",
        variant: "destructive",
      });
    }
  }

  const handleSheetTriggerClick = (itm: itm) => {
    setName(itm.name);
    setQty(itm.qty);
    setCategory(itm.category);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL!}/api/items`)
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setRefresh(false);
  }, [refresh]);

  if (!itms) return <p>No item data found</p>;

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
          {itms.map((itm: itm) => {
            return (
              <Card
                key={itm.id}
                className={`m-2 ${itm.qty === "1" ? "border-red-400" : ""}`}
              >
                <CardHeader className="grid grid-cols-2">
                  <div>
                    <CardTitle className="mb-2">{itm.name}</CardTitle>
                    <CardDescription>{itm.category}</CardDescription>
                  </div>
                  <div className="flex justify-end">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mr-2"
                          onClick={() => handleSheetTriggerClick(itm)}
                        >
                          <Pencil />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Edit item</SheetTitle>
                          <SheetDescription>
                            Make changes to your item here. Click save when
                            you're done.
                          </SheetDescription>
                        </SheetHeader>
                        <form className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={name}
                              className="col-span-3"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                              Quantity
                            </Label>
                            <Input
                              id="qty"
                              value={qty}
                              className="col-span-3"
                              onChange={(e) => setQty(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Category
                            </Label>
                            <Input
                              id="category"
                              value={category}
                              className="col-span-3"
                              onChange={(e) => setCategory(e.target.value)}
                            />
                          </div>
                        </form>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button
                              type="submit"
                              onClick={() => {
                                handleEdit(itm);
                              }}
                            >
                              Save changes
                            </Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(itm.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Quantity: {itm.qty}</p>
                </CardContent>
              </Card>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
