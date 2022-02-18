import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { axiosPost } from "@/api/axios"
import styled from '@emotion/styled'
import PinChunk from '../components/PinChunk/PinChunk';
import Masonry from "../components/PinChunk/Masonry";
import Loading from "../components/common/loading";

const Wrapper = styled.div`
  width: 96vw;
	margin: auto;
  @media all and (max-width: 767px) {
    width: 92vw;
  }
`;

const SearchPage: React.FunctionComponent = () => {
  const { keyword } = useParams();
  const [imgList, setImgList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSearchedPins = async () => {
    const searchedPins = await axiosPost("pin/search", {
      pinKeyword: keyword
    });
    setImgList((curImgList) => [...curImgList, ...searchedPins]);
  };

  useEffect(() => {
    setImgList([]); //검색 페이지에서 새로 검색하는 경우 clear
    setIsLoading(true);
    fetchSearchedPins();
    setIsLoading(false);
  }, [keyword])

  return (
    <Wrapper>
    {isLoading ? 
      <Loading />
    : 
      <Masonry brakePoints={[350, 500, 750, 780, 920]}>
      {imgList.map((item, idx) =>
        <PinChunk key={idx} img={item["pinUrl"]} idx={item["pinId"]} />
      )}
      </Masonry>
    }
    </Wrapper>
  )
};

export default SearchPage;