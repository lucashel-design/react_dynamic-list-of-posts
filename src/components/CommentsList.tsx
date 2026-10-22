import React from 'react';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';

interface CommentsListProps {
  comments: Comment[];
  onDeleteComment: (comment: Comment) => void;
}

export const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  onDeleteComment,
}) => {
  return (
    <div className="CommentsList">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </div>
  );
};
