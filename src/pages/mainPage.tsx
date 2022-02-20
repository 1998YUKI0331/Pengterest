import Wrapper from "@/components/PinChunk/Wrapper";

const MainPage: React.FunctionComponent = () => {
  return (
    <Wrapper
      fetchUrl={"pin"}
      method={"POST"}
    />
  )
};

export default MainPage;