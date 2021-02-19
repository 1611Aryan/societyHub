import { Link } from "react-router-dom";
import Styled from "styled-components";

const Navbar = () => {
  return (
    <StyledNavbar>
      <h2 className="logo">
        <Link to="/">Society Hub</Link>
      </h2>
      <ul>
        <li>
          <Link to="/societies">Societies</Link>
        </li>
        <li>
          <Link to="/create-post">Create Post</Link>
        </li>
        <li>
          <Link to="/add-society">Create Society</Link>
        </li>
      </ul>
    </StyledNavbar>
  );
};

const StyledNavbar = Styled.nav`
width:100vw;
height:10vh;
overflow:hidden;
background:#e9e9e9;
color:black;
display:flex;
justify-content:space-between;
align-items:center;
a{
    color:black;
    text-decoration:none;
  
}
.logo{
  font-weight:600;
    margin-left:1rem;
    font-size:2rem;
}
ul{
    display:flex;
    justify-content:space-around;
    align-items:center;
    width:45%;
    list-style-type:none;
}
li{
 font-size:1.25rem;
}
`;

export default Navbar;
