import { usePagination } from './pagination-context';
import { Link } from 'react-router-dom';

const PaginationComponent = ({pagesCount}) => {
  const { currentPage, setCurrentPage, prevPage, nextPage } = usePagination();

  const handlePageClick = (pageNumber) => {

    if (pageNumber > pagesCount) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > 1 && (
          <li className="pagination__item">
            <Link to='#' className="pagination__link pagination__link--text" onClick={prevPage}>
              Назад
            </Link>
          </li>
        )}

        {[currentPage - 1, currentPage, currentPage + 1].map((pageNumber) => (
          (pageNumber >= 1 && pageNumber <= pagesCount) &&
          <li key={pageNumber} className={`pagination__item ${pageNumber === currentPage ? 'active' : ''}`}>
            <Link to='#' className={`pagination__link ${pageNumber === currentPage ? 'pagination__link--active' : ''}`} onClick={() => handlePageClick(pageNumber)}>
              {pageNumber}
            </Link>
          </li>
        ))}

        {currentPage < pagesCount - 1 && (
          <li className="pagination__item">
            <Link to='#' className="pagination__link pagination__link--text" onClick={nextPage}>
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default PaginationComponent;