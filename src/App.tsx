import Header from "./components/common/header";
import MainPage from "./components/pages/mainPage"

const App = () => {
  return (
    <>
      <Header />
      <div style={{marginTop: "78px"}}>
        <MainPage />
      </div>
    </>
  );
};

export default App;