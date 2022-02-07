import styled from '@emotion/styled'

const LoadingDiv = styled.div`
  position: absolute;
  top: 0;
  width: 100vw; height: 100vh;
  background: rgb(255, 255, 255, 0.5);
  z-index: 1000;
`;

const Rect = styled.div`
  width: 40px;
  height: 40px;
  background-color: #333;

  margin: 40vh auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;

  @-webkit-keyframes sk-rotateplane {
    0% { -webkit-transform: perspective(120px) }
    50% { -webkit-transform: perspective(120px) rotateY(180deg) }
    100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
  }
  
  @keyframes sk-rotateplane {
    0% { 
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) 
    } 50% { 
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) 
    } 100% { 
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
`;

const Loading: React.FunctionComponent = () => {
  return (
      <LoadingDiv>
          <Rect />
      </LoadingDiv>
  );
};

export default Loading;