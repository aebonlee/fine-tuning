import { Link } from 'react-router-dom';

export default function PageHeader({ icon, title, description, breadcrumbs, children }) {
  return (
    <div className="page-header">
      <div className="container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="page-header-breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={i}>
                {i > 0 && <span>/</span>}
                {crumb.to ? (
                  <Link to={crumb.to}>{crumb.label}</Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        <div className="page-header-inner">
          {icon && (
            <div className="page-header-icon">
              <i className={`fa-solid ${icon}`} />
            </div>
          )}
          <div>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
