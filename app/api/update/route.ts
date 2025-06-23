import sg from "simple-git";
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

export async function GET(request: NextRequest) {
  const hash = request.nextUrl.searchParams.get("hash");

  if (!hash) {
    return NextResponse.json(
      { error: "Hash parameter is required" },
      { status: 400 }
    );
  }

  const git = sg(`.git`);
  await git.pull("origin", "main");
  await git.checkout(hash);

  await promisify(exec)("kamal deploy");

  return NextResponse.json({ message: "Updating..." });
}
