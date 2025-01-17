import { z } from "zod";

export const bookmarkSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  title: z.string().min(1),
  description: z.string().optional(),
  tags: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
favicon: z.string().optional(),
});

export type Bookmark = z.infer<typeof bookmarkSchema>;

export interface BookmarkState {
  bookmarks: Bookmark[];
  isLoading: boolean;
  error: string | null;
  addBookmark: (
    bookmark: Omit<Bookmark, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateBookmark: (id: string, bookmark: Partial<Bookmark>) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
  getBookmarks: () => Promise<Bookmark[]>;
}
