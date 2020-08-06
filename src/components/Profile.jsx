import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentsDiplay from "./CommentsDisplay";
import PostMessage from "./PostMessage";

const Profile = ({ user }) => {
  const [comments, setComments] = useState([]);
  const updateComments = (newComment) => {
    setComments([...comments, newComment]);
  }

  useEffect(() => {
    axios
      .get(`/api/users/${user}/comments`)
      .then((res) => res.data)
      .then((res) => setComments(res));
  }, [user]);
  return (
    <>
      <PostMessage user={user} updateComments={updateComments}/>
      <CommentsDiplay comments={comments} />
    </>
  );
};

export default Profile;
