"use client";

import css from "./Notes.client.module.css";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Banner from "@/components/Banner/Banner";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesPageClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenModal, setIsModalOpen] = useState(false);

  const { data, isError, isFetching, isStale } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () => {
      return fetchNotes(currentPage, searchQuery);
    },
    placeholderData: keepPreviousData,
    staleTime: 15 * 1000,
    refetchOnMount: false,
  });

  const handleSearchDebounced = useDebouncedCallback((searchQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(searchQuery);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearchDebounced} query={searchQuery} />

        {data && data.totalPages > 0 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {isFetching && isStale && <Banner text="Loading" type="log" />}
        {isError && <Banner text="Error while fetching notes" type="error" positionStatic/>}

        {data && data.notes && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <>
            {!isError && !isFetching && (
              <Banner text="No notes found for your request." type="info" positionStatic />
            )}
          </>
        )}
      </main>

      {isOpenModal && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
