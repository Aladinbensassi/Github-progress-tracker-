import React from "react";
import { ReactComponent as Star } from "../assets/star.svg";
import RepoData from "./RepoData";
import NumericLabel from "react-pretty-numbers";
import BackButton from "../components/BackButton";

interface Props {
  repoData: RepoData;
}

const RepoHeader: React.FunctionComponent<Props> = ({ repoData }) => {
  let shortFormat = {
    shortFormat: true,
    precision: 1,
  };
  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="dark:text-primary-light text-primary-dark w-[360px] mx-auto mb-5">
        {repoData.name}
      </h1>
      <h2 className="dark:text-shade2-light text-shade2-dark w-[360px] mx-auto">
        {repoData.description}
      </h2>
      <div className="flex flex-row absolute top-0 right-0 gap-2">
        <Star className="dark:fill-shade2-light fill-shade2-dark " />{" "}
        <p className="dark:text-shade2-light text-shade2-dark">
          <NumericLabel params={shortFormat}>
            {repoData.stargazers_count}
          </NumericLabel>
        </p>
      </div>
      <BackButton />
    </div>
  );
};

export default RepoHeader;
