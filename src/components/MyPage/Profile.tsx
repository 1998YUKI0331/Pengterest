import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "../Auth/AuthContext";
import styled from '@emotion/styled'

type modeProps = { 
  mode: Number;
};

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

const Profile: React.FunctionComponent = () => {
  const userInfo = useContext(AuthContext);
  const userName: string = userInfo?.displayName || '';
  const userEmail: string = userInfo?.email || '';
  const userPicSrc: string = userInfo?.photoURL || '';

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    location.pathname === '/created' ? setMode(1) : setMode(2)
  }, [location.pathname])

  const [mode, setMode] = useState<Number>(2); //1생성, 2저장

  return (
    <div>
      <ProfileSec>
        <ProfilePic src={userPicSrc}/>
        <ProfileName>{userName}</ProfileName>
        <ProfileEmail>{userEmail}</ProfileEmail>
      </ProfileSec>
      <div>
        <SaveOrMake>
          <PickMode 
            style={{marginRight: "20px"}} mode={mode} onClick={e => navigate('/created')}
          >생성됨</PickMode>
          <PickMode 
            mode={mode} onClick={e => navigate('/saved')}
          >저장됨</PickMode>
        </SaveOrMake>
      </div>
    </div>
  )
};

export default Profile;