import { axiosPost } from '../../api/axios';
import styled from '@emotion/styled';

interface positionProps {
  top?: number;
  right?: number;
}


const Btn = styled.button<positionProps>`
  position: absolute;
  top: ${props => (props.top ? props.top : 7)}px;
  right: ${props => (props.right ? props.right : 12)}px;
  z-index: 1;
  background: red;
  border-radius: 30px; border: none;
  height: 48px; width: 68px;
  color: white;
  font-weight: 800; font-size: 1rem;
  line-height: 48px;
  &:hover {
    background: #AD081B;
  }
`;

interface SaveBtnProps extends positionProps {
  userEmail: string;
  pinId: number;
}

const SaveBtn: React.FunctionComponent<SaveBtnProps> = (props) => {
  const savePins = async () => {
    await axiosPost('user/saved', {
      userEmail: props.userEmail,
      pinId: props.pinId
    });
  }

  return (
    <>
      <Btn
        top={props.top} right={props.right}
        onClick={e => savePins()}
      >저장</Btn>
    </>
  );
};

export default SaveBtn;