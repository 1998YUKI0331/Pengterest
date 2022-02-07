import { useContext } from "react";
import styled from '@emotion/styled'
import PinChunk from '@/components/PinChunk/PinChunk';
import { AuthContext } from "../components/Auth/AuthContext";
import Loading from "../components/common/loading";

const Wrapper = styled.div`
  column-count: 6;
  column-gap: 0px;
  @media all and (min-width: 1201px) and (max-width: 1500px) {
    column-count: 5;
    column-gap: 0.5em;
  }
  @media all and (min-width: 1024px) and (max-width: 1200px) {
    column-count: 4;
    column-gap: 0.5em;
  }
  @media all and (min-width: 768px) and (max-width: 1023px) {
    column-count: 3;
    column-gap: 0.5em;
  }
  @media all and (max-width: 767px) {
    column-count: 2;
    column-gap: 0.2em;
  }
`;

const MainPage = () => {
  const userInfo = useContext(AuthContext);

  const testImg : string[] = [
    "https://i.pinimg.com/236x/25/d1/4b/25d14b6cb5c34f4101abd61c345b82c9.jpg",
    "https://i.pinimg.com/236x/83/ea/d5/83ead5904adf4ccf630918ed04409f58.jpg",
    "https://i.pinimg.com/236x/80/fe/64/80fe6463b411275596eb75de1f2a835a.jpg",
    "https://i.pinimg.com/236x/61/b5/b7/61b5b70ae3cec9faa3baa2581d008987.jpg",
    "https://i.pinimg.com/236x/6e/59/e4/6e59e40a2d992eafbbf3968ea528a943.jpg",
    "https://i.pinimg.com/236x/82/1a/93/821a93f3bf1047f1f09f171061557997.jpg",
    "https://i.pinimg.com/236x/12/c8/7c/12c87c6fc4d14fd15d361ee93b2b647c.jpg",
    "https://i.pinimg.com/236x/e5/57/09/e55709b9ad252da70aafeeea17626a53.jpg",
    "https://i.pinimg.com/236x/c4/fa/86/c4fa8679ae6fdaec40552cc20c41e3b8.jpg",
    "https://i.pinimg.com/236x/10/92/83/1092833fcac0603961ea82c2fabfefe1.jpg",
    "https://i.pinimg.com/236x/1a/97/36/1a9736358bf0fca04f1f760595e151b5.jpg",
    "https://i.pinimg.com/236x/c6/c7/f6/c6c7f66202da8572aa9c6ffa9d65bfef.jpg",
    "https://i.pinimg.com/236x/5d/30/d2/5d30d2bf1ebe6db4657b3d0ef0437fb4.jpg",
    "https://i.pinimg.com/236x/85/f2/34/85f234a199dbce6023885869224d799c.jpg",
    "https://i.pinimg.com/236x/27/0f/74/270f745f6ef20f4ea0c74315339aad99.jpg",
    "https://i.pinimg.com/236x/10/98/cb/1098cb71d252e4d50d5bd31323208045.jpg",
    "https://i.pinimg.com/236x/ee/d2/08/eed2087aecd0d2f0a619cb16794699d5.jpg",
    "https://i.pinimg.com/236x/02/d8/67/02d867a36cc0885dfa8e6fcfb1c549ce.jpg",
    "https://i.pinimg.com/236x/bd/6b/d4/bd6bd40b65b4630437ff8049a2499472.jpg"
  ];

  return (
    <div>
      <Wrapper>
        {testImg.map((img, idx) =>
          <PinChunk key={idx} img={img} idx={idx} />
        )}
      </Wrapper>
      {userInfo ? null : <Loading />}
    </div>
  );
};

export default MainPage;