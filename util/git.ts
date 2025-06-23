import sg from "simple-git";

async function setupGit() {
  const git = sg();
  await git.addConfig(
    "safe.directory",
    `*`,
    false,
    "global"
  );
}

export async function getCommits() {
  await setupGit();

  const git = sg();

  const branch = await git.branch();

  await git.fetch();
  const logs = await git.log([`origin/${branch.current}`]);

  const currentCommitHash = await git.revparse(["HEAD"]);

  const commits = logs.all.map((commit) => ({
    hash: commit.hash,
    message: commit.message,
    current: commit.hash == currentCommitHash ? "true" : "false",
  }));

  return commits;
}

export async function gotoHash(hash: string) {
  await setupGit();

  const git = sg();
  await git.pull("origin", "main");
  await git.checkout(hash);
}
