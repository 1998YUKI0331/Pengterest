import { useState, useEffect, useRef, ReactChild } from 'react';
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
`;

const Masonry = (props) => {
  const [columns, setColumns] = useState(1);
  const MasonryRef = useRef<HTMLDivElement>(null);

  const onResize = () => {
    const curColumns = getColumns(MasonryRef.current?.offsetWidth);
    if(curColumns !== columns){
      setColumns(curColumns);   
    }
  }

  const getColumns = (w) => {
    return props.brakePoints.reduceRight((p, c, i) => {
      return c < w ? p : i;
    }, props.brakePoints.length) + 1;
  }

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
  }, []);
   
  const mapChildren = () => {
    let col = [] as any;
    const numC = columns;
    for(let i = 0; i < numC; i++){
      col.push([""]);
    }
    return props.children.reduce((p,c,i) => {
      p[i%numC].push(c);
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