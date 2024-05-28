import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../Components/firebase';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="homepage">
      {postLists.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.postText.substring(0, 100)}...</p> {/* Show preview */}
          <Link to={`/post/${post.id}`}>Read More</Link>
          <h4>@{post.author.name}</h4>
        </div>
      ))}
    </div>
  );
}

export default Home;
