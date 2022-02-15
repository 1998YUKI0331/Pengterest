import { useContext, useEffect, useState, useRef } from "react";
import axios from 'axios';
import styled from '@emotion/styled'
import PinChunk from '../components/PinChunk/PinChunk';
import { AuthContext } from "../components/Auth/AuthContext";
import Loading from "../components/common/loading";
import Masonry from "../components/PinChunk/Masonry";

const Wrapper = styled.div`
  width: 96vw;
	margin: auto;
  @media all and (max-width: 767px) {
    width: 92vw;
  }
`;

const MainPage: React.FunctionComponent = () => {
  const userInfo = useContext(AuthContext);
  const [imgList, setImgList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let brakePoints = [350, 500, 750, 780, 920];

  const observerRef = useRef<IntersectionObserver>();
  const boxRef = useRef<HTMLDivElement>(null);

  const fetchPins = async () => {
    const res = await axios.post("http://localhost:8080/pin");
    setImgList((curImgList) => [...curImgList, ...res.data]);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchPins();
    setIsLoading(false);
  }, [])

  const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) { // 관찰하고 있는 entry가 화면에 보여지는 경우
            io.unobserve(entry.target); // entry 관찰 해제
            setIsLoading(true);
            fetchPins(); // 데이터 가져오기
            setIsLoading(false);
        }
    })
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [imgList])

  return (
    <Wrapper>
    {isLoading ? 
      <Loading />
    : 
      <Masonry brakePoints={brakePoints}>
      {imgList.map((item, index) => {
        if (imgList.length - 15 === index) { // 관찰되는 요소가 있음
          return (
            <div ref={boxRef} key={index}>
              <PinChunk img={item["pinUrl"]} idx={item["pinId"]} />
            </div>
          )
        } else { // 관찰되는 요소가 없음
          return (
            <div key={index}>
              <PinChunk img={item["pinUrl"]} idx={item["pinId"]} />
            </div>
          )
        }
      })}
      </Masonry>
    }
      {userInfo ? null : <Loading />}
    </Wrapper>
  )
};

export default MainPage;