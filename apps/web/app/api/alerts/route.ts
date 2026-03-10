import { NextResponse } from "next/server";
import { Alert } from "@repo/types";

function generateAlerts(): Alert[] {
  return [
    {
      id: "1",
      machineId: "machine-1",
      message: "Temperatura alta detectada",
      severity: "HIGH",
      timestamp: Date.now() - 20000,
      resolved: false
    },
    {
      id: "2",
      machineId: "machine-1",
      message: "Vibração acima do limite",
      severity: "MEDIUM",
      timestamp: Date.now() - 60000,
      resolved: false
    }
  ];
}

export async function GET() {
  return NextResponse.json(generateAlerts());
}