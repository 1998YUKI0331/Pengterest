import { useEffect } from 'react';

const useOutsideClick = (ref: React.MutableRefObject<HTMLDivElement>, setFocus: (value: boolean) => void) => {
  useEffect(() => {
    function handleOutsideClick(event: React.BaseSyntheticEvent | MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {  // 컴포넌트 외부 클릭 시 search 창 안보여줌
        setFocus(false);
      }
    }
    document.addEventListener('click', handleOutsideClick, true);  // Component rendering 후 이벤트 등록
    return () => {  // Component 제거 시 이벤트 제거
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [ref]);
}

export default useOutsideClick;
