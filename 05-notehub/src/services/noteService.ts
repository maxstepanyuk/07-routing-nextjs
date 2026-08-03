import axios from "axios";
import type { CreateNote, Note } from "../types/note";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const NOTES_PER_PAGE = 12;

const notesApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page?: number,
  search?: string,
): Promise<FetchNotesResponse> {
  const { data } = await notesApi.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      search,
      perPage: NOTES_PER_PAGE,
    },
  });

  return data;
}

export async function createNote(note: CreateNote): Promise<Note> {
  const { data } = await notesApi.post<Note>("/notes", note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await notesApi.delete<Note>("/notes/" + id);
  return data;
}
