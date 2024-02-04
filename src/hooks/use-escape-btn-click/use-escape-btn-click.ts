import { useEffect } from 'react';

function useEscapeBtnClick(clickHandler: () => void) {
  useEffect(() => {
    const handleEscapeKeyPress = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        clickHandler();
      }
    };
    document.addEventListener('keydown', (evt) => handleEscapeKeyPress(evt));
    return () => {
      document.removeEventListener('keydown', (evt) => handleEscapeKeyPress(evt));
    };
  }, [clickHandler]);
}

export default useEscapeBtnClick;
