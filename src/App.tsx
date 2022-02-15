import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/common/header";
import FixedBtn from "./components/common/fixedBtn";
import MainPage from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import SavedPage from "./pages/savedPage";
import CreatedPage from "./pages/createdPage";
import SearchPage from "./pages/searchPage";
import CreatePage from "./pages/createPage";

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
        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;