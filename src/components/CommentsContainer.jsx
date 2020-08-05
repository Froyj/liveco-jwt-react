import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentsDisplay from './CommentsDisplay';
const CommentsContainer = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/comments')
      .then(res => res.data)
      .then(setComments)
  }, [])
  return (
    <CommentsDisplay comments={comments}/>
  );
}

export default CommentsContainer;