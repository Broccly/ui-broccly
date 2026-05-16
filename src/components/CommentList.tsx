import type { Comment } from "@/types/api";

export default function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <p className="text-gray-400 text-sm">No comments yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {comments.map((c) => {
        const date = new Date(c.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return (
          <li key={c.id} className="border-b border-gray-100 pb-4 last:border-0">
            <p className="text-sm font-medium mb-0.5">
              {c.display_name}{" "}
              <span className="text-gray-400 font-normal">· {date}</span>
            </p>
            <p className="text-sm text-gray-700">{c.body}</p>
          </li>
        );
      })}
    </ul>
  );
}
