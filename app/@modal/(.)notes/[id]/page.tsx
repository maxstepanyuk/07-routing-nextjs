import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsSlotClient from "./NoteDetails.clientSlot";

type NoteDetailsSlotProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsSlot({ params }: NoteDetailsSlotProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => {
      return fetchNoteById(id);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsSlotClient />
    </HydrationBoundary>
  );
}
