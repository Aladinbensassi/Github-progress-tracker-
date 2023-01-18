import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

interface Props {}

const Layout: React.FC<Props> = () => {
  const toggleDarkMode = () => {
    const theme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", theme);
    document.body.classList.toggle("dark", theme === "dark");
  };

  useEffect(() => {
    document.body.classList.toggle(
      "dark",
      localStorage.getItem("theme") === "dark"
    );
  }, []);

  return (
    <div
      className={`p-32 dark:bg-shade5-light  bg-shade5-dark min-h-screen w-screen`}
    >
      <button
        onClick={toggleDarkMode}
        className="items-center w-[84px] h-[38px] dark:bg-shade4-light bg-shade4-dark dark:text-primary-light text-primary-dark rounded-md fixed bottom-0 right-0"
      >
        Switch Mode
      </button>
      <Outlet />
    </div>
  );
};

export default Layout;
