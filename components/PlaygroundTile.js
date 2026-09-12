export default function PlaygroundTile({ item }) {
  return (
    <div className="tile">
      <div className="glyph">{item.glyph}</div>
      <h4>{item.title}</h4>
      <p>{item.body}</p>
      {item.resources?.length > 0 && (
        <ul className="resource-links">
          {item.resources.map((resource) => (
            <li key={resource.url}>
              <a href={resource.url}>
                <span className="resource-name">{resource.name} <span aria-hidden="true">↗</span></span>
                <span className="resource-description">{resource.description}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
