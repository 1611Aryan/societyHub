import Styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Society = (society, key) => {
  const base64 = ArrayBuffer => {
    let TYPED_ARRAY = new Uint8Array(ArrayBuffer);

    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, "");

    let base64String = btoa(STRING_CHAR);
    return base64String;
  };
  return (
    <StyledSociety>
      <img
        src={`data:${society.society.logo.contentType};base64,${base64(
          society.society.logo.data.data
        )}`}
        alt=""
      />
      <FontAwesomeIcon icon={faChevronRight} />
      <div className="overlay"></div>
      <div className="content">
        <h1>{society.society.name}</h1>
        <div className="heads">
          <h3 className="gensec">{society.society.gensec1}</h3>
          <h3 className="gensec">{society.society.gensec2}</h3>
        </div>
        <p className="description">{society.society.desc}</p>
      </div>
    </StyledSociety>
  );
};

const StyledSociety = Styled.div`
width:100vw;
height:100vh;
overflow:hidden;
position:relative;
border:8px solid #000;
color:rgba(255,255,255,0.75);
img{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  object-fit:cover;
  z-index:-1;
  display:inline-block;
}
.overlay{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.4);
    backdrop-filter:blur(5px);
    z-index:2;
  }
  svg{
    box-sizing:content-box;
    position:absolute;
    top:50%;
    right:0;
    transform:translateY(-50%);
    font-size:2.5rem;
    z-index:9;
    cursor:pointer;
    padding:2rem 2rem ;
  }
  .content{
    padding:0 2rem;
    z-index:9;
    width:100%;
    height:100%;
    display:flex;
    justify-content:space-evenly;
    align-items:flex-start;
    flex-direction:column;
    
    h1{
      z-index:9;
      font-size:3rem;
      text-decoration:underline;
    }
    .heads{
      z-index:9;
      .gensec{
      display:inline;
      margin-right:2rem;
      font-size:1.5rem;
      font-weight:400;
    }
    }
    .description{
      z-index:9;
      height:30%;
      width:85%;
      font-weight:300;
      font-size:1.1rem;
    }
  }
`;

export default Society;
