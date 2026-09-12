export type Comment = {
  commentId: string;
  comment: string;
  studentName: string;
  studentAvatar: string;
};

// Backward compatibility alias
export type comments = Comment;
