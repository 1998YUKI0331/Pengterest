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
  fetchPins: () => Promise<any>;
}

const Wrapper: React.FunctionComponent<wrapperProps> = (props) => {
  const location = useLocation();

  const [imgList, setImgList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userInfo = useContext(AuthContext);

  let brakePoints = [350, 500, 750, 780, 920];

  const observerRef = useRef<IntersectionObserver>();
  const boxRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    const pins = await props.fetchPins();
    setImgList((curImgList) => [...curImgList, ...pins]);
    setIsLoading(false);
  }

  useEffect(() => {
    setImgList([]);
    setIsLoading(true);
    fetchData();
  }, [location])

  const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) { // 관찰하고 있는 entry가 화면에 보여지는 경우
            io.unobserve(entry.target); // entry 관찰 해제
            setIsLoading(true);
            fetchData(); // 데이터 가져오기
            setIsLoading(false);
        }
    })
  }

  useEffect(() => {
    if (imgList.length > 20) {
      observerRef.current = new IntersectionObserver(intersectionObserver); // IntersectionObserver
      boxRef.current && observerRef.current.observe(boxRef.current);
    }
  }, [imgList]) //관찰되는 요소 있을 때마다

  return (
    <WrapperDiv ref={boxRef}>
    {isLoading ? 
      <Loading />
    : 
      <Masonry brakePoints={brakePoints}>
      {imgList.map((item, index) => {
        if (imgList.length - 5 === index) { // 관찰되는 요소가 있음
          return (
            <div ref={boxRef} key={index}>
              <PinChunk img={item["pinUrl"]} idx={item["pinId"]} />
            </div>
          )
        } else { // 관찰되는 요소가 없음
          return (
            <div ref={boxRef} key={index}>
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