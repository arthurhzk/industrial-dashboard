import { NextResponse } from "next/server";
import { getAlerts } from "@repo/db";

export async function GET() {
  const alerts = getAlerts();
  return NextResponse.json(alerts);
}