type Metric = {
  label: string;
  value: string;
};

type StatusItem = {
  name: string;
  state: string;
};

type SignalCard = {
  title: string;
  body: string;
  tone?: 'brand' | 'indigo' | 'neutral';
};

type HeroPreviewProps = {
  eyebrow: string;
  title: string;
  body: string;
  metrics: Metric[];
  workflowLabel: string;
  workflowSteps: string[];
  statusLabel: string;
  statusItems: StatusItem[];
  signalCards: SignalCard[];
};

export function HeroPreview({
  eyebrow,
  title,
  body,
  metrics,
  workflowLabel,
  workflowSteps,
  statusLabel,
  statusItems,
  signalCards
}: HeroPreviewProps) {
  return (
    <aside className="hero-preview">
      <div className="hero-preview__frame">
        <div className="hero-preview__header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
          <p>{body}</p>
        </div>

        <div className="hero-preview__metrics">
          {metrics.map((metric) => (
            <article key={metric.label} className="hero-preview__metric">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>

        <div className="hero-preview__workspace">
          <section className="hero-preview__workflow">
            <div className="hero-preview__section-head">
              <span>{workflowLabel}</span>
            </div>
            <ol>
              {workflowSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="hero-preview__status">
            <div className="hero-preview__section-head">
              <span>{statusLabel}</span>
            </div>
            <div className="hero-preview__status-list">
              {statusItems.map((item) => (
                <div key={item.name} className="hero-preview__status-item">
                  <strong>{item.name}</strong>
                  <span>{item.state}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="hero-preview__signals">
          {signalCards.map((card) => (
            <article
              key={card.title}
              className={
                card.tone === 'brand'
                  ? 'hero-preview__signal hero-preview__signal--brand'
                  : card.tone === 'indigo'
                    ? 'hero-preview__signal hero-preview__signal--indigo'
                    : 'hero-preview__signal'
              }
            >
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
