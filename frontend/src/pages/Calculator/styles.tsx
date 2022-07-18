import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 40px 20px;
  margin-top: 80px;
`;

export const Button = styled.button`
    background-color: #4CAF50; /* Green */
    border-radius: 5px;
    border: none;
    color: white;
    padding: 15px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  `;

  export const Input = styled.input`
  margin-left: 100%;
  width: 60px;
  `
  export const WallsInput = styled.input`
  width: 60px;
  margin: 30px;
  `
  export const UnorderedList = styled.ul`
  max-width: 500px;
  list-style-type: none;
  .h4 {
    margin: 0 auto;
  }
  `;
  export const List = styled.li`
  `;

  export const WallsList = styled.li`

  `;
  export const WallsDiv = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
  `;

  export const ErrorP = styled.p`
    font-size: 11px;
    color: red;
  `;