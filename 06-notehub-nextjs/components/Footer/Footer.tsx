import Link from "next/link";

import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Maks Step (maxstepanyuk)</p>
          <p>
            Contact us:
            <Link href="https://maksstep.com" target="_blank">maksstep.com</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
