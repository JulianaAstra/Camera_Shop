
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getSimilarCards } from '../../store/app-data/selectors';
import { Card } from '../../types/card';
import CardComponent from '../card/card';
import { useState, useEffect } from 'react';
import SliderButtonsComponent from '../slider-buttons/slider-buttons';
import './style.css';

type SimilarProductsProps = {
  handleBuyClick: (cardIdValue: number | null) => void;
  cardId: number;
};

function SimilarProductsComponent({handleBuyClick, cardId}: SimilarProductsProps): JSX.Element {
  const similarCards: Card[] | null = useAppSelector(getSimilarCards);
  const [startIndex, setStartIndex] = useState(0);
  const cardsCount = similarCards?.length;

  const handlePrevSlide = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 3));
  };

  const handleNextSlide = () => {
    if (similarCards !== null && cardsCount) {
      setStartIndex((prevIndex) => Math.min(prevIndex + 3, cardsCount - 3));
    }
  };

  useEffect(() => {
    setStartIndex(0);
  }, [cardId]);

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list slide-enter slide-enter-active">
              {similarCards !== null ? similarCards
                .slice(startIndex, startIndex + 3)
                .map((card) => (
                  <CardComponent activeClass={'is-active animate'} handleClick={handleBuyClick} key={card.id} card={card}/>
                )) : ''}
            </div>
            <SliderButtonsComponent currentIndex={startIndex} totalSlides={cardsCount} prevBtnClickHandler={handlePrevSlide} nextBtnClickHandler={handleNextSlide}/>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SimilarProductsComponent;
