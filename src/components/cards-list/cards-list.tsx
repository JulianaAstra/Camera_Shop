import CardComponent from '../card/card';

function CardsListComponent(): JSX.Element {
  const cardList = Array.from({ length: 9 }, (_, index) => (
    <CardComponent key={index} />
  ));

  return (
    <div className="cards catalog__cards">
      {cardList}
    </div>
  );
}

export default CardsListComponent;
