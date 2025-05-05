"use client";

import { Around } from "@theme-toggles/react";
import { useTheme } from "./theme-provider.client";
import { useRef } from "react";
import { flushSync } from "react-dom";
import "@theme-toggles/react/css/Around.css";

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const themeRef = useRef<HTMLButtonElement>(null);

  const handleThemeChange = () => {
    if (
      !themeRef.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    if (!themeRef.current) return;

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(theme === "dark" ? "light" : "dark");
      });
    });

    transition.ready.then(() => {
      const { top, left, width, height } =
        themeRef.current!.getBoundingClientRect();

      const x = left + width / 2;
      const y = top + height / 2;
      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRadius = Math.hypot(
        Math.max(left, right),
        Math.max(top, bottom)
      );
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1000,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };
  return (
    /* @ts-expect-error : lib issue*/
    <Around
      ref={themeRef}
      duration={800}
      className="text-xl w-fit"
      onClickCapture={handleThemeChange}
    />
  );
};

export default ThemeSwitcher;
