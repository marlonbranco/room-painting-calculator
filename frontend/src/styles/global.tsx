import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    font-family: "Robot", sans-serif;

    background: #F4F3EE;
    -webkit-font-smoothing: antialiased !important;
  }
  body, input, button {
    font: 16px "Roboto", sans-serif;
    font-weight: 300;
  }
  body html #root {
    height: 100%;
  }
  button {
    cursor: pointer;
  }
`;