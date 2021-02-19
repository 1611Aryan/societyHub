import { useState, useEffect } from "react";
import Styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import PostModal from "./../components/post-modal";
const PORT = process.env.PORT || 5000;

const Post = ({
  post,
  currentPost,
  setCurrentPost,
  setModalOpen,
  modalOpen,
}) => {
  const base64 = ArrayBuffer => {
    let TYPED_ARRAY = new Uint8Array(ArrayBuffer);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, "");
    let base64String = btoa(STRING_CHAR);
    return base64String;
  };
  const [society, setSociety] = useState({
    name: null,
    img: null,
    societyId: null,
  });
  const postURL =
    process.env.NODE_ENV === "production"
      ? `/society/${post.societyId}`
      : `http://${window.location.hostname}:${PORT}/society/${post.societyId}`;

  const bookmarkURL =
    process.env.NODE_ENV === "production"
      ? `/post/edit/${post._id}`
      : `http://${window.location.hostname}:${PORT}/post/edit/${post._id}`;

  const likeURL =
    process.env.NODE_ENV === "production"
      ? `/post/edit/${post._id}`
      : `http://${window.location.hostname}:${PORT}/post/edit/${post._id}`;

  useEffect(() => {
    axios
      .get(postURL)
      .then(res => {
        setSociety({
          img: res.data.logo,
          name: res.data.name,
          societyId: res.data._id,
        });
      })
      .catch(err => console.log(err));
  }, []);

  const [like, setLike] = useState(post.like);
  const [bookmark, setBookmark] = useState(post.bookmark);

  const bookmarked = () => {
    axios
      .put(bookmarkURL, {
        bookmark: !bookmark,
        like,
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    setBookmark(!bookmark);
  };

  const liked = () => {
    axios
      .put(likeURL, {
        bookmark,
        like: !like,
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    setLike(!like);
  };

  const ClickHandler = e => {
    setCurrentPost({
      ...currentPost,
      logo: `data:${post.img.contentType};base64,${base64(post.img.data.data)}`,
      society: post.societyName,
      post: `data:${post.img.contentType};base64,${base64(post.img.data.data)}`,
      caption: post.caption,
    });
    setModalOpen(true);
  };
  if (society.img && society.name)
    return (
      <>
        <StyledPost>
          <PostHeader>
            <img
              src={`data:${society.img.contentType};base64,${base64(
                society.img.data.data
              )}`}
              alt="societyLogo"
              loading="lazy"
            />

            <h3>{society.name}</h3>
            <FontAwesomeIcon
              icon={faBookmark}
              className={bookmark ? "bookmarked" : ""}
              onClick={bookmarked}
            />
          </PostHeader>

          <PostContent>
            <img
              src={`data:${post.img.contentType};base64,${base64(
                post.img.data.data
              )}`}
              alt="Post"
              className="postImage"
              loading="lazy"
              onClick={ClickHandler}
            />
          </PostContent>

          <PostFooter>
            <FontAwesomeIcon
              icon={faHeart}
              onClick={liked}
              className={like ? "liked" : ""}
            />

            <p>{post.caption}</p>
          </PostFooter>
        </StyledPost>
        <PostModal
          modalOpen={modalOpen}
          currentPost={currentPost}
          setModalOpen={setModalOpen}
          like={like}
          setLike={setLike}
          bookmark={bookmark}
          setBookmark={setBookmark}
        />
      </>
    );
  else return null;
};

const StyledPost = Styled.div`
margin:2rem 0;
width:547px;
height:620px;
overflow:hidden;
background:#c4c4c4;
border-radius:25px;
.container{
  width:100%;
  height:100%;
}
`;

const PostHeader = Styled.div`
width:100%;
height:10%;
overflow:hidden;
display:flex;
justify-content:left;
align-items:center;
position:relative;
img{
height:80%;
aspect-ratio:1/1;
object-fit:cover;
border-radius:50%;
margin:0 1.5rem 0  1rem;
cursor:pointer;
}
h3{
  font-size:1.25rem;
  cursor:pointer;
}
svg{
 position:absolute;
 top:-2px;
 left:85%;
  font-size:2.5rem;
  color:transparent;
  stroke-width:10px;
  stroke:black;
  transition:all 0.3s ease;
  cursor:pointer;
  }
.bookmarked{
  color:black;
}

  `;

const PostContent = Styled.div`
width:100%;
height:75%;
overflow:hidden;
background:#484848;
img{
  width:100%;
  height:100%;
  object-fit:cover;
  cursor:pointer;
}
`;

const PostFooter = Styled.div`
 width:100%;
  height:15%;
  overflow:hidden;
  display:flex;
  justify-content:space-evenly;
  align-items:center;
  flex-direction:column;
  svg{
  align-self:flex-start;
  margin-left:1rem;
  font-size:1.5rem;
  color:transparent;
  stroke-width:10px;
  stroke:black;
  transition:all 0.3s ease;
  cursor:pointer;
  }
  p{
    padding:0 1rem;
    width:100%;
    font-size:0.8rem;
  }
  .liked{
    color:red;
  }
`;
export default Post;
