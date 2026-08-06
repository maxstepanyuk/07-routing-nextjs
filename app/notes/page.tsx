import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesPageClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // note: use the same values as in default states values in AppClient
  // todo? get from a config file for the page
  const currentPageInit = 1; 
  const searchQueryInit = ""; 

  await queryClient.prefetchQuery({
    queryKey: ["notes", currentPageInit, searchQueryInit],
    queryFn: () => {
      return fetchNotes(currentPageInit, searchQueryInit);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPageClient />
    </HydrationBoundary>
  );
}
