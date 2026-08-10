type NotesLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesFilterLayout({
  children,
  sidebar,
}: Readonly<NotesLayoutProps>) {
  return (
    <>
      {sidebar}
      {children}
    </>
  );
}
