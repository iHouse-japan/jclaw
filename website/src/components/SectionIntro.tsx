type SectionIntroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
};

export function SectionIntro({eyebrow, title, intro}: SectionIntroProps) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}
