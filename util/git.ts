import sg from "simple-git";

export async function getCommits() {
  const git = sg(`${process.cwd()}`);
  const branch = await git.branch();

  await git.fetch();
  const logs = await git.log([`origin/${branch.current}`]);

  const currentCommitHash = await git.revparse(["HEAD"]);

  const commits = logs.all.map((commit) => ({
    hash: commit.hash,
    message: commit.message,
    current: commit.hash == currentCommitHash ? 'true' : 'false',
  }));

  return commits;
}
