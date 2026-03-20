type Card = {
  title: string;
  body: string;
};

type CardGridProps = {
  cards: Card[];
  columns?: 'three' | 'two';
  variant?: 'default' | 'feature';
};

export function CardGrid({cards, columns = 'three', variant = 'default'}: CardGridProps) {
  return (
    <div className={columns === 'two' ? 'card-grid card-grid--two' : 'card-grid'}>
      {cards.map((card, index) => (
        <article key={card.title} className={variant === 'feature' ? 'card card--feature' : 'card'}>
          {variant === 'feature' ? (
            <div className="card__index">{String(index + 1).padStart(2, '0')}</div>
          ) : null}
          <h3>{card.title}</h3>
          <p>{card.body}</p>
        </article>
      ))}
    </div>
  );
}
