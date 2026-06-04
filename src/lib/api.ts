import type {
  CommentsResponse,
  CreatePostInput,
  FeedResponse,
  MyPost,
  PostMutationResponse,
  PostResponse,
  SearchResponse,
  UpdatePostInput,
} from "@/types/api";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, text);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  getFeed(cursor?: string): Promise<FeedResponse> {
    const params = new URLSearchParams({ limit: "20" });
    if (cursor) params.set("cursor", cursor);
    return apiFetch<FeedResponse>(`/api/feed?${params.toString()}`);
  },

  getPost(slug: string): Promise<PostResponse> {
    return apiFetch<PostResponse>(`/api/posts/${slug}`);
  },

  search(q: string): Promise<SearchResponse> {
    const params = new URLSearchParams({ q, limit: "20" });
    return apiFetch<SearchResponse>(`/api/search?${params.toString()}`);
  },

  createPost(data: CreatePostInput, token: string): Promise<PostMutationResponse> {
    return apiFetch<PostMutationResponse>(
      "/api/post/create",
      { method: "POST", body: JSON.stringify(data) },
      token
    );
  },

  updatePost(
    id: string,
    data: UpdatePostInput,
    token: string
  ): Promise<PostMutationResponse> {
    return apiFetch<PostMutationResponse>(
      `/api/posts/${id}`,
      { method: "PATCH", body: JSON.stringify(data) },
      token
    );
  },

  getComments(postId: string): Promise<{ comments: Array<{ _id: string; post: string; author: string; text: string; updated_at: string }> }> {
    return apiFetch(`/api/comment/post/${postId}`);
  },

  addComment(postId: string, author: string, text: string, token: string): Promise<void> {
    return apiFetch<void>(
      "/api/comment/create",
      { method: "POST", body: JSON.stringify({ post: postId, author, text }) },
      token
    );
  },

  likePost(postId: string, author: string, token: string): Promise<{ like: { _id: string } }> {
    return apiFetch(
      "/api/like/create",
      { method: "POST", body: JSON.stringify({ post: postId, author }) },
      token
    );
  },

  unlikePost(likeId: string, token: string): Promise<void> {
    return apiFetch<void>(`/api/like/${likeId}`, { method: "DELETE" }, token);
  },

  getAllPosts(): Promise<{ posts: MyPost[] }> {
    return apiFetch<{ posts: MyPost[] }>("/api/post");
  },

  getMyPosts(userId: string, token: string): Promise<{ posts: MyPost[] }> {
    return apiFetch<{ posts: MyPost[] }>(
      `/api/post?author=${encodeURIComponent(userId)}`,
      {},
      token
    );
  },

  getPostById(id: string, token?: string): Promise<{ post: MyPost }> {
    return apiFetch<{ post: MyPost }>(`/api/post/${id}`, {}, token);
  },

  getMe(token: string): Promise<{ user: { email: string; name: string; avatarUrl?: string | null } }> {
    return apiFetch<{ user: { email: string; name: string } }>("/api/user/me", {}, token);
  },

  checkFollow(followingTo: string, follower: string, token: string): Promise<{ following: boolean; followId: string | null }> {
    const params = new URLSearchParams({ follower, following_to: followingTo });
    return apiFetch(`/api/follow/check?${params.toString()}`, {}, token);
  },

  followUser(followingTo: string, follower: string, token: string): Promise<{ result: { _id: string } }> {
    return apiFetch(
      "/api/follow/create",
      { method: "POST", body: JSON.stringify({ follower, following_to: followingTo }) },
      token
    );
  },

  unfollowUser(followId: string, token: string): Promise<void> {
    return apiFetch<void>(`/api/follow/${followId}`, { method: "DELETE" }, token);
  },

  async uploadImage(file: File, token: string): Promise<{ url: string }> {
    const form = new FormData();
    form.append("image", file);
    const res = await fetch(`${BASE}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText);
      throw new ApiError(res.status, text);
    }
    return res.json();
  },
};
