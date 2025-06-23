"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [commits, setCommits] = useState<
    {
      hash: string;
      message: string;
      current: string;
    }[]
  >([]);

  useEffect(() => {
    fetch("/api/commits")
      .then((res) => res.json())
      .then((json) => setCommits(json));
  }, []);

  return (
    <div className="overflow-x-auto mx-auto p-[1vh]">
      <table className="min-w-full text-sm border border-gray-200 bg-[--foreground] rounded-lg shadow">
        <thead>
          <tr>
            {commits.length ? (
              Object.keys(commits[0]).map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 bg-[--background] font-semibold text-left uppercase tracking-wider border-b border-gray-200"
                >
                  {key}
                </th>
              ))
            ) : (
              <></>
            )}
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
              <button
                onClick={() => {
                  fetch(`/api/update?hash=${commit.hash}`)
                    .then((res) => res.json())
                    .then((json) => {
                      if (json.error) {
                        alert(json.error);
                      } else {
                      }
                    });
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Update
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
