import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
body{
    width:100vw;
    min-height:100vh;
    overflow-x:hidden;
    font-family: 'Poppins', sans-serif;
}

.stopScroll{
    height:100vh;
    overflow:hidden
}

`;
export default GlobalStyle;
