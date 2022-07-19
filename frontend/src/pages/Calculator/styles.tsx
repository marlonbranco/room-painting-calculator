import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  margin-top: 5px;

`;

export const Form = styled.form`
.doors-number-inputs {
  margin-right: 0;
}
.windows-number-inputs {
  margin-right: 0px;
  margin-left: 0px;
}
.btn-submit{
  background-color: #588157;
}
.btn-reset {
  background-color: #8d99ae;
}
.btn-loading {
  background-color: #dad7cd;
  }
`;


export const SubtitleText = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 400;
`;

export const WallsLabel = styled.label`
  font-size: 14.5px;
  font-weight: 400;
  margin-bottom: 30px;
`

export const FormButton = styled.button`
border-radius: 5px;
font-weight: 500;
border: none;
color: white;
margin-right: 20px;
margin-top: 20px;
padding: 15px 25px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
`;

export const UnorderedList = styled.ul`
  list-style-type: none;
`;

export const WallsDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  .height {
    margin-right: 20px;
  }
  .width {	
    margin-right: 20px;
  }
`;

export const WallsInput = styled.input`
  border-radius: 2px;
  border-style: solid;
  border-width: 1.5px;
  border-color: #14213d;
  padding: 4px 4px;
  width: 90px;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const ErrorText = styled.p`
  font-size: 14px;
  color: red;
  margin-bottom: 10px;
`;

export const Table = styled.table`
  margin: 30px 20px;
  thead tr {
      background-color: #344e41;
      color: #ffffff;
      text-align: left;
  }
  tbody tr {
    background-color: #588157;
    font-weight: 400;
    color: #ffffff;
  }
  td, th {
      padding: 12px 15px;
  }
`;