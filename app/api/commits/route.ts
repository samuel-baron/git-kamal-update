import { getCommits } from "@/util/git";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await getCommits());
}
