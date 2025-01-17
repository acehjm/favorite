import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Bookmark, BookmarkState } from "@/types/bookmark";

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      isLoading: false,
      error: null,

      addBookmark: async (bookmark) => {
        try {
          set({ isLoading: true, error: null });
          const newBookmark: Bookmark = {
            ...bookmark,
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          set((state) => ({
            bookmarks: [...state.bookmarks, newBookmark],
            isLoading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            isLoading: false,
          });
        }
      },

      updateBookmark: async (id, bookmark) => {
        try {
          set({ isLoading: true, error: null });
          set((state) => ({
            bookmarks: state.bookmarks.map((item) =>
              item.id === id
                ? { ...item, ...bookmark, updatedAt: new Date() }
                : item
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            isLoading: false,
          });
        }
      },

      deleteBookmark: async (id) => {
        try {
          set({ isLoading: true, error: null });
          set((state) => ({
            bookmarks: state.bookmarks.filter((item) => item.id !== id),
            isLoading: false,
          }));
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Unknown error",
            isLoading: false,
          });
        }
      },

      getBookmarks: async () => {
        set({ isLoading: true, error: null });
        const { bookmarks } = get();
        set({ isLoading: false });
        return bookmarks;
      },
    }),
    {
      name: "bookmark-storage",
      skipHydration: true,
    }
  )
);
