import { getCommits } from "@/util/git";

export default async function Home() {
  const commits = await getCommits();
  
  return (
    <div className="overflow-x-auto mx-auto mt-12">
      <table className="min-w-full text-sm border border-gray-200 bg-[--foreground] rounded-lg shadow">
        <thead>
          <tr>
            {Object.keys(commits[0]).map((key) => (
              <th
                key={key}
                className="px-4 py-3 bg-[--background] font-semibold text-left uppercase tracking-wider border-b border-gray-200"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {commits.map((commit, idx) => (
            <tr
              key={commit.hash}
              className={
                idx % 2 === 0
                  ? "bg-[--foreground]"
                  : "bg-[--background] hover:bg-[--foreground]"
              }
            >
              {Object.values(commit).map((value, i) => (
                <td
                  key={i}
                  className="px-4 py-2 border-b border-gray-100 max-w-xs truncate"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
