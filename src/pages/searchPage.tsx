import { useParams } from "react-router-dom"
import { axiosPost } from "@/api/axios";
import Wrapper from "@/components/PinChunk/Wrapper";

const SearchPage: React.FunctionComponent = () => {
  const { keyword } = useParams();
  const fetxSearchedPins = async () => await axiosPost("pin/search", {pinKeyword: keyword});

  return (
    <Wrapper
      fetchPins={fetxSearchedPins}
    />
  )
};

export default SearchPage;