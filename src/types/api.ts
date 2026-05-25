export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  published_at: string;
  username: string;
  display_name: string;
}

export interface PostDetail extends PostSummary {
  body_html: string;
  created_at: string;
}

export interface FeedResponse {
  items: PostSummary[];
  nextCursor: string | null;
}

export interface PostResponse {
  post: PostDetail;
}

export interface SearchResponse {
  items: PostSummary[];
}

export interface Comment {
  id: string;
  body: string;
  created_at: string;
  username: string;
  display_name: string;
}

export interface CommentsResponse {
  items: Comment[];
}

export interface PostMutationResponse {
  message: string;
  post: {
    _id: string;
    title: string;
    body: string;
    author: string;
  };
}

export interface CreatePostInput {
  title: string;
  body: string;
  author: string;
}

export interface MyPost {
  _id: string;
  title: string;
  body: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface UpdatePostInput {
  title?: string;
  excerpt?: string;
  bodyJson?: unknown;
  bodyHtml?: string;
  visibility?: "public" | "unlisted" | "private";
  publish?: boolean;
}
