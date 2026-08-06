"use client";

import Banner from "@/components/Banner/Banner";

interface NotesErrorProps {
  error: Error;
}

export default function NotesError({ error }: NotesErrorProps) {
  return (
    <>
      <Banner
        text={"Could not fetch the list of notes. " + error.name}
        type="error"
        positionStatic
      />
      <p>{error.message}</p>
    </>
  );
}
