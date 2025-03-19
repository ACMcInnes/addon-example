"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Field, Label, Switch } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="z-20 w-fit absolute right-2 top-1 p-2">
      {/*
        <button className={`z-20 w-fit absolute right-2 top-1 p-2 rounded-md hover:scale-110 active:scale=100 duration-200 bg-slate-200 dark:bg-[#212933]`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "light" ? "Dark " : "Light "}
        {theme === "light" ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
        </button>
        */}

      <Field>
        <Label className="align-text-bottom text-white hidden md:inline-flex">
          Theme
        </Label>
        <Switch
          defaultChecked={true}
          onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          name="theme-toggle"
          className="inline-flex ml-2 group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/40 p-1 transition-colors duration-200 ease-in-out focus:outline-hidden data-focus:outline-1 data-focus:outline-white data-checked:bg-white/40"
        >
          <span className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white text-slate-800 ring-0 shadow-lg transition duration-200 ease-in-out group-data-checked:translate-x-7">
            {resolvedTheme === "dark" ? (
              <FontAwesomeIcon icon={faMoon} className="align-text-top!" />
            ) : (
              <FontAwesomeIcon icon={faSun} className="align-text-top!" />
            )}
          </span>
        </Switch>
      </Field>
    </div>
  );
};
