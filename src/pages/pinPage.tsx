import { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom"
import styled from '@emotion/styled'
import { MdOutlineMoreHoriz, MdShare } from 'react-icons/md'
import { axiosPost } from "@/api/axios";
import Dropdown from "@/components/common/dropdown";
import { AuthContext } from "@/components/Auth/AuthContext";
import Wrapper from "@/components/PinChunk/Wrapper";
import SaveBtn from '@/components/common/saveBtn';

interface itemProps {
  moreHover?: boolean;
  shareHover?: boolean;
}

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
  const [pinKeyword, setPinKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [moreHover, setMoreHover] = useState<boolean>(false);
  const [moreClick, setMoreClick] = useState<boolean>(false);
  const [shareHover, setShareHover] = useState<boolean>(false);
  const [shareClick, setShareClick] = useState<boolean>(false);

  const fetchDetailPins = async () => {
    await axiosPost("pin/detail", {
      pinId: pinId
    })
      .then(detailPins => {
        setPinUrl(detailPins[0].pinUrl);
        setPinCreator(detailPins[0].pinCreator);
        setPinKeyword(detailPins[0].pinKeyword);
        setIsLoading(false);
      })
  };

  const fetchSimilarPins = async () => await axiosPost("pin/search", {pinKeyword: pinKeyword});

  useEffect(() => {
    setIsLoading(true);
    fetchDetailPins();
  }, [location])

  /////////////////////dropdown에 넘겨줄 메소드/////////////////////

  const downloadImg = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", pinUrl, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
      let urlCreator = window.URL || window.webkitURL;
      let imageUrl = urlCreator.createObjectURL(this.response);
      let tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = "This is youe peng";
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }
    xhr.send();
  }

  const test = () => alert("ff")

  const shareTwitter = () => window.open("https://twitter.com/intent/tweet?url=" + pinUrl)
  const shareFacebook = () => window.open("http://www.facebook.com/sharer/sharer.php?u=" + pinUrl)

  //////////////////////////////////////////////////////////////////

  return (<>
    {isLoading ? 
      null
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
                  <Dropdown 
                    itemList={["이미지 다운로드", "핀 숨기기", "핀 신고", "핀 임베드 코드 가져오기"]}
                    funcList={[downloadImg, test, test, test]}
                    setClick={setMoreClick}
                    top={45} left={-23} width={200}
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
                  <Dropdown
                    itemList={["트위터 공유", "페이스북 공유"]}
                    funcList={[shareTwitter, shareFacebook]}
                    setClick={setShareClick}
                    top={45} left={-23} width={200}
                  />
                :null}
              </Button>
              <SaveBtn 
                userEmail={userEmail}
                pinId={Number(pinId)}
                top={15} right={20}
              >저장</SaveBtn>
            </ItemDiv>
            <CreatorDiv>
              업로드한 사람: {pinCreator}
            </CreatorDiv>
          </Box>
        </Box>
        <Saction>유사한 핀 더 보기</Saction>
        <Wrapper
          fetchPins={fetchSimilarPins}
        />
      </Detail>
    }
  </>);
};
  
export default PinPage;