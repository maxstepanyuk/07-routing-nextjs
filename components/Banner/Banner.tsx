import clsx from "clsx";

import css from "./Banner.module.css";

interface BannerProps {
  text: string;
  type?: "log" | "info" | "warning" | "error";
  positionStatic?: boolean;
}

export default function Banner({
  text,
  type = "log",
  positionStatic = false,
}: BannerProps) {
  const pClasses = clsx(
    css.text,
    !positionStatic && css.textAbsolute,
    type === "log" && css.log,
    type === "info" && css.info,
    type === "warning" && css.warning,
    type === "error" && css.error,
  );

  const divClasses = clsx(
    css.container,
    !positionStatic && css.containerRelative,
  );

  return (
    <div className={divClasses}>
      <p className={pClasses}>{text}</p>
    </div>
  );
}
