import Post from "./../components/post";

import axios from "axios";
import Styled from "styled-components";
import { useState, useEffect } from "react";

const songPage = { limit: 3, skip: 0 };
const PORT = process.env.PORT || 5000;

const Posts = ({ modalOpen, setModalOpen }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({
    logo: null,
    society: null,
    post: null,
    caption: null,
  });

  const postsURL = ({ limit, skip }) => {
    return process.env.NODE_ENV === "production"
      ? `/post/${limit}${skip}`
      : `http://${window.location.hostname}:${PORT}/post/${limit}${skip}`;
  };
  const getPosts = ({ limit, skip }) => {
    console.log("Getting Posts");
    axios
      .get(postsURL({ limit, skip }))
      .then(res => setPosts([...posts, ...res.data]))
      .catch(err => console.log(err));
  };

  const loadMore = () => {
    songPage.skip += 3;
    console.log("loading", songPage.skip);
    getPosts(songPage);
  };

  const loadMore2 = e => {
    console.log(e);
  };

  useEffect(() => {
    console.log("Fetching all posts");
    getPosts(songPage);
  }, []);

  return (
    <StyledPosts onScroll={loadMore2}>
      {Array.isArray(posts) &&
        posts.map(state => (
          <Post
            post={state}
            key={state._id}
            currentPost={currentPost}
            setCurrentPost={setCurrentPost}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
          />
        ))}
      <div className="load" onClick={loadMore}>
        Load More....
      </div>
    </StyledPosts>
  );
};

const StyledPosts = Styled.div`
width:100vw;
max-height:auto;
overflow-y:auto;
display:flex;
flex:1;
justify-content:center;
align-items:center;
flex-direction:column;
.load{
  cursor:pointer;
}
`;

export default Posts;
