import React from 'react';

const CommentsDisplay = ({comments}) => {
  return (
    <ul>
      {comments.map(comment => (
        <p>{comment.message}</p>
      ))}
    </ul>
  );
}

export default CommentsDisplay;