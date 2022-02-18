import { useEffect, useState, useContext } from "react";
import { axiosGet } from '../api/axios';
import styled from '@emotion/styled';
import Masonry from "../components/PinChunk/Masonry";
import PinChunk from '@/components/PinChunk/PinChunk';
import Profile from '../components/MyPage/Profile';
import { AuthContext } from '../components/Auth/AuthContext';

const Wrapper = styled.div`
  width: 96vw;
	margin: auto;
  @media all and (max-width: 767px) {
    width: 92vw;
  }
`;

const Comment = styled.h1`
  text-align: center;
  margin-top: 120px;
  font-size: 1.7rem;
`;

const SavedPage: React.FunctionComponent = () => {
  const [saveList, setSaveList] = useState<string[]>([]);
  const userInfo = useContext(AuthContext);
  const userEmail: string = userInfo?.email || '';

  const fetchSavedPins = async () => {
    const savedPins = await axiosGet("user/saved", {
      userEmail: userEmail
    });
    setSaveList((curImgList) => [...curImgList, ...savedPins]);
  }
  
  useEffect(() => {
    fetchSavedPins();
  }, [])

  return (
    <div>
      <Profile />
      {saveList.length !== 0 ? 
        <Wrapper>
          <Masonry brakePoints={[350, 500, 750, 780, 920]}>
          {saveList.map((item, idx) =>
            <PinChunk key={idx} img={item["pinUrl"]} idx={item["pinId"]} />
          )}
          </Masonry>
        </Wrapper>
      :
        <div>
          <Comment>아직 저장된 핀 없음</Comment>
        </div>
      }
    </div>
  )
};

export default SavedPage;