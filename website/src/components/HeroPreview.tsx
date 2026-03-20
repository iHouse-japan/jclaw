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
        <div className="hero-preview__toolbar">
          <div className="hero-preview__toolbar-brand">
            <span className="hero-preview__toolbar-dot" />
            <strong>JClaw</strong>
            <span>Operator Console</span>
          </div>

          <div className="hero-preview__toolbar-badges">
            {metrics.map((metric) => (
              <span key={metric.label} className="hero-preview__toolbar-badge">
                <small>{metric.label}</small>
                <strong>{metric.value}</strong>
              </span>
            ))}
          </div>
        </div>

        <div className="hero-preview__header">
          <div className="hero-preview__summary">
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        </div>

        <div className="hero-preview__workspace">
          <section className="hero-preview__workflow">
            <div className="hero-preview__section-head">
              <span>{workflowLabel}</span>
            </div>
            <div className="hero-preview__steps">
              {workflowSteps.map((step, index) => (
                <article key={step} className="hero-preview__step">
                  <span className="hero-preview__step-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p>{step}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="hero-preview__status">
            <div className="hero-preview__section-head">
              <span>{statusLabel}</span>
            </div>
            <div className="hero-preview__status-list">
              {statusItems.map((item) => (
                <div key={item.name} className="hero-preview__status-item">
                  <div className="hero-preview__status-copy">
                    <strong>{item.name}</strong>
                  </div>
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
