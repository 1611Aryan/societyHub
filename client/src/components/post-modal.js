import Styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";

const PostModal = ({
  currentPost,
  modalOpen,
  setModalOpen,
  like,
  bookmark,
  setLike,
  setBookmark,
}) => {
  const closeModal = e => {
    setModalOpen(false);
  };

  if (modalOpen) {
    return (
      <ModalStyled>
        <div className="bg" onClick={closeModal}></div>
        <div className="container">
          <PostHeader>
            <img src={currentPost.logo} alt="" />
            <h3>{currentPost.society}</h3>
            <FontAwesomeIcon
              icon={faBookmark}
              className={bookmark ? "bookmarked" : ""}
              onClick={() => setBookmark(!bookmark)}
            />
          </PostHeader>

          <PostContent>
            <img src={currentPost.post} alt="" className="postImage" />
          </PostContent>

          <PostFooter>
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => setLike(!like)}
              className={like ? "liked" : ""}
            />
            <p>{currentPost.caption}</p>
          </PostFooter>
        </div>
      </ModalStyled>
    );
  } else return null;
};

const ModalStyled = Styled.div`
position:fixed;
top:0;
left:0;
width:100vw;
height:100vh;
overflow:hidden;
display:flex;
justify-content:center;
align-items:center;
z-index:99;
.bg{
position:absolute;
top:0;
left:0;
width:100vw;
height:100vh;
background:rgba(0,0,0,0.9);
z-index:1;
}
.container{
width:637px;
height:710px;
border-radius:25px;
background:#c4c4c4;
z-index:2;
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
height:70%;
max-width:8%;
object-fit:cover;
border-radius:50%;
margin:0 1.5rem 0  1rem;
cursor:pointer;
}
h3{
  font-size:1.5rem;
  cursor:pointer;
}
svg{
 position:absolute;
 top:-2px;
 left:85%;
  font-size:2.75rem;
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
  font-size:2rem;
  color:transparent;
  stroke-width:10px;
  stroke:black;
  transition:all 0.3s ease;
  cursor:pointer;
  }
  p{
    padding:0 1rem;
    width:100%;
    font-size:0.9rem;
  }
  .liked{
    color:red;
  }
`;

export default PostModal;
