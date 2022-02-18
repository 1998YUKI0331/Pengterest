import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosPost } from '@/api/axios';
import styled from '@emotion/styled';
import { BiLinkAlt, BiCategoryAlt } from 'react-icons/bi';
import { AuthContext } from '../components/Auth/AuthContext';

interface inputProps { 
  urlFocus?: boolean;
  categoryFocus?: boolean;
  urlBlank?: boolean;
  categoryBlank?: boolean;
};

const Wrapper = styled.div`
  background: #F0F0F0;
  width: calc(100% - 50px);
  height: calc(100vh - 78px - 100px);
  padding: 50px 25px 50px 25px;
`;

const Section = styled.p`
  font-size: 1.05rem;
  font-weight: 800;
`;

const PinBoard = styled.div`
  background: white;
  border-radius: 15px;
  height: 300px;
  padding: 40px;
`;

const InputDiv = styled.div<inputProps>`
  color: #767676;
  width: 100%; height: 45px;
  border-radius: 100px;
  border: 2.2px solid rgba(230, 230, 230);
  margin-bottom: 20px;
  :nth-of-type(1) {
    background: ${props => (props.urlBlank ? "rgba(252, 74, 74, 0.5)" : "white")};
    border: ${props => (props.urlFocus ? "2.5px solid #7FC1FF" : "2.2px solid rgba(230, 230, 230)")};
  }
  :nth-of-type(2) {
    background: ${props => (props.categoryBlank ? "rgba(252, 74, 74, 0.5)" : "white")};
    border: ${props => (props.categoryFocus ? "2.5px solid #7FC1FF" : "2.2px solid rgba(230, 230, 230)")};
  }
`;

const UrlIcon = styled.span<inputProps>`
  position: relative;
  top: 6px; left: 10px;
  display: ${(props) => (props.urlFocus ? "none" : "inline")};
`;

const CategoryIcon = styled.span<inputProps>`
  position: relative;
  top: 6px; left: 10px;
  display: ${(props) => (props.categoryFocus ? "none" : "inline")};
`;

const Input = styled.input`
  border: 2.2px solid rgba(0, 0, 0, 0);
  font-size: 1rem;
  background: transparent;
  width: calc(100% - (65px));
  height: 40px;
  margin-left: 15px;
  &:focus {
    outline: none;
  }
`;

const SaveBtn = styled.button`
  margin-top: 10px;
  background: red;
  border-radius: 10px; border: none;
  height: 38px; width: 68px;
  color: white;
  font-weight: 800; font-size: 1rem;
  line-height: 38px;
  &:hover {
    background: #AD081B;
  }
`;

const AllPlease = styled.div`
  text-align: center; 
  margin-top: 50px;
  font-size: 0.9rem;
  font-weight: 100;
  color: gray;
`;

const CreatePage: React.FunctionComponent = () => {
  const userInfo = useContext(AuthContext);
  const userEmail: string = userInfo?.email || '';
  const navigate = useNavigate();

  const [urlFocus, setUrlFocus] = useState<boolean>(false);
  const [categoryFocus, setCategoryFocus] = useState<boolean>(false);
  const [urlBlank, setUrlBlank] = useState<boolean>(false);           //true면 url 공백
  const [categoryBlank, setCategoryBlank] = useState<boolean>(false); //true면 카테고리 공백
  const [url, setUrl] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const createPin = async () => {
    if (url !== "" && category !== "") {
      await axiosPost("pin/created", {
        pinId: Math.floor(Math.random() * 10000000),
        pinUrl: url,
        pinCreator: userEmail,
        pinKeyword: category        
      });
      navigate('/created');
    }
    if (url === "") setUrlBlank(true);
    if (category === "") setCategoryBlank(true);
  };

  return (
    <Wrapper>
      <Section>핀 만들기</Section>
      <PinBoard>
        <InputDiv 
            urlFocus={urlFocus} categoryFocus={categoryFocus}
            urlBlank={urlBlank} categoryBlank={categoryBlank}
        >
          <UrlIcon urlFocus={urlFocus} >
            <BiLinkAlt size="25" />
          </UrlIcon>
          <Input
            placeholder='이미지 url 입력'
            onFocus={e => {setUrlFocus(true); setUrlBlank(false);}}
            onBlur={e => setUrlFocus(false)}
            value={url} 
            onChange={e => setUrl(e.target.value)}
          />
        </InputDiv>
        <InputDiv 
          urlFocus={urlFocus} categoryFocus={categoryFocus}
          urlBlank={urlBlank} categoryBlank={categoryBlank}
        >
          <CategoryIcon categoryFocus={categoryFocus}>
            <BiCategoryAlt size="25" />
          </CategoryIcon>
          <Input
            placeholder='이미지 카테고리 입력'
            onFocus={e => {setCategoryFocus(true); setCategoryBlank(false);}}
            onBlur={e => setCategoryFocus(false)}
            value={category} 
            onChange={e => setCategory(e.target.value)}
          />
        </InputDiv>
        <div style={{textAlign: "right"}}>
          <SaveBtn
            onClick={e => createPin()}
          >저장</SaveBtn>
        </div>
        {urlBlank && categoryBlank ?
          <AllPlease>
            상단의 모든 항목을 입력해주세요.
          </AllPlease>
        : null}
      </PinBoard>
    </Wrapper>
  )
};

export default CreatePage;