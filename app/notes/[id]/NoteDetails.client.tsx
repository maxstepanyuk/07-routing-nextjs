"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetails.client.module.css";

import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import Banner from "@/components/Banner/Banner";
import Link from "next/link";
import { formatDate } from "@/lib/util";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => {
      return fetchNoteById(id);
    },
    refetchOnMount: false,
  });

  if (isLoading) return <Banner text="Loading" type="info" positionStatic />;

  if (isError || !note)
    return <Banner text="Something went wrong." type="error" positionStatic />;

  return (
    <>
      <Link href="/notes/filter/all" className={css.backBtn}>
        Back to notes
      </Link>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note?.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {formatDate(new Date(note.updatedAt ?? note.createdAt))}
          </p>
        </div>
      </div>
    </>
  );
}
