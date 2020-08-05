import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentsDiplay from './CommentsDisplay';


const UserCommentsContainer = ({user}) => {
  const [comments, setComments] = useState([])
  useEffect(() => {
    axios.get(`/api/users/${user}/comments`)
    .then(res => res.data)
    .then(res => setComments(res))
  }, [user])
  return (
    <CommentsDiplay comments={comments} />
  );
}

export default UserCommentsContainer;