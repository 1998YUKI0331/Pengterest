import { useState, useContext } from 'react';
import { axiosPost } from '../../api/axios';
import styled from '@emotion/styled';
import { AuthContext } from '../Auth/AuthContext';

type pinProps = { 
  pinHover: boolean;
};

const Pin = styled.div`
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
  const userInfo = useContext(AuthContext);
  const userEmail: string = userInfo?.email || '';

  const savePins = async () => {
    await axiosPost('user/saved', {
      userEmail: userEmail,
      pinId: props.idx
    });
  }

  return (<>
    <Pin key={props.idx}>
    {pinHover ?
      <SaveBtn 
        onMouseEnter={e => setPinHover(true)}
        onClick={e => savePins()}
      >저장</SaveBtn>
    : null}
      <figure>
        <PinImg 
          src={props.img} pinHover={pinHover}
          onMouseEnter={e => setPinHover(true)} onMouseLeave={e => setPinHover(false)}
        />
      </figure>
    </Pin>
  </>);
};

export default PinChunk;