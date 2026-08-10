import css from "./layout.module.css";

type NotesLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  interceptionModal: React.ReactNode;
};

export default function NotesFilterLayout({
  children,
  sidebar,
  interceptionModal,
}: Readonly<NotesLayoutProps>) {
  return (
    <div className={css.container}>
      <div className={css.sidebar}>{sidebar}</div>
      <div className={css.notesWrapper}>{children}</div>

      {interceptionModal}
    </div>
  );
}
