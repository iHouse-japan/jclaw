type BulletListProps = {
  items: string[];
};

export function BulletList({items}: BulletListProps) {
  return (
    <ul className="bullet-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
