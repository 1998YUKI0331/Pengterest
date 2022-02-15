import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled'

const MasonryDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: stretch;
  width: 100%;
  margin: auto;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: stretch;
  flex-grow: 1;
  width: 10px;
`;

interface MasonryProps {
  brakePoints: number[];
  children: any;  //any 타입 나중에 수정
}

const Masonry: React.FunctionComponent<MasonryProps> = (props) => {
  const [columns, setColumns] = useState<number>(1);
  const MasonryRef = useRef<HTMLDivElement>(null);

  const onResize = () => {
    if (MasonryRef.current?.offsetWidth) { // number | undefined
      const curColumns: number = getColumns(MasonryRef.current?.offsetWidth);
      curColumns !== columns ? setColumns(curColumns) : null;
    }
  }

  const getColumns = (w: number) => {
    return props.brakePoints.reduceRight((p: number, c: number, i: number) => {
      return c < w ? p : i;
    }, props.brakePoints.length) + 1;
  }

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
  }, []);
   
  const mapChildren = () => {
    let col = [] as any;
    for (let i = 0; i < columns; i++) {
      col.push([]);
    }
    return props.children.reduce((p: number, c: number, i: number) => {
      p[i % columns].push(c);
      return p;
    }, col);
   }
   
  return (
    <MasonryDiv ref={MasonryRef}>
      {mapChildren().map((col, ci) => {
        return (
          <Column key={ci} >
            {col.map((child, i) => {
              return <div key={i}>{child}</div>
            })}
          </Column>
        )
      })}
    </MasonryDiv>
  )
}

export default Masonry;