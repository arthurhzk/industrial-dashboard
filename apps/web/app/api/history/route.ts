import { NextResponse } from "next/server";
import { getMetricHistory } from "@repo/db";

export async function GET() {
  const history = getMetricHistory(30);
  return NextResponse.json(history);
}