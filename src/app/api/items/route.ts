import { NextResponse, NextRequest } from "next/server";
import { db } from "@/drizzle/config";
import { items } from "@/drizzle/schema";
import { itm } from "@/@types/item";
import { eq } from "drizzle-orm";

export const GET = async (request: NextRequest) => {
  try {
    const itms: itm[] = await db.select().from(items);
    // console.log(itms);
    return new NextResponse(JSON.stringify({ data: itms }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const id: string | null = request.nextUrl.searchParams.get("id");
  console.log(id);
  try {
    await db.delete(items).where(eq(items.id, `${id}`));
    return new NextResponse("Item deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  const id: string | null = request.nextUrl.searchParams.get("id");
  // console.log(id);
  console.log(request.body);
  try {
    console.log("Id:", id);
    const updatedItem: Partial<itm> = await request.json();
    console.log(updatedItem);
    await db
      .update(items)
      .set(updatedItem as any)
      .where(eq(items.id, `${id}`));
    return new NextResponse("Item updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
