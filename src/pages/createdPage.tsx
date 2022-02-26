import { useEffect, useState, useContext } from "react";
import styled from '@emotion/styled';
import Wrapper from '@/components/PinChunk/Wrapper';
import Profile from '@/components/MyPage/Profile';
import { AuthContext } from '@/components/Auth/AuthContext';
import { axiosGet } from "@/api/axios";

const Comment = styled.h1`
  text-align: center;
  margin-top: 120px;
  font-size: 1.7rem;
`;

const CreatedPage: React.FunctionComponent = () => {
  const userInfo = useContext(AuthContext);
  const userEmail: string = userInfo?.email || '';

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pinCnt, setPinCnt] = useState(-1); //pin 개수

  const fetchCreatedPins = async () => {
    let pins = await axiosGet("user/created", {userEmail: userEmail});
    pins = Object.values(pins)[1]; //object to array
    if (pins.length === 0) setPinCnt(0);
    return pins;
  }

  useEffect(() => {
    if (userEmail) {
      setIsLoading(false);
    }
  }, [userEmail])

  return (
    <div>
    {isLoading ?
      null
    :
    <>
      <Profile />
      {pinCnt === 0 ?
        <Comment>아직 생성된 핀 없음</Comment>
      :
        <Wrapper
          fetchPins={fetchCreatedPins}
        />
      }
    </>
    }
    </div>
  )
};

export default CreatedPage;