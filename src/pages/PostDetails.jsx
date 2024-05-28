import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Components/firebase';
import './PostDetails.css';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div className="postDetails">
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.postText}</p>
          <h4>@{post.author.name}</h4>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostDetails;
