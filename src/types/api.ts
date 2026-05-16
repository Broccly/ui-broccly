export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresInSeconds: number;
  userId: string;
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
  post: {
    id: string;
    slug: string;
    status: string;
    published_at: string | null;
  };
}

export interface CreatePostInput {
  title: string;
  excerpt?: string;
  bodyJson: unknown;
  bodyHtml: string;
  visibility?: "public" | "unlisted" | "private";
  publish?: boolean;
}

export interface UpdatePostInput {
  title?: string;
  excerpt?: string;
  bodyJson?: unknown;
  bodyHtml?: string;
  visibility?: "public" | "unlisted" | "private";
  publish?: boolean;
}
