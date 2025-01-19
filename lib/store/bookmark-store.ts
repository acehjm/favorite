import type {
  Bookmark,
  BookmarkFilter,
  BookmarkView,
  Tag,
} from '@/types/bookmark';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarkState {
  bookmarks: Bookmark[];
  view: BookmarkView;
  sort: 'created-desc' | 'created-asc' | 'updated-desc' | 'updated-asc' | 'title-asc' | 'title-desc';
  filter: BookmarkFilter;
  tags: Tag[];
  isLoading: boolean;
  error: Error | null;
}

interface BookmarkActions {
  setView: (view: BookmarkView) => void;
  setSort: (sort: 'created-desc' | 'created-asc' | 'updated-desc' | 'updated-asc' | 'title-asc' | 'title-desc') => void;
  setFilter: (filter: BookmarkFilter) => void;
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt' | 'isPinned' | 'isPrivate' | 'status' | 'visitCount'>) => void;
  updateBookmark: (id: string, bookmark: Partial<Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteBookmark: (id: string) => void;
  togglePin: (id: string) => void;
  addTag: (tag: Omit<Tag, 'id'>) => void;
  updateTag: (id: string, tag: Partial<Tag>) => void;
  deleteTag: (id: string) => void;
}

const initialState: BookmarkState = {
  bookmarks: [],
  view: 'grid',
  sort: 'created-desc',
  filter: {
    query: '',
    tags: [],
  },
  tags: [],
  isLoading: false,
  error: null,
};

export const useBookmarkStore = create<BookmarkState & BookmarkActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setView: (view) => set({ view }),
      setSort: (sort) => set({ sort }),
      setFilter: (filter) => set({ filter }),

      addBookmark: (bookmark) => {
        try {
          set({ isLoading: true, error: null });
          const bookmarks = get().bookmarks;
          const newBookmark: Bookmark = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAt: new Date(),
            isPinned: false,
            isPrivate: false,
            status: 'active',
            visitCount: 0,
            ...bookmark,
          };
          set({
            bookmarks: [newBookmark, ...bookmarks],
            isLoading: false,
          });
        } catch (error) {
          set({ error: error as Error, isLoading: false });
        }
      },

      updateBookmark: (id, bookmark) => {
        try {
          set({ isLoading: true, error: null });
          const bookmarks = get().bookmarks;
          const index = bookmarks.findIndex((b) => b.id === id);
          if (index === -1) throw new Error('Bookmark not found');

          const updatedBookmark = {
            ...bookmarks[index],
            ...bookmark,
            updatedAt: new Date(),
          };
          bookmarks[index] = updatedBookmark;
          set({ bookmarks: [...bookmarks], isLoading: false });
        } catch (error) {
          set({ error: error as Error, isLoading: false });
        }
      },

      deleteBookmark: (id) => {
        try {
          set({ isLoading: true, error: null });
          const bookmarks = get().bookmarks;
          const index = bookmarks.findIndex((b) => b.id === id);
          if (index === -1) throw new Error('Bookmark not found');

          bookmarks.splice(index, 1);
          set({ bookmarks: [...bookmarks], isLoading: false });
        } catch (error) {
          set({ error: error as Error, isLoading: false });
        }
      },

      togglePin: (id) => {
        try {
          set({ isLoading: true, error: null });
          const bookmarks = get().bookmarks;
          const index = bookmarks.findIndex((b) => b.id === id);
          if (index === -1) throw new Error('Bookmark not found');

          bookmarks[index].isPinned = !bookmarks[index].isPinned;
          bookmarks[index].updatedAt = new Date();
          set({ bookmarks: [...bookmarks], isLoading: false });
        } catch (error) {
          set({ error: error as Error, isLoading: false });
        }
      },

      addTag: (tag) => {
        try {
          set({ isLoading: true, error: null });
          const tags = get().tags;
          
          // 检查标签名是否已存在
          if (tags.some((t) => t.name === tag.name)) {
            throw new Error('标签名已存在');
          }

          const newTag: Tag = {
            id: crypto.randomUUID(),
            isPrivate: false,
            ...tag,
          };
          set({
            tags: [...tags, newTag],
            isLoading: false,
          });
        } catch (error) {
          set({ error: error as Error, isLoading: false });
        }
      },

      updateTag: (id, tag) => {
        try {
          set({ isLoading: true, error: null });
          const tags = get().tags;
          const index = tags.findIndex((t) => t.id === id);
          if (index === -1) throw new Error('Tag not found');

          // 如果要更新标签名，检查新名称是否已存在
          if (tag.name && tags.some((t) => t.id !== id && t.name === tag.name)) {
            throw new Error('标签名已存在');
          }

          tags[index] = { ...tags[index], ...tag };
          set({ tags: [...tags], isLoading: false });
        } catch (error) {
          set({ error: error as Error, isLoading: false });
        }
      },

      deleteTag: (id) => {
        try {
          set({ isLoading: true, error: null });
          const tags = get().tags;
          const bookmarks = get().bookmarks;
          const index = tags.findIndex((t) => t.id === id);
          if (index === -1) throw new Error('Tag not found');

          // 删除标签时，同时从所有书签中移除该标签
          const updatedBookmarks = bookmarks.map((bookmark) => ({
            ...bookmark,
            tags: bookmark.tags.filter((t) => t.id !== id),
            updatedAt: new Date(),
          }));

          tags.splice(index, 1);
          set({
            tags: [...tags],
            bookmarks: updatedBookmarks,
            isLoading: false,
          });
        } catch (error) {
          set({ error: error as Error, isLoading: false });
        }
      },
    }),
    {
      name: 'bookmark-storage',
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        tags: state.tags,
        view: state.view,
        sort: state.sort,
      }),
    },
  ),
);
