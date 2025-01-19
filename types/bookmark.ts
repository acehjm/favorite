export type BookmarkView = 'grid' | 'list';

export type BookmarkStatus = 'active' | 'archived' | 'deleted';

export interface Tag {
  id: string;
  name: string;
  color?: string;
  isPrivate?: boolean;
  password?: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
  cover?: string;
  tags: Tag[];
  isPinned: boolean;
  isPrivate: boolean;
  status: BookmarkStatus;
  visitCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookmarkFilter {
  query?: string;
  tags?: string[];
  status?: BookmarkStatus;
  isPrivate?: boolean;
  isPinned?: boolean;
}
