import styled from '@emotion/styled'
import signin_normal from '../assets/btn_google_signin_normal.png'
import signin_focus from '../assets/btn_google_signin_focus.png'

import { firebaseAuth, signInGoogle } from '../../firebase/firebaseAuth';

const Background = styled.div`
  background: no-repeat center/cover url("http://adwallpapers.xyz/uploads/posts/278940-nature-Penguin-beak-bird-fauna-flightless-bird-vertebrate-king-penguin.jpg");
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("http://adwallpapers.xyz/uploads/posts/278940-nature-Penguin-beak-bird-fauna-flightless-bird-vertebrate-king-penguin.jpg");
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 100;
  section {
    display: flex;
    height: 100%;
    width: 100%;
  }
  @media all and (max-width: 767px) {
    height: auto;
  }
`;

const MentSection= styled.div`
  padding: 50px;
  color: white;
  width: 55%;
  font-weight: 800; font-size: 4.7rem;
  @media all and (max-width: 767px) {
    width: 15%;
    padding: 5px;
    font-size: 3rem;
  }
`;

const LoginSection= styled.div`
  position: relative;
  background: white;
  width: 400px;
  text-align: center;
  padding: 10px;
`;

const Welcome= styled.p`
  font-weight: 800; font-size: 2rem;
`;

const WelcomeSub= styled.p`
  font-size: 1rem;
  margin-top: -20px;
`;

const LoginBtn= styled.button`
  background: url(${signin_normal}) no-repeat center/cover;
  margin-top: 150px;
  border: 0px solid rgba(187, 187, 187, 0.384);
  height: 40px;
  width: 190px;
  &:hover {
    background: url(${signin_focus}) no-repeat center/cover;
  }
`;

const LoginPage: React.FunctionComponent = () => {
  return (
    <Background>
        <section>
            <MentSection>가입하여 더 많은 펭귄을 만나 보세요</MentSection>
            <LoginSection>
                <img 
                    style={{height: "10%", marginTop: "20px"}}
                    src="https://seeklogo.com/images/P/pinterest-logo-8561DDA2E1-seeklogo.com.png"
                />
                <Welcome>Pengterest에 오신 것을<br />환영합니다</Welcome>
                <WelcomeSub>시도해 볼 만한 새로운 아이디어 찾기</WelcomeSub>
                <LoginBtn onClick={e => signInGoogle()}/>
            </LoginSection>
        </section>
    </Background>
  );
};

export default LoginPage;