import { BrowserRouter as Router } from "react-router-dom";
import  GlobalStyles from './styles/global'
import Calculator from "./pages/Calculator";

const App = () => (
    <>
      <Router>
      <Calculator />
      </Router>
      <GlobalStyles/>
    </>
  );

export default App
