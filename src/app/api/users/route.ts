import { NextResponse, NextRequest } from "next/server";
import { db } from "@/drizzle/config";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { usr } from "@/@types/user";

export const GET = async (request: NextRequest) => {
  const email: string = request.nextUrl.searchParams.get("email")!;
  try {
    const user: usr[] = await db
      .select()
      .from(users)
      .where(eq(users.email, `${email}`));
    console.log(user);
    if (user.length > 0) {
      return new NextResponse(JSON.stringify({ data: user }), {
        status: 200,
      });
    } else {
      return new NextResponse(JSON.stringify("User not found"), {
        status: 404,
      });
    }
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const userid = await db
      .insert(users)
      .values(body)
      .returning({ userid: users.id });
    console.log(userid);
    return new NextResponse(JSON.stringify({ data: userid }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};