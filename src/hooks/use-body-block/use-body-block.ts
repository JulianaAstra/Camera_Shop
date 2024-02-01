import { useEffect } from 'react';

type Value = number | boolean | null;

function useBodyBlock(value: Value) {
  useEffect(() => {
    switch (typeof value) {
      case 'number':
        document.body.classList.add('modal-open');
        return () => {
          document.body.classList.remove('modal-open');
        };
      case 'boolean':
        if(value) {
          document.body.classList.add('modal-open');
        }
        return () => {
          document.body.classList.remove('modal-open');
        };
      default:
        break;
    }
  }, [value]);
}

export default useBodyBlock;
