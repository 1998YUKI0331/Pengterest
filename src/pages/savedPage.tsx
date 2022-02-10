import styled from '@emotion/styled'
import Masonry from "../components/PinChunk/Masonry";
import PinChunk from '@/components/PinChunk/PinChunk';
import Profile from '../components/MyPage/Profile';

const Wrapper = styled.div`
  width: 96vw;
	margin: auto;
  @media all and (max-width: 767px) {
    width: 92vw;
  }
`;

const Comment = styled.h1`
  text-align: center;
  margin-top: 120px;
  font-size: 1.7rem;
`;

const SavedPage: React.FunctionComponent = () => {
  const testImg : string[] = [
    "https://i.pinimg.com/236x/25/d1/4b/25d14b6cb5c34f4101abd61c345b82c9.jpg",
    "https://i.pinimg.com/236x/83/ea/d5/83ead5904adf4ccf630918ed04409f58.jpg",
    "https://i.pinimg.com/236x/80/fe/64/80fe6463b411275596eb75de1f2a835a.jpg",
    "https://i.pinimg.com/236x/61/b5/b7/61b5b70ae3cec9faa3baa2581d008987.jpg",
    "https://i.pinimg.com/236x/61/b5/b7/61b5b70ae3cec9faa3baa2581d008987.jpg",
    "https://i.pinimg.com/236x/61/b5/b7/61b5b70ae3cec9faa3baa2581d008987.jpg",
    "https://i.pinimg.com/236x/61/b5/b7/61b5b70ae3cec9faa3baa2581d008987.jpg",
  ];

  return (
    <div>
      <Profile />
      {testImg.length !== 0 ? 
        <Wrapper>
          <Masonry brakePoints={[350, 500, 750, 780, 920]}>
          {testImg.map((img, idx) =>
            <PinChunk key={idx} img={img} idx={idx} />
          )}
          </Masonry>
        </Wrapper>
      :
        <div>
          <Comment>아직 저장된 핀 없음</Comment>
        </div>
      }
    </div>
  )
};

export default SavedPage;