import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import useOutsideClick from '../../hooks/useOutsideClick';

interface divProps {
  top: number;
  left: number;
  width: number;
}

const DropdownmDiv = styled.div<divProps>`
  text-align: start;
  background: white;
  position: absolute;
  top: ${props => (props.top)}px;
  left: ${props => (props.left)}px;
  width: ${props => (props.width)}px;
  z-index: 3;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(33, 33, 33, .1);
  padding: 10px;
`;

const Item = styled.div`
  height: auto;
  padding: 8px;
  border-radius: 10px;
  font-weight: bold; font-size: 1rem;
  margin-top: -2px;
  &:hover {
    background: #F0F0F0;
  }
`;

interface dropdownProps {
  itemList: string[];
  funcList: any;
  setClick: (value: boolean) => void;
  top: number;
  left: number;
  width: number;
}

const Dropdown: React.FunctionComponent<dropdownProps> = (props) => {
  const [hoverItem, SetHoverItem] = useState<number>(0);
  const dropdownOut = useRef() as React.MutableRefObject<HTMLDivElement>;
  useOutsideClick(dropdownOut, props.setClick)

  return (
      <DropdownmDiv 
        ref={dropdownOut}             
        top={props.top} left={props.left} width={props.width}>
        {props.itemList.map((item, idx) =>
          <Item 
            key={idx}
            onMouseOver={e => SetHoverItem(idx + 1)}
            onClick={e => props.funcList[idx]()}
            style={{background: `${hoverItem === (idx + 1) ? "#F0F0F0" : "white"}`}}
          >{item}</Item>
        )}
      </DropdownmDiv>
  );
};

export default Dropdown;