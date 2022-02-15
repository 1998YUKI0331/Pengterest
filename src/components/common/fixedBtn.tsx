import { useState, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { BsPlusLg, BsQuestionLg } from 'react-icons/bs';
import useOutsideClick from '../../hooks/useOutsideClick'

type itemProps = { 
  hoverItem: Number;
};

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

const Qustion = styled.div`
  background: white;
  position: fixed;
  bottom: 88px; right: 25px;
  z-index: 3;
  width: 300px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(33, 33, 33, .1);
  padding: 10px;
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
`;

const FixedBtn: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [clickedQustion, setClickedQustion] = useState<boolean>(false);
  const [clickedPlus, setClickedPlus] = useState<boolean>(false);
  const [hoverItem, setHoverItem] = useState<Number>(0);

  const questionOut = useRef() as React.MutableRefObject<HTMLDivElement>;
  const plusOut = useRef() as React.MutableRefObject<HTMLDivElement>;
  useOutsideClick(questionOut, setClickedQustion);
  useOutsideClick(plusOut, setClickedPlus);

  return (
    <>
      <div ref={questionOut} onClick={e => setClickedQustion(!clickedQustion)}>
        <Button onClick={e => setHoverItem(0)}>
          <BsQuestionLg size="24" />
        </Button>
        {clickedQustion ?
          <Qustion>
            <Item 
              hoverItem={hoverItem} onMouseOver={e => setHoverItem(1)}
            >도움말 센터로 이동</Item>
            <Item 
              hoverItem={hoverItem} onMouseOver={e => setHoverItem(2)}
              onClick={e => window.location.href='https://github.com/1998YUKI0331/Pengterest/'}
            >Pengterest Github 방문</Item>
          </Qustion>
        : null}
      </div>
      <div ref={plusOut} onClick={e => setClickedPlus(!clickedPlus)}>
        <Button onClick={e => setHoverItem(0)} style={{bottom: "90px"}}>
          <BsPlusLg size="24" />
        </Button>
        {clickedPlus ?
          <Qustion style={{bottom: "153px"}}>
            <Item 
              hoverItem={hoverItem} onMouseOver={e => setHoverItem(1)}
              onClick={e => navigate('/create')}
            >핀 만들기</Item>
          </Qustion>
        : null}
      </div>
    </>
  );
};

export default FixedBtn;