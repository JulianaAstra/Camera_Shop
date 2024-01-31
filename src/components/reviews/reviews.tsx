import ReviewsListComponent from '../reviews-list/reviews-list';
import { useState, useEffect, RefObject, useCallback } from 'react';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getSortedReviews } from '../../store/app-data/selectors';
import { memo } from 'react';

type ReviewsProps = {
  bottomBoundaryRef: RefObject<HTMLDivElement>;
}

function ReviewsComponent({bottomBoundaryRef}: ReviewsProps): JSX.Element {

  const sortedReviews = useAppSelector(getSortedReviews);
  const [visibleReviews, setVisibleReviews] = useState(sortedReviews ? sortedReviews.slice(0, 3) : []);

  useEffect(() => {
    if(sortedReviews) {
      setVisibleReviews(sortedReviews.slice(0, 3));
    }
  },[sortedReviews]);

  const handleShowMoreReviews = useCallback(() => {
    if(sortedReviews) {
      const newVisibleReviews = sortedReviews.slice(0, visibleReviews.length + 3);
      setVisibleReviews(newVisibleReviews);
    }
  }, [sortedReviews, visibleReviews]);

  useEffect(() => {
    const handleScroll = () => {
      if (bottomBoundaryRef.current) {
        const { top } = bottomBoundaryRef.current.getBoundingClientRect();
        if (top <= window.innerHeight) {
          handleShowMoreReviews();
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [bottomBoundaryRef, handleShowMoreReviews, visibleReviews]);


  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">
                Оставить свой отзыв
            </button>
          </div>
          <ReviewsListComponent visibleReviews={visibleReviews} />
          <div className="review-block__buttons">
            {sortedReviews && visibleReviews && visibleReviews.length < sortedReviews.length && (
              <button className="btn btn--purple" type="button" onClick={handleShowMoreReviews}>Показать больше отзывов</button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export const Reviews = memo(ReviewsComponent);

