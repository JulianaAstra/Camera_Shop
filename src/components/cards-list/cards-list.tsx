import CardComponent from '../card/card.tsx';
import { Card } from '../../types/card.ts';

type CardsListProps = {
  cards: Card[];
  handleBuyBtnClick: (cardId: number) => void;
}

function CardsListComponent({cards, handleBuyBtnClick}: CardsListProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {cards.map((card) => (
        <CardComponent
          key={card.id}
          card={card}
          handleClick={handleBuyBtnClick}
          activeClass={''}
        />))}
    </div>
  );
}

export default CardsListComponent;
