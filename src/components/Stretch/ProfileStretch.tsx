import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import styled from '@emotion/styled';
import { signOutGoogle } from '../../../firebase/firebaseAuth';

interface itemProps { 
  hoverItem: Number;
};

const Tab = styled.div`
  background: white;
  position: absolute;
  top: 28px; right: 0px;
  width: 260px; height: 500px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(33, 33, 33, .1);
  padding: 7px;
  z-index: 1;
`;

const SectionName = styled.p`
  font-size: 0.8rem;
  margin-left: 8px;
`;

const Item = styled.div<itemProps>`
  height: auto;
  padding: 8px;
  border-radius: 10px;
  font-weight: bold;
  margin-top: -2px;
  &:hover {
    background: #F0F0F0;
  }
  :nth-of-type(1) {
    background: ${props => (props.hoverItem === 1 ? "#F0F0F0" : null)};
  }
  :nth-of-type(2) {
    background: ${props => (props.hoverItem === 2 ? "#F0F0F0" : null)};
  }
  :nth-of-type(3) {
    background: ${props => (props.hoverItem === 3 ? "#F0F0F0" : null)};
  }
  :nth-of-type(4) {
    background: ${props => (props.hoverItem === 4 ? "#F0F0F0" : null)};
  }
  :nth-of-type(45) {
    background: ${props => (props.hoverItem === 5 ? "#F0F0F0" : null)};
  }
  :nth-of-type(6) {
    background: ${props => (props.hoverItem === 6 ? "#F0F0F0" : null)};
  }
  :nth-of-type(7) {
    background: ${props => (props.hoverItem === 7 ? "#F0F0F0" : null)};
  }
  :nth-of-type(8) {
    background: ${props => (props.hoverItem === 8 ? "#F0F0F0" : null)};
  }
  :nth-of-type(9) {
    background: ${props => (props.hoverItem === 9 ? "#F0F0F0" : null)};
  }
`;

const ProfilePic = styled.img`
  height: 60px;
  border-radius: 100px;
`;

const ProfileDes = styled.div`
  font-size: 0.9rem;
  font-weight: 300;
`;

interface ProfileStretchProps {
  userName: string;
  userEmail: string;
  userPicSrc: string;
}

const ProfileStretch: React.FunctionComponent<ProfileStretchProps> = (props) => {
  const [hoverItem, setHoverItem] = useState<Number>(0);
  const navigate = useNavigate();

  return (
    <Tab>
      <SectionName>현재 로그인 계정</SectionName>
      <Item style={{display: "flex"}} hoverItem={hoverItem} onMouseOver={e => setHoverItem(1)}>
        <div style={{width: "30%", float: "left"}}>
          <ProfilePic src={props.userPicSrc} />
        </div>
        <div style={{width: "70%", float: "right"}}>
          {props.userName}
          <ProfileDes>개인</ProfileDes>
          <ProfileDes>{props.userEmail}</ProfileDes>
        </div>
      </Item>

      <SectionName>내 계정</SectionName>
      <Item hoverItem={hoverItem} onMouseOver={e => setHoverItem(2)}>계정 추가</Item>
      <Item hoverItem={hoverItem} onMouseOver={e => setHoverItem(3)}>Besiness 계정으로 전환</Item>
      
      <SectionName>옵션 더 보기</SectionName>
      <Item hoverItem={hoverItem} onMouseOver={e => setHoverItem(4)}>설정</Item>
      <Item hoverItem={hoverItem} onMouseOver={e => setHoverItem(5)}>홈피드 조정</Item>
      <Item hoverItem={hoverItem} onMouseOver={e => setHoverItem(6)}>Windows 앱 설치</Item>
      <Item hoverItem={hoverItem} onMouseOver={e => setHoverItem(7)}>도움 받기</Item>
      <Item hoverItem={hoverItem} onMouseOver={e => setHoverItem(8)}>약관 및 개인정보 보기</Item>
      <Item hoverItem={hoverItem} onMouseOver={e => setHoverItem(9)}
            onClick={e => {signOutGoogle(); navigate('/login');}}
      >로그아웃</Item>
    </Tab>
  );
};

export default ProfileStretch;