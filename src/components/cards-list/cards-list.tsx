import CardComponent from '../card/card';
import { Card } from '../../types/card';

type CardsListProps = {
  cards: Card[];
}

function CardsListComponent({cards}: CardsListProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {cards.map((card) => <CardComponent key={card.id} card={card}/>)}
    </div>
  );
}

export default CardsListComponent;
