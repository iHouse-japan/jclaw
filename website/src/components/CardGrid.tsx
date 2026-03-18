type Card = {
  title: string;
  body: string;
};

type CardGridProps = {
  cards: Card[];
  columns?: 'three' | 'two';
};

export function CardGrid({cards, columns = 'three'}: CardGridProps) {
  return (
    <div className={columns === 'two' ? 'card-grid card-grid--two' : 'card-grid'}>
      {cards.map((card) => (
        <article key={card.title} className="card">
          <h3>{card.title}</h3>
          <p>{card.body}</p>
        </article>
      ))}
    </div>
  );
}
