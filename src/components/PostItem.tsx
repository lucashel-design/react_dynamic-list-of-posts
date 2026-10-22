import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface PostItemProps {
  post: Post;
  isSelected: boolean;
  onSelectPost: (id: number) => void;
}

export const PostItem: React.FC<PostItemProps> = ({
  post,
  onSelectPost,
  isSelected,
}) => {
  return (
    <>
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button', 'is-link', {
            'is-light': !isSelected,
          })}
          onClick={() => onSelectPost(post.id)}
        >
          {isSelected ? 'Close' : 'Open'}
        </button>
      </td>
    </>
  );
};
