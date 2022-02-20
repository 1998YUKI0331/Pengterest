import { useEffect, useState, useContext } from "react";
import styled from '@emotion/styled';
import Wrapper from '@/components/PinChunk/Wrapper';
import Profile from '@/components/MyPage/Profile';
import { AuthContext } from '@/components/Auth/AuthContext';

const Comment = styled.h1`
  text-align: center;
  margin-top: 120px;
  font-size: 1.7rem;
`;

const SavedPage: React.FunctionComponent = () => {
  const userInfo = useContext(AuthContext);
  const userEmail: string = userInfo?.email || '';

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pinCnt, setPinCnt] = useState(-1); //pin 개수

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
        <Comment>아직 저장된 핀 없음</Comment>
      :
        <Wrapper
          fetchUrl={"user/saved"}
          request={{userEmail: userEmail}}
          method={"GET"}
          setPinCnt={setPinCnt}
        />
      }
    </>
    }
    </div>
  )
};

export default SavedPage;