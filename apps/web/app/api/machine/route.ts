import { NextResponse } from "next/server";
import { generateMetrics } from "@repo/data";
import { Machine } from "@repo/types";

export async function GET() {
  const metrics = generateMetrics();

  const machine: Machine = {
    id: "machine-1",
    name: "Industrial Press A1",
    status: "RUNNING",
    metrics,
    operatingTime: 540,
    lastMaintenance: "2026-03-01"
  };

  return NextResponse.json(machine);
}