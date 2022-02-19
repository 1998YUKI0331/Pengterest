import { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom"
import styled from '@emotion/styled'
import { MdOutlineMoreHoriz, MdShare } from 'react-icons/md'
import { axiosPost } from "@/api/axios";
import Loading from "../components/common/loading";
import Inform from "../components/Detail/inform";
import PinChunk from '../components/PinChunk/PinChunk';
import Masonry from "../components/PinChunk/Masonry";
import { AuthContext } from "../components/Auth/AuthContext";

interface itemProps {
  moreHover?: boolean;
  shareHover?: boolean;
}

interface hoverProps {
  hoverItem: number
}

const Wrapper = styled.div`
  width: 96vw;
  margin: auto;
  @media all and (max-width: 767px) {
    width: 92vw;
  }
`;

const Detail = styled.div`
  padding: 20px 8px 0px 8px;
  text-align: center;
`;

const Box = styled.div`
  text-align: start;
  margin: 0 auto;
  max-width: 1000px;
  overflow: hidden; height: auto; //사진 크기에 맞춰 자동 조절
  border: none;
  border-radius: 30px;
  box-shadow: 0 0 15px rgba(33, 33, 33, .1);
  display: flex;
  .left {
    width: 50%;
    float: left;
    border-radius: 30px 0px 0px 30px;
    box-shadow: none;
  }
  .right {
    position: relative;
    width: 50%;
    float: right;
    border-radius: 0px 30px 30px 0px;
    display: inline-block;
    box-shadow: none;
  }
  @media all and (max-width: 990px) {
    max-width: 450px;
    display: inline-block;
    .left {
      width: 100%;
      border-radius: 30px 30px 0px 0px;
    }
    .right {
      width: 100%;
      border-radius: 0px 0px 30px 30px;
      height: 300px;
    }    
  }
`;

const PinImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemDiv = styled.div`
  width: 92%;
  padding: 20px;
  height: 80px;
`;

const CreatorDiv = styled.div`
  position: absolute;
  bottom: 10px;
  padding: 20px;
  height: 20px;
  font-weight: 500;
`;

const Button = styled.button<itemProps>`
  position: relative;
  height: 50px; width: 50px;
  margin-left: 15px;
  border-radius: 100px; border: none;
  :nth-of-type(1) {
    background: ${props => (props.moreHover ? "#F0F0F0" : "white")};
  }
  :nth-of-type(2) {
    background: ${props => (props.shareHover ? "#F0F0F0" : "white")};
  }
`;

const SaveBtn = styled.button`
  float: right;
  background: red;
  border-radius: 30px; border: none;
  height: 48px; width: 68px;
  color: white;
  font-weight: 800; font-size: 1rem;
  line-height: 48px;
  &:hover {
    background: #AD081B;
  }
`;

const Saction = styled.p`
  margin-top: 50px;
  font-weight: 800;
  font-size: 1.3rem; 
`;

const PinPage: React.FunctionComponent = () => {
  const { pinId } = useParams();
  const location = useLocation();

  const userInfo = useContext(AuthContext);
  const userEmail: string = userInfo?.email || '';

  const [pinUrl, setPinUrl] = useState<string>("");
  const [pinCreator, setPinCreator] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imgList, setImgList] = useState<string[]>([]);


  const [moreHover, setMoreHover] = useState<boolean>(false);
  const [moreClick, setMoreClick] = useState<boolean>(false);
  const [shareHover, setShareHover] = useState<boolean>(false);
  const [shareClick, setShareClick] = useState<boolean>(false);

  const savePins = async () => {
    await axiosPost('user/saved', {
      userEmail: userEmail,
      pinId: pinId
    });
  }

  const fetchDetailPins = async () => {
    const detailPins = await axiosPost("pin/detail", {
      pinId: pinId
    });
    setPinUrl(detailPins[0].pinUrl);
    setPinCreator(detailPins[0].pinCreator);
    fetchSimilarPins(detailPins[0].pinKeyword);
  };

  const fetchSimilarPins = async (keyword: string) => {
    const similarPins = await axiosPost("pin/search", {
      pinKeyword: keyword
    });
    setImgList((curImgList) => [...curImgList, ...similarPins]);
  };

  useEffect(() => {
    setImgList([]);
    setIsLoading(true);
    fetchDetailPins();
    setIsLoading(false);
  }, [location])

  return (<>
    {isLoading ? 
      <Loading />
    : 
      <Detail>
        <Box>
          <Box className="left">
            <PinImg src={pinUrl} />
          </Box>
          <Box className="right">
            <ItemDiv>
              <Button moreHover={moreHover}>
                <MdOutlineMoreHoriz 
                  size="38" style={{position: "absolute", marginTop: "-18px",  marginLeft: "-18px"}}
                  onMouseOver={e => setMoreHover(true)} 
                  onMouseLeave={e => setMoreHover(false)}
                  onClick={e => setMoreClick(true)}
                />
                {moreClick?
                  <Inform 
                    pinUrl={pinUrl}
                    itemList={["이미지 다운로드", "핀 숨기기", "핀 신고", "핀 임베드 코드 가져오기"]}
                    setClick={setMoreClick}
                  />
                :null}
              </Button>
              <Button shareHover={shareHover}>
                <MdShare 
                  size="28" style={{position: "absolute", marginTop: "-15px",  marginLeft: "-15px"}}
                  onMouseOver={e => setShareHover(true)} 
                  onMouseLeave={e => setShareHover(false)}
                  onClick={e => setShareClick(true)}
                />
                {shareClick?
                  <Inform
                    pinUrl={pinUrl}
                    itemList={["트위터 공유", "페이스북 공유"]}
                    setClick={setShareClick}
                  />
                :null}
              </Button>
              <SaveBtn 
                onClick={e => savePins()}
              >저장</SaveBtn>
            </ItemDiv>
            <CreatorDiv>
              업로드한 사람: {pinCreator}
            </CreatorDiv>
          </Box>
        </Box>
        <Saction>유사한 핀 더 보기</Saction>
        <Wrapper>
          <Masonry brakePoints={[350, 500, 750, 780, 920]}>
            {imgList.map((item, idx) =>
              <PinChunk key={idx} img={item["pinUrl"]} idx={item["pinId"]} />
            )}
          </Masonry>
        </Wrapper>
      </Detail>
    }
  </>);
};
  
export default PinPage;