type TrustItem = {
  title: string;
  body: string;
};

type TrustStripProps = {
  items: TrustItem[];
};

export function TrustStrip({items}: TrustStripProps) {
  return (
    <div className="trust-strip">
      {items.map((item) => (
        <article key={item.title} className="trust-strip__item">
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}
