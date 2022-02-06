import { useState } from 'react';
import styled from '@emotion/styled'

type pinProps = { 
  pinHover: boolean;
};

const Pin = styled.div`
  figure {
    display: inline-block;
    margin-top: 0em;
    margin-bottom: 1.5em;
    margin-left: 6px;
    width: 95%;
  }
  img {
    width: 100%;
  }
`;

const PinImg = styled.img<pinProps>`
  height: 100%
  filter: ${(props) => (props.pinHover ? "brightness(55%)" : "brightness(95%)")};
  -webkit-filter: ${(props) => (props.pinHover ? "brightness(55%)" : "brightness(95%)")};
  border-radius: 20px;
`;

const SaveBtn = styled.button`
  position: absolute;
  z-index: 1;
  background: red;
  margin-top: 10px; margin-left: 15px;
  border-radius: 30px; border: none;
  height: 48px; width: 68px;
  color: white;
  font-weight: 800; font-size: 1rem;
  line-height: 48px;
  &:hover {
    background: #AD081B;
  }
`;

interface PinChunkProps {
  img: string;
  idx: number;
}

const PinChunk: React.FunctionComponent<PinChunkProps> = (props) => {
  const [pinHover, setPinHover] = useState<boolean>(false);
  const [btnHover, setBtnHover] = useState<boolean>(false);
  const handlePinOut = () => btnHover ? null : setPinHover(false);

  return (<>
    <Pin key={props.idx} onMouseEnter={e => setPinHover(true)} onMouseLeave={handlePinOut}>
    {pinHover ?
      <SaveBtn onMouseEnter={e => setBtnHover(true)} onMouseLeave={e => setBtnHover(false)}
      >저장</SaveBtn>
    : null}
      <figure><PinImg src={props.img} pinHover={pinHover} /></figure>
    </Pin>
  </>);
};

export default PinChunk;