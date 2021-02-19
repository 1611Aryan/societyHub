import axios from "axios";
import Styled from "styled-components";
import { useState, useEffect } from "react";
import { StyledSection } from "./../styles";
import Society from "./../components/society";

const PORT = process.env.PORT || 5000;

const Societies = () => {
  const [societies, setSocieties] = useState([]);
  const societiesURL =
    process.env.NODE_ENV === "production"
      ? `/society`
      : `http://${window.location.hostname}:${PORT}/society`;
  useEffect(() => {
    console.log("Fetching all societies");
    axios
      .get(societiesURL)
      .then(res => setSocieties(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <StyledSocieties>
      {societies.map(state => (
        <Society society={state} key={state._id} />
      ))}
    </StyledSocieties>
  );
};
export default Societies;

const StyledSocieties = Styled(StyledSection)`
width:100%;
height:auto;
align-items:flex-start;
flex-direction:column;
`;
