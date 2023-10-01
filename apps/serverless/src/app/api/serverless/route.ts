import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

declare namespace global {
  let prisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export const dynamic = "force-dynamic";

const time = Date.now();

export async function GET(req: NextRequest) {
  const numofQueries = req.nextUrl.searchParams.get("numofqueries");
  const parsedNumOfQueries = numofQueries ? parseInt(numofQueries) : 1;

  const timeStarted = Date.now();

  for (let i = 0; i < parsedNumOfQueries; i++) {
    await prisma.product.findMany();
  }

  return NextResponse.json({
    duration: Date.now() - timeStarted,
    isColdStart: time === timeStarted,
  });
}
