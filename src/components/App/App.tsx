import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Banner from "../Banner/Banner";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenModal, setIsModalOpen] = useState(false);

  const { data, isError, isFetching, isStale } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () => {
      return fetchNotes(currentPage, searchQuery);
    },
    placeholderData: keepPreviousData,
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
        {isError && <Banner text="Error while fetching notes" type="error" />}

        {data && data.notes && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <>
            {!isError && !isFetching && (
              <Banner text="No notes found for your request." type="info" />
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
