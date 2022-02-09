import { useContext, useState } from "react";
import { AuthContext } from "../components/Auth/AuthContext";
import styled from '@emotion/styled'
import PinChunk from '@/components/PinChunk/PinChunk';

type modeProps = { 
  mode: Number;
};

const Wrapper = styled.div`
  column-count: 6;
  column-gap: 0px;
  @media all and (min-width: 1201px) and (max-width: 1500px) {
    column-count: 5;
    column-gap: 0.5em;
  }
  @media all and (min-width: 1024px) and (max-width: 1200px) {
    column-count: 4;
    column-gap: 0.5em;
  }
  @media all and (min-width: 768px) and (max-width: 1023px) {
    column-count: 3;
    column-gap: 0.5em;
  }
  @media all and (max-width: 767px) {
    column-count: 2;
    column-gap: 0.2em;
  }
`;

const ProfileSec = styled.div`
  padding: 20px;
  height: 240px;
  text-align: center;
`;

const ProfilePic = styled.img`
  height: 130px;
  border-radius: 1000px;
`;

const ProfileName = styled.h1`
  margin-top: 0px;
  font-size: 2.5rem;
`;

const ProfileEmail = styled.p`
  margin-top: -20px;
  font-size: 1rem;
  font-weight: 300;
`;

const SavedPins = styled.div`
`;

const SaveOrMake = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;

const PickMode = styled.h1<modeProps>`
  margin-top: 0px;
  font-size: 1.1rem;
  text-align: center;
  height: 30px;
  border-width: 0 0 3px;
  :nth-of-type(1) {
    border-style: ${props => (props.mode === 1 ? "solid" : "none")};
  }
  :nth-of-type(2) {
    border-style: ${props => (props.mode === 2 ? "solid" : "none")};
  }
`;

const SavedPage: React.FunctionComponent = () => {
  const userInfo = useContext(AuthContext);
  const userName: string = userInfo?.displayName || '';
  const userEmail: string = userInfo?.email || '';
  const userPicSrc: string = userInfo?.photoURL || '';

  const [mode, setMode] = useState<Number>(2); //1생성, 2저장

  const testImg : string[] = [
    "https://i.pinimg.com/236x/25/d1/4b/25d14b6cb5c34f4101abd61c345b82c9.jpg",
    "https://i.pinimg.com/236x/83/ea/d5/83ead5904adf4ccf630918ed04409f58.jpg",
    "https://i.pinimg.com/236x/80/fe/64/80fe6463b411275596eb75de1f2a835a.jpg",
    "https://i.pinimg.com/236x/61/b5/b7/61b5b70ae3cec9faa3baa2581d008987.jpg"
  ];

  console.log(userInfo)
  return (
    <div>
      <ProfileSec>
        <ProfilePic src={userPicSrc}/>
        <ProfileName>{userName}</ProfileName>
        <ProfileEmail>{userEmail}</ProfileEmail>
      </ProfileSec>
      <SavedPins>
        <SaveOrMake>
          <PickMode 
            style={{marginRight: "20px"}} mode={mode} onClick={e => setMode(1)}
          >생성됨</PickMode>
          <PickMode 
            mode={mode} onClick={e => setMode(2)}
          >저장됨</PickMode>
        </SaveOrMake>
        <Wrapper>
          {testImg.map((img, idx) =>
            <PinChunk key={idx} img={img} idx={idx} />
          )}
        </Wrapper>
      </SavedPins>
    </div>
  )
};

export default SavedPage;