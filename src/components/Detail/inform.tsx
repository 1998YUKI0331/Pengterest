import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import useOutsideClick from '../../hooks/useOutsideClick';

interface hoverProps {
  hoverItem: number
}

const InformDiv = styled.div`
  text-align: start;
  background: white;
  position: absolute;
  top: 45px; left: -25px;
  z-index: 3;
  width: 200px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(33, 33, 33, .1);
  padding: 10px;
`;

const Item = styled.div<hoverProps>`
  height: auto;
  padding: 8px;
  border-radius: 10px;
  font-weight: bold; font-size: 1rem;
  margin-top: -2px;
  &:hover {
    background: #F0F0F0;
  }
  :nth-of-type(1) {
    background: ${props => (props.hoverItem === 1 ? "#F0F0F0" : "white")};
  }
  :nth-of-type(2) {
    background: ${props => (props.hoverItem === 2 ? "#F0F0F0" : "white")};
  }
  :nth-of-type(3) {
    background: ${props => (props.hoverItem === 3 ? "#F0F0F0" : "white")};
  }
  :nth-of-type(4) {
    background: ${props => (props.hoverItem === 4 ? "#F0F0F0" : "white")};
  }
`;

interface informProps {
  itemList: string[];
  setClick: (value: boolean) => void;
  pinUrl: string;
}

const Inform: React.FunctionComponent<informProps> = (props) => {
  const [hoverItem, SetHoverItem] = useState<number>(0);
  const informOut = useRef() as React.MutableRefObject<HTMLDivElement>;
  useOutsideClick(informOut, props.setClick)

  const downloadImg = (url: string, fileName: string) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
      let urlCreator = window.URL || window.webkitURL;
      let imageUrl = urlCreator.createObjectURL(this.response);
      let tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
    }
    xhr.send();
  }

  const shareTwitter = () => {
    const sendUrl = props.pinUrl;
    window.open("https://twitter.com/intent/tweet?url=" + sendUrl);
  }

  const shareFacebook = () => {
    const sendUrl = props.pinUrl;
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  }

  const handleClick = (item: string) => {
    if (item === '이미지 다운로드') {
      downloadImg(props.pinUrl, "This is your peng");
    }
    else if (item === '트위터 공유') {
      shareTwitter();
    }
    else if (item === '페이스북 공유') {
      shareFacebook();
    }
    else {
      alert(item);
    }
  }

  return (
      <InformDiv ref={informOut}>
        {props.itemList.map((item, idx) =>
          <Item 
            key={idx}
            hoverItem={hoverItem}
            onMouseOver={e => SetHoverItem(idx + 1)}
            onClick={e => handleClick(item)}
          >{item}</Item>
        )}
      </InformDiv>
  );
};

export default Inform;