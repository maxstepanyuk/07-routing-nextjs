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
    <>
      {sidebar}
      {children}
      {interceptionModal}
    </>
  );
}
