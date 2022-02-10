import styled from '@emotion/styled'
import Profile from '../components/MyPage/Profile';
import Masonry from "../components/PinChunk/Masonry";
import PinChunk from '@/components/PinChunk/PinChunk';

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

const CreatedPage: React.FunctionComponent = () => {
  const testImg : string[] = [];

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
          <Comment>아직 생성된 핀 없음</Comment>
        </div>
      }
    </div>
  )
};

export default CreatedPage;