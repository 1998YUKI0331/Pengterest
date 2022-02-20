import { useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { axiosPost, axiosGet } from "@/api/axios"
import { AuthContext } from "@/components/Auth/AuthContext";
import styled from '@emotion/styled'
import PinChunk from '@/components/PinChunk/PinChunk';
import Loading from "@/components/common/loading";
import Masonry from "@/components/PinChunk/Masonry";

const WrapperDiv = styled.div`
  width: 96vw;
  margin: auto;
  @media all and (max-width: 767px) {
    width: 92vw;
  }
`;

interface wrapperProps {
  fetchUrl: string;
  request?: object;
  method: "POST" | "GET";
  setPinCnt?: (value: number) => void;
}

const Wrapper: React.FunctionComponent<wrapperProps> = (props) => {
  const location = useLocation();

  const [imgList, setImgList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userInfo = useContext(AuthContext);

  let brakePoints = [350, 500, 750, 780, 920];

  const observerRef = useRef<IntersectionObserver>();
  const boxRef = useRef<HTMLDivElement>(null);

  const fetchPins = async () => {
    let pins = []
    if (props.method === "POST") {
      pins = await axiosPost(props.fetchUrl, props.request);
    }
    else if (props.method === "GET") {
      pins = await axiosGet(props.fetchUrl, props.request);
      pins = Object.values(pins)[1]; //object to array
      if (props.setPinCnt) props.setPinCnt(pins.length);
    }
    setImgList((curImgList) => [...curImgList, ...pins]);
    setIsLoading(false);
  }

  useEffect(() => {
    setImgList([]);
    setIsLoading(true);
    fetchPins();
  }, [location])

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
    <WrapperDiv>
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
    </WrapperDiv>
  )
};

export default Wrapper;