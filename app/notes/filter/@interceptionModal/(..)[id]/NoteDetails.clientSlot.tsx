"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetailsSlot.client.module.css";

import { fetchNoteById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Banner from "@/components/Banner/Banner";
import Modal from "@/components/Modal/Modal";

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export default function NoteDetailsSlotClient() {
  const router = useRouter();
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

  function onModalClose() {
    router.back();
  }

  if (isLoading) return <Banner text="Loading" type="info" positionStatic />;

  if (isError || !note)
    return <Banner text="Something went wrong." type="error" positionStatic />;

  return (
    <Modal onClose={onModalClose}>
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
    </Modal>
  );
}
