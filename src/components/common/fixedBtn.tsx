import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { BsPlusLg, BsQuestionLg } from 'react-icons/bs';
import useOutsideClick from '../../hooks/useOutsideClick'
import Dropdown from './dropdown';

const Button = styled.button`
  background: white;
  position: fixed;
  bottom: 25px; right: 25px;
  padding: 3px 0px 0px 2px;
  z-index: 2;
  border-radius: 100px;
  border: none;
  box-shadow: 0 0 15px rgba(33, 33, 33, .1);
  height: 55px; width: 55px;
  &:hover {
    background: #F0F0F0;
  }
`;

const FixedBtn: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [clickedQustion, setClickedQustion] = useState<boolean>(false);
  const [clickedPlus, setClickedPlus] = useState<boolean>(false);

  const test = () => alert("ff")
  const goCreate = () => navigate('/create')
  const goGithub = () => window.location.href = 'https://github.com/1998YUKI0331/Pengterest/'

  return (
    <>
      <div onClick={e => setClickedQustion(!clickedQustion)}>
        <Button>
          <BsQuestionLg size="24" />
          {clickedQustion ?
            <Dropdown 
              itemList={["도움말 센터로 이동", "Pengterest Github 방문"]}
              funcList={[test, goGithub]}
              setClick={setClickedQustion}
              top={-36}
              left={-325}
              width={300}
            />
          : null}
        </Button>
      </div>
      <div onClick={e => setClickedPlus(!clickedPlus)}>
        <Button style={{bottom: "90px"}}>
          <BsPlusLg size="24" />
          {clickedPlus ?
            <Dropdown 
              itemList={["핀 만들기"]}
              funcList={[goCreate]}
              setClick={setClickedPlus}
              top={-3}
              left={-325}
              width={300}
            />
          : null}
        </Button>
      </div>
    </>
  );
};

export default FixedBtn;