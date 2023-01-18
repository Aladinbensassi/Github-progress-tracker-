import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RepoTable from "./pages/RepoTable";
import RepoGithub from "./pages/RepoGithub";
import Layout from "./components/Layout";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<RepoGithub />} />
          <Route path="/:owner/:project" element={<RepoTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
