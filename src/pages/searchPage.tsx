import { useParams } from "react-router-dom"
import Wrapper from "@/components/PinChunk/Wrapper";

const SearchPage: React.FunctionComponent = () => {
  const { keyword } = useParams();

  return (
    <Wrapper
      fetchUrl={"pin/search"}
      request={{pinKeyword: keyword}}
      method={"POST"}
    />
  )
};

export default SearchPage;