import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/common/header";
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import SavedPage from "./pages/savedPage";


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div style={{marginTop: "78px"}}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/saved" element={<SavedPage />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;