import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/common/header";
import FixedBtn from "./components/common/fixedBtn";
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import SavedPage from "./pages/savedPage";
import CreatedPage from "./pages/createdPage";

const App = () => {
  return (
    <BrowserRouter>
      <FixedBtn />
      <Header />
      <div style={{marginTop: "78px"}}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/created" element={<CreatedPage />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;