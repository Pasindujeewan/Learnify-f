import type { comments } from "../types/comments";

export function Comments({ comment }: { comment: comments }) {
  return (
    <div className="flex gap-3 p-4 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 transition">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={comment.studentAvatar || "/default-avatar.png"}
          alt={comment.studentName}
          className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col">
        {/* Name */}
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {comment.studentName}
        </span>

        {/* Comment text */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
          {comment.comment}
        </p>
      </div>
    </div>
  );
}
