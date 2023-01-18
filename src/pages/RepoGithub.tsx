import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Logo } from "../assets/logo.svg";

// Const to store the Github API url 
const GITHUB_API_URL = "https://api.github.com";

const RepoGithub: React.FC = () => {
  // Hook to navigate between routes
  const navigate = useNavigate();
  // State to store the repository link input value
  const [repoLink, setRepoLink] = useState("");
  // State to store the error message 
  const [error, setError] = useState("");
  // State to store the loading status 
  const [loading, setLoading] = useState(false);
  // State to store the error visibility status 
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  // useEffect hook to handle error message visibility
  useEffect(() => {
    if (isErrorVisible) {
      setTimeout(() => setIsErrorVisible(false), 5000);
    }
  }, [isErrorVisible]);

  // function to handle form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Set loading status
    setLoading(true);


    try {

      // Extract the repository id from the link
      const matches = repoLink.match(/.*.com\/([^\/]*\/[^\/]*)/) || '';
      const repoId = matches?.length > 1 && matches[1]
      // Make a GET request to the Github API
      await axios.get(`${GITHUB_API_URL}/repos/${repoId}`);
      // Construct the route to navigate to
      const navigateTo = `/${repoId}`;
      // Navigate to the new route
      navigate(navigateTo);
    } catch (err) {
      // Set the error message
      setError("Oops something went wrong!");
      // Show the error message
      setIsErrorVisible(true);
    } finally {
      // Set loading status
      setLoading(false);
    }
  };
  return (
    <>
      <form className="mt-24" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-between">
          <div>
            <Logo className="dark:fill-primary-light fill-primary-dark " />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="dark:text-primary-light text-primary-dark mb-[100px] max-w-[480px]">
              Start by pasting the repository URL.
            </h1>
            <div className="flex gap-2 items-center">
              <input
                className="w-[640px] h-[38px] bg-transparent !outline-none border-b dark:border-primary-light border-primary-dark dark:text-primary-light text-primary-dark"
                type="text"
                id="repo-link"
                value={repoLink}
                placeholder="https://"
                onChange={(event) => setRepoLink(event.target.value)}
              />
              <button
                type="submit"
                className="items-center w-[84px] h-[38px] dark:bg-shade4-light bg-shade4-dark dark:text-primary-light text-primary-dark rounded-md"
                disabled={loading}
              >
                {loading ? "Loading" : "Submit"}
              </button>
            </div>
            {error && isErrorVisible && (
              <div className="dark:text-error-light text-error-dark font-bold mt-2">
                {error}
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default RepoGithub;
