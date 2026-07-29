import clsx from "clsx";

import css from "./Banner.module.css";

interface BannerProps {
  text: string;
  type?: "log" | "info" | "warning" | "error";
}

export default function Banner({ text, type = "log" }: BannerProps) {
  const classes = clsx(
    css.text,
    type === "log" && css.log,
    type === "info" && css.info,
    type === "warning" && css.warning,
    type === "error" && css.error,
  );

  return (
    <div className={css.container}>
      <p className={classes}>{text}</p>
    </div>
  );
}
