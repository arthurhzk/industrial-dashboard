import { NextResponse } from "next/server";
import { Alert } from "@repo/types";

function generateAlerts(): Alert[] {
  return [
    {
      id: "1",
      machineId: "machine-1",
      message: "High temperature detected",
      severity: "HIGH",
      timestamp: Date.now() - 20000,
      resolved: false
    },
    {
      id: "2",
      machineId: "machine-1",
      message: "Vibration above threshold",
      severity: "MEDIUM",
      timestamp: Date.now() - 60000,
      resolved: false
    }
  ];
}

export async function GET() {
  return NextResponse.json(generateAlerts());
}