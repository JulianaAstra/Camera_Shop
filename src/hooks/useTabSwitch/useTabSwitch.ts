import { useEffect, RefObject } from 'react';


function useTabSwitch(isModalOpen: boolean, ref: RefObject<HTMLDivElement>, firstFocusedRef: RefObject<HTMLDivElement>) {

  useEffect(() => {

    if (isModalOpen && ref.current !== null) {

      const focusableElements = ref.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0] as HTMLElement | null;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLButtonElement | null;

      if (firstFocusedRef.current && firstFocusedRef.current.focus) {
        firstFocusedRef.current.focus();
      }

      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === firstElement && lastElement !== null) {
            event.preventDefault();
            lastElement.focus();
          } else {
            if (document.activeElement === lastElement && firstElement !== null) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);

      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [firstFocusedRef, isModalOpen, ref]);
}

export default useTabSwitch;
