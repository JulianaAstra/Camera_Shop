import { MouseEvent } from 'react';

function scrollToTop() {
  const scrollStep = -window.scrollY / (1000 / 30);
  const scrollInterval = setInterval(() => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStep);
    } else {
      clearInterval(scrollInterval);
    }
  }, 15);
}

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
