import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const menu = await prisma.item.findMany();

    return NextResponse.json(
      {
        status: "success",
        data: menu,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "There was a problem getting menu",
      },
      {
        status: 500,
      }
    );
  }
}
