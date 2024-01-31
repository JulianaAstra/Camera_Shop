import { MouseEvent } from 'react';
import { scrollToTop } from '../../utils';

function handleClick(e: MouseEvent) {
  e.preventDefault();
  scrollToTop();
}

function ScrollToTopBtnComponent(): JSX.Element {
  return (
    <a className="up-btn" href="#header" onClick={handleClick}>
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </a>
  );
}

export default ScrollToTopBtnComponent;
