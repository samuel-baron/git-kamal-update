import { getCommits } from "@/util/git";

export default async function Home() {
  const commits = await getCommits();

  return JSON.stringify(commits, null, 2);
}
