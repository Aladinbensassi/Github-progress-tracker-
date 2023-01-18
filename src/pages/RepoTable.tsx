import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import RepoData from "../components/RepoData";
import RepoHeader from "../components/RepoHeader";

const RepoTable: React.FunctionComponent = () => {
  // Get the owner and project parameters from the URL
  const { owner, project } = useParams();

  // State variable to store the repository data
  const [repoData, setRepoData] = useState<RepoData | null>(null);

  // State variables to store the branches in different states
  const [inProgress, setInProgress] = useLocalStorage(
    `${owner}/${project}-progress`,
    []
  );
  const [inReview, setInReview] = useLocalStorage(
    `${owner}/${project}-review`,
    []
  );
  const [done, setDone] = useLocalStorage(`${owner}/${project}-done`, []);

  // State variable to store error messages
  const [error, setError] = useState("");

  // Use the useEffect hook to fetch data from the GitHub API when the component first renders
  useEffect(() => {
    // Fetch the repository data
    axios
      .get(`https://api.github.com/repos/${owner}/${project}`)
      .then(({ data }) => {
        // Store the repository data in the state variable
        setRepoData({
          name: data.name,
          description: data.description,
          stargazers_count: data.stargazers_count,
          branches_url: data.branches_url,
        });
        // Fetch the list of branches
        return axios.get(
          `https://api.github.com/repos/${owner}/${project}/branches`
        );
      })
      // Store the list of branches in the inProgress state variable
      .then(({ data: branches }) => setInProgress(branches))
      // If an error occurs, store the error message in the error state variable
      .catch(() => setError("There was an error"));
    console.log(error);
  }, []);

  return (
    <div className="text-black dark:text-white relative">
      {repoData && (
        <>
          <RepoHeader repoData={repoData} />
        </>
      )}
      <div className="flex gap-4 justify-between mt-24">
        <div className="flex flex-col gap-2 w-full min-w-[300px]">
          <p className="dark:text-shade2-light text-shade2-dark mb-4">
            In Progress
          </p>
          {inProgress.map((branch: RepoData) => (
            <div className="flex justify-between w-full rounded px-4 py-5 dark:bg-shade4-light bg-shade4-dark dark:md:hover:bg-shade3-light md:hover:bg-shade3-dark">
              <button disabled>
                <Arrow className="opacity-20 -scale-x-100 dark:stroke-shade2-light stroke-shade2-dark" />
              </button>

              <div className="max-w-[200px] truncate dark:text-shade2-light text-shade2-dark">
                {branch.name}
              </div>
              <button
                onClick={() => {
                  setInProgress((prev: RepoData[]) =>
                    prev.filter((b) => branch.name !== b.name)
                  );
                  setInReview((prev: RepoData[]) => [...prev, branch]);
                }}
              >
                <Arrow className="dark:stroke-shade2-light stroke-shade2-dark" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 w-full min-w-[300px]">
          <p className="dark:text-shade2-light text-shade2-dark mb-4">
            In Review ({inReview?.length})
          </p>
          {inReview?.map((branch: RepoData) => (
            <div className="flex justify-between w-full rounded px-4 py-5 dark:bg-shade4-light bg-shade4-dark dark:md:hover:bg-shade3-light md:hover:bg-shade3-dark">
              <button
                onClick={() => {
                  setInReview((prev: RepoData[]) =>
                    prev.filter((b) => branch.name !== b.name)
                  );
                  setInProgress((prev: RepoData[]) => [...prev, branch]);
                }}
              >
                <Arrow className="-scale-x-100 dark:stroke-shade2-light stroke-shade2-dark" />
              </button>
              <div className="max-w-[200px] truncate dark:text-shade2-light text-shade2-dark">
                {branch.name}
              </div>
              <button
                onClick={() => {
                  setInReview((prev: RepoData[]) =>
                    prev.filter((b) => branch.name !== b.name)
                  );
                  setDone((prev: RepoData[]) => [...prev, branch]);
                }}
              >
                <Arrow className="dark:stroke-shade2-light stroke-shade2-dark" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 w-full min-w-[300px]">
          <p className="dark:text-shade2-light text-shade2-dark mb-4">
            Ready to merge ({done?.length})
          </p>
          {done?.map((branch: RepoData) => (
            <div className="flex justify-between w-full rounded px-4 py-5 dark:bg-shade4-light bg-shade4-dark dark:md:hover:bg-shade3-light md:hover:bg-shade3-dark">
              <button
                onClick={() => {
                  setDone((prev: RepoData[]) =>
                    prev.filter((b) => branch.name !== b.name)
                  );
                  setInReview((prev: RepoData[]) => [...prev, branch]);
                }}
              >
                <Arrow className="-scale-x-100 dark:stroke-shade2-light stroke-shade2-dark" />
              </button>
              <div className="max-w-[200px] truncate dark:text-shade2-light text-shade2-dark">
                {branch.name}
              </div>
              <button disabled>
                <Arrow className="opacity-20 dark:stroke-shade2-light stroke-shade2-dark" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepoTable;
