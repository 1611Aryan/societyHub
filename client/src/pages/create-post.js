import axios from "axios";
import { useState, useRef, useMemo, useEffect } from "react";
import Styled from "styled-components";

const PORT = process.env.PORT || 5000;

const CreatePost = () => {
  const imageRef = useRef(null);
  const [postData, setPostData] = useState({
    societyName: "",
    caption: "",
    img: "",
    date: "",
  });

  const [societies, setSocieties] = useState(null);

  const societyURL =
    process.env.NODE_ENV === "production"
      ? `/society/${postData.societyName}`
      : `http://${window.location.hostname}:${PORT}/society`;

  const createPostURL =
    process.env.NODE_ENV === "production"
      ? `/post/create`
      : `http://${window.location.hostname}:${PORT}/post/create`;

  const Societies = async () => {
    await axios
      .get(societyURL)
      .then(res =>
        setSocieties(
          res.data.map(data => {
            return { name: data.name, id: data._id };
          })
        )
      )
      .catch(err => console.log(err));
  };

  useEffect(() => {
    Societies();
  }, []);

  const changeHandler = e => {
    setPostData(prevInfo => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };
  const uploadHandler = e => {
    setPostData(prevInfo => ({ ...prevInfo, img: e.target.files[0] }));
    let src;
    if (e.target.files.length > 0) {
      src = URL.createObjectURL(e.target.files[0]);
      imageRef.current.style.opacity = 1;
    } else {
      src = "";
    }
    imageRef.current.src = src;
  };
  const submitHandler = async e => {
    e.preventDefault();
    let request;
    const formData = new FormData();

    societies.forEach(society => {
      if (society.name === postData.societyName) {
        request = true;
        formData.append("societyId", society.id);
      }
    });

    if (request) {
      formData.append("societyName", postData.societyName);
      formData.append("caption", postData.caption);
      formData.append("img", postData.img);

      axios
        .post(createPostURL, formData)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    }
  };
  const hideErrorImage = e => {
    e.target.style.opacity = "0";
  };

  return (
    <>
      <StyledCreatePost>
        <StyledForm
          method="post"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <LeftColumn>
            <label htmlFor="societyName">Society Name </label>
            <input
              type="text"
              name="societyName"
              onChange={changeHandler}
              className="name"
              required
            />
            <label htmlFor="caption">Caption</label>
            <textarea
              type="text"
              name="caption"
              onChange={changeHandler}
              className="caption"
              required
            />
          </LeftColumn>
          <RightColumn>
            <img
              src=""
              ref={imageRef}
              alt="uploaded"
              onError={hideErrorImage}
            />
            <input type="file" name="img" onChange={uploadHandler} required />
          </RightColumn>
          <SubmitButton type="submit" value="Post" />
        </StyledForm>
      </StyledCreatePost>
    </>
  );
};

const StyledCreatePost = Styled.div`
width:100%;
height:90vh;
position:relative;
`;

const StyledForm = Styled.form`
width:100%;
height:90%;
display:flex;
justify-content:space-evenly;
align-items:center;
`;

const LeftColumn = Styled.div`
width:30%;
height:60%;
display:flex;
justify-content:space-between;
align-items:flex-start;
flex-direction:column;
font-size:1.25rem;
.name{
  width:100%;
  background:#c4c4c4;
  border:0;
  padding:0.5rem;
  border-radius:15px;
}
.caption{
  width:100%;
  height:60%;
  background:#c4c4c4;
  border:0;
  padding:0.5rem;
  border-radius:15px;
  resize:none;
}
`;

const RightColumn = Styled.div`
width:30%;
height:60%;
display:flex;
justify-content:center;
align-items:center;
background:#484848;
position:relative;
img{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  object-fit:contain;
}
input{
  background:white;
  color:black;
  border-radius:15px;
  padding:0.5rem;
  cursor:pointer;
  z-index:2;
  &::-webkit-file-upload-button {
  visibility: hidden;
}
}
`;

const SubmitButton = Styled.input`
position:absolute;
padding:0.5rem 0;
width:10%;
font-size:1.25rem;
border-radius:15px;
border:0;
background:#c4c4c4;
top:85%;
left:50%;
transform:translate(-50%,-50%);
cursor:pointer;
`;

export default CreatePost;
