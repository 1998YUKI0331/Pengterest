import Wrapper from "@/components/PinChunk/Wrapper";
import { axiosPost } from "@/api/axios";

const MainPage: React.FunctionComponent = () => {
  const fetchPins = async () => await axiosPost("pin");

  return (
    <Wrapper
      fetchPins={fetchPins}
    />
  )
};

export default MainPage;