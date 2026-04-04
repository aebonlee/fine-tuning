import { Link } from 'react-router-dom';

export default function PageHeader({ icon, title, description, breadcrumbs, children }) {
  return (
    <div className="page-header">
      <div className="page-header-bg">
        <div className="container">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="page-header-breadcrumb">
              {breadcrumbs.map((crumb, i) => (
                <span key={i}>
                  {i > 0 && <span className="page-header-breadcrumb-sep">/</span>}
                  {crumb.to ? (
                    <Link to={crumb.to}>{crumb.label}</Link>
                  ) : (
                    <span className="page-header-breadcrumb-current">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <div className="page-header-content">
            {icon && (
              <div className="page-header-icon">
                <i className={`fa-solid ${icon}`} />
              </div>
            )}
            <div>
              <h1 className="page-header-title">{title}</h1>
              {description && <p className="page-header-desc">{description}</p>}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
