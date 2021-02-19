import Styled from "styled-components";
import axios from "axios";
import { useState } from "react";

const PORT = process.env.PORT || 5000;

const CreateSociety = () => {
  const [societyData, setSocietyData] = useState({
    name: "",
    logo: "",
    email: "",
    gensec1: "",
    gensec2: "",
    desc: "",
  });
  const createSocietyURL =
    process.env.NODE_ENV === "production"
      ? `/society/add`
      : `http://${window.location.hostname}:${PORT}/society/add`;
  const onChangeHandler = e => {
    setSocietyData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fileUploadHandler = e => {
    setSocietyData(prevState => ({ ...prevState, logo: e.target.files[0] }));
  };
  const submitHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", societyData.name);
    formData.append("logo", societyData.logo);
    formData.append("email", societyData.email);
    formData.append("gensec1", societyData.gensec1);
    formData.append("gensec2", societyData.gensec2);
    formData.append("desc", societyData.desc);
    axios
      .post(createSocietyURL, formData)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };

  return (
    <StyledCreateSociety>
      <h1>Register Your Society</h1>
      <form
        method="post"
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <label htmlFor="name">Society Name: </label>
        <input type="text" name="name" required onChange={onChangeHandler} />
        <label htmlFor="logo">LOGO: </label>
        <input type="file" name="logo" required onChange={fileUploadHandler} />
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" required onChange={onChangeHandler} />
        <label htmlFor="gensec1">General Secretary 1: </label>
        <input type="text" name="gensec1" required onChange={onChangeHandler} />
        <label htmlFor="gensec2">General Secretary 2: </label>
        <input type="text" name="gensec2" required onChange={onChangeHandler} />
        <label htmlFor="desc">Description: </label>
        <input type="text" name="desc" required onChange={onChangeHandler} />
        <input type="submit" value="Add" />
      </form>
    </StyledCreateSociety>
  );
};

const StyledCreateSociety = Styled.div`
width:100vw;
height:100vh;
display:flex;
justify-content:space-around;
align-items:center;
flex-direction:column;
overflow:hidden;
background:#ffbf69;
color:black;
 
  form{
     width:40%;
      height:60%;
      display:flex;
      justify-content:space-between;
      align-items:flex-start;
      flex-direction:column;
  }
  label{
      font-size:1.25rem;
  }
  input{
      width:100%;
      padding:0.6rem 0.9rem;
      border-radius:10px;
      border:none;
      background:#cbf3f0;
      &:focus{
        
        
      }
  }
  input[type="file"]{
      padding:0;
      cursor:pointer;
      border-radius:0;
      background:none;
  }
  input[type="submit"]{
      width:100px;
      align-self:center;
      cursor:pointer;
      
  }
`;

export default CreateSociety;
