import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getReviews } from '../../store/app-data/selectors';
import RateStarsComponent from '../../rate-stars/rate-stars';

function ReviewsListComponent(): JSX.Element {
  const reviews = useAppSelector(getReviews);

  return (
    <ul className="review-block__list">
      {reviews && reviews.map(({id, userName, advantage, disadvantage, review, rating, createAt}) => (
        <li key={id} className="review-card">
          <div className="review-card__head">
            <p className="title title--h4">{userName}</p>
            <time className="review-card__data" dateTime={createAt}>
              {createAt}
            </time>
          </div>
          <RateStarsComponent rating={rating} reviewCount={0}/>
          <ul className="review-card__list">
            <li className="item-list">
              <span className="item-list__title">Достоинства:</span>
              <p className="item-list__text">
                {advantage}
              </p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Недостатки:</span>
              <p className="item-list__text">
                {disadvantage}
              </p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Комментарий:</span>
              <p className="item-list__text">
                {review}
              </p>
            </li>
          </ul>
        </li>))}
    </ul>
  );
}

export default ReviewsListComponent;
