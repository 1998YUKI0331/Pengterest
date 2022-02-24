import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import styled from '@emotion/styled';
import { AuthContext } from '../Auth/AuthContext';
import SaveBtn from '@/components/common/saveBtn';

type pinProps = { 
  pinHover: boolean;
};

const Pin = styled.div`
  position: relative;
  figure {
    display: inline-block;
    margin-top: 0em;
    margin-bottom: 2em;
    margin-left: 5px;
    width: 85%;
  }
  img {
    width: 112%;
  }
`;

const PinImage = styled.img<pinProps>`
  height: 100%
  filter: ${(props) => (props.pinHover ? "brightness(55%)" : "brightness(95%)")};
  -webkit-filter: ${(props) => (props.pinHover ? "brightness(55%)" : "brightness(95%)")};
  border-radius: 20px;
`;

interface PinChunkProps {
  img: string;
  idx: number;
}

const PinChunk: React.FunctionComponent<PinChunkProps> = (props) => {
  const navigate = useNavigate();

  const [pinHover, setPinHover] = useState<boolean>(false);
  const userInfo = useContext(AuthContext);
  const userEmail: string = userInfo?.email || '';

  const goPindetail = (pinId: number) => {
    navigate(`/pin/${pinId}`);
  }

  return (<>
    <Pin key={props.idx}>
      <figure 
        onMouseEnter={e => setPinHover(true)}
        onMouseLeave={e => setPinHover(false)}
        onClick={e => goPindetail(props.idx)}
      >
      {pinHover ?
        <SaveBtn 
          userEmail={userEmail}
          pinId={props.idx}
        >저장</SaveBtn>
      : null}
        <PinImage src={props.img} pinHover={pinHover} />
      </figure>
    </Pin>
  </>);
};

export default PinChunk;