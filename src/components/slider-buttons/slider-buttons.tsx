type SliderButtonsProps = {
  prevBtnClickHandler: () => void;
  nextBtnClickHandler: () => void;
  currentIndex: number;
  totalSlides: number | undefined;
}

function SliderButtonsComponent({prevBtnClickHandler, nextBtnClickHandler, totalSlides, currentIndex}: SliderButtonsProps): JSX.Element {
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = totalSlides !== undefined ? currentIndex >= totalSlides - 3 : true;

  return (
    <>
      <button
        onClick={prevBtnClickHandler}
        className="slider-controls slider-controls--prev"
        type="button"
        aria-label="Предыдущий слайд"
        disabled={isFirstSlide}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
      <button
        onClick={nextBtnClickHandler}
        className="slider-controls slider-controls--next"
        type="button"
        aria-label="Следующий слайд"
        disabled={isLastSlide}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </>
  );
}

export default SliderButtonsComponent;
