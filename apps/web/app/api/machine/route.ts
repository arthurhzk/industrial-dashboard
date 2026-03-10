import { NextResponse } from "next/server";
import { getMachine } from "@repo/db";

export async function GET() {
  const machine = getMachine();
  if (!machine) {
    return NextResponse.json({ error: "Machine not found" }, { status: 404 });
  }
  return NextResponse.json(machine);
}