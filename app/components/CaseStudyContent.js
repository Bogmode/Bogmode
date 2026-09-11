import PhotoFrame from "@/components/PhotoFrame";

function DetailSection({ eyebrow, title, children }) {
  if (!children) return null;

    return (
        <section className="case-section">
              <p className="eyebrow">{eyebrow}</p>
                    <h2>{title}</h2>
                          <div className="case-copy">{children}</div>
                              </section>
                                );
                                }

                                export default function CaseStudyContent({ sys }) {
                                  const hasExpandedContent = Boolean(
                                      sys.role ||
                                            sys.scope ||
                                                  sys.heroImage ||
                                                        sys.context ||
                                                              sys.problem ||
                                                                    sys.approach ||
                                                                          sys.system ||
                                                                                sys.results?.length ||
                                                                                      sys.gallery?.length
                                                                                        );

                                                                                          if (!hasExpandedContent) return null;

                                                                                            return (
                                                                                                <div className="case-study-content">
                                                                                                      {(sys.role || sys.scope) && (
                                                                                                              <section className="case-facts" aria-label="Project facts">
                                                                                                                        {sys.role && <div><span>Role</span><p>{sys.role}</p></div>}
                                                                                                                                  {sys.scope && <div><span>Scope</span><p>{sys.scope}</p></div>}
                                                                                                                                          </section>
                                                                                                                                                )}

                                                                                                                                                      {sys.heroImage && (
                                                                                                                                                              <PhotoFrame src={sys.heroImage} alt={sys.title} ratio="16 / 9" label="System artifact" />
                                                                                                                                                                    )}

                                                                                                                                                                          <DetailSection eyebrow="Context" title="What was happening">{sys.context}</DetailSection>
                                                                                                                                                                                <DetailSection eyebrow="Problem" title="What needed to change">{sys.problem}</DetailSection>
                                                                                                                                                                                      <DetailSection eyebrow="Build" title="How I designed the system">{sys.approach}</DetailSection>
                                                                                                                                                                                            <DetailSection eyebrow="System" title="What now exists">{sys.system}</DetailSection>

                                                                                                                                                                                                  {sys.results?.length > 0 && (
                                                                                                                                                                                                          <section className="case-section case-results">
                                                                                                                                                                                                                    <p className="eyebrow">Evidence</p>
                                                                                                                                                                                                                              <h2>What changed</h2>
                                                                                                                                                                                                                                        <div className="result-grid">
                                                                                                                                                                                                                                                    {sys.results.map((result, index) => (
                                                                                                                                                                                                                                                                  <div className="result-card" key={index}>
                                                                                                                                                                                                                                                                                  <strong>{result.value}</strong>
                                                                                                                                                                                                                                                                                                  <span>{result.label}</span>
                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                            ))}
                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                              </section>
                                                                                                                                                                                                                                                                                                                                                    )}

                                                                                                                                                                                                                                                                                                                                                          {sys.gallery?.length > 0 && (
                                                                                                                                                                                                                                                                                                                                                                  <section className="case-gallery" aria-label="Project artifacts">
                                                                                                                                                                                                                                                                                                                                                                            {sys.gallery.map((image, index) => (
                                                                                                                                                                                                                                                                                                                                                                                        <PhotoFrame key={image} src={image} alt={sys.title + " artifact " + (index + 1)} ratio="4 / 3" label={"Artifact " + String(index + 1).padStart(2, "0")} />
                                                                                                                                                                                                                                                                                                                                                                                                  ))}
                                                                                                                                                                                                                                                                                                                                                                                                          </section>
                                                                                                                                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                                                      