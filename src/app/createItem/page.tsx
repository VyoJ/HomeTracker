"use client";

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
import { createItem } from "../actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function CreateItem() {
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(formdata: FormData) {
    const userid = localStorage.getItem("userid") as string;
    formdata.append("userid", userid);
    let res = await createItem(formdata);
    console.log(res);
    if (res.status === 200) {
      toast({
        title: "Item created successfully",
        description: "Redirecting to pantry page",
      });
      router.push("/pantry");
    } else {
      toast({
        title: "Item could not be created successfully",
        description: res.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Item</h1>
        <form className="space-y-4" action={onSubmit}>
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="qty"
              placeholder="Enter quantity"
              type="number"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <Select name="category">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Staples">Staples</SelectItem>
                <SelectItem value="Ingredients">Ingredients</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
                <SelectItem value="Home">Home</SelectItem>
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
