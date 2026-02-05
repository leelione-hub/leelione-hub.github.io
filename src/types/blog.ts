export interface Post {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  content: string;
  slug: string;
}

export interface PostMeta {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  slug: string;
}
