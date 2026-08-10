import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesPageClient from "./Notes.client";

// todo? move to util
export const PARAMS_INDEX = {
  TAG_NAME: 0,
};

interface NotesPageProps {
  params: Promise<{ filters: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();

  const { filters } = await params;

  const tagName = filters[PARAMS_INDEX.TAG_NAME];

  // note: use the same values as in default states values in AppClient
  // todo? get from a config file for the page
  const currentPageInit = 1;
  const searchQueryInit = "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", tagName, searchQueryInit, currentPageInit],
    queryFn: () => {
      return fetchNotes(currentPageInit, searchQueryInit, tagName);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPageClient />
    </HydrationBoundary>
  );
}
