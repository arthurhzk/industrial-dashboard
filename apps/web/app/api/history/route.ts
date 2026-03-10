import { NextResponse } from "next/server";
import { generateHistory } from "@repo/data";

export async function GET() {
  const history = generateHistory(30);

  return NextResponse.json(history);
}