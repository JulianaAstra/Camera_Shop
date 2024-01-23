import { totalStars } from '../const';

type RateStarsProps = {
  rating: number;
  reviewCount: number;
}

function RateStarsComponent({rating, reviewCount}: RateStarsProps): JSX.Element {

  const renderStars = () =>
    Array.from({ length: totalStars }, (_, index) => (
      <svg
        key={index + 1}
        width={17}
        height={16}
        aria-hidden="true"
      >
        <use xlinkHref={index < rating ? '#icon-full-star' : '#icon-star'} />
      </svg>
    ));

  return (
    <div className="rate product-card__rate">
      {renderStars()}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>{reviewCount}
      </p>
    </div>
  );
}

export default RateStarsComponent;
