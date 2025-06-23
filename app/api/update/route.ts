import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { gotoHash } from "@/util/git";

export async function GET(request: NextRequest) {
  const hash = request.nextUrl.searchParams.get("hash");

  if (!hash) {
    return NextResponse.json(
      { error: "Hash parameter is required" },
      { status: 400 }
    );
  }

  await gotoHash(hash);

  exec("kamal deploy", (_error, stdout, stderr) => {
    console.log("stdout:", stdout);
    console.error("stderr:", stderr);
  });

  return NextResponse.json({ message: "Updating..." });
}
