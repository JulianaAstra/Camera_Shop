import { getReviews } from '../../store/app-data/selectors';
import RateStarsComponent from '../../rate-stars/rate-stars';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch';
import { sortReviews } from '../../store/app-data/app-data';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { DateFormat } from '../../const';
import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Review } from '../../types/review';

type ReviewsListProps = {
  visibleReviews: Review[];
}

function ReviewsListComponent({visibleReviews}: ReviewsListProps): JSX.Element {

  dayjs.extend(localizedFormat);
  dayjs.locale('ru');

  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);

  useEffect(() => {
    if(reviews) {
      dispatch(sortReviews());
    }
  },[dispatch, reviews]);

  return (
    <ul className="review-block__list">
      {visibleReviews && visibleReviews.map(({ id, userName, advantage, disadvantage, review, rating, createAt }) => (
        <li key={id} className="review-card">
          <div className="review-card__head">
            <p className="title title--h4">{userName}</p>
            <time className="review-card__data" dateTime={dayjs(createAt).format(DateFormat.YEAR_MONTH_DAY)}>
              {dayjs(createAt).format(DateFormat.DAY_MONTH)}
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
