import { Link } from 'react-router-dom';

export default function PageHeader({ icon, title, description, breadcrumbs, children }) {
  return (
    <div className="page-header">
      <div className="page-header-bg">
        {/* Decorative mesh pattern */}
        <div className="page-header-deco">
          <div className="page-header-orb page-header-orb-1" />
          <div className="page-header-orb page-header-orb-2" />
          <div className="page-header-orb page-header-orb-3" />
          <div className="page-header-grid-lines" />
        </div>

        <div className="container">
          <div className="page-header-inner">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="page-header-breadcrumb">
                {breadcrumbs.map((crumb, i) => (
                  <span key={i}>
                    {i > 0 && <span className="page-header-breadcrumb-sep"><i className="fa-solid fa-chevron-right" /></span>}
                    {crumb.to ? (
                      <Link to={crumb.to}>{crumb.label}</Link>
                    ) : (
                      <span className="page-header-breadcrumb-current">{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            {icon && (
              <div className="page-header-icon">
                <i className={`fa-solid ${icon}`} />
              </div>
            )}

            <h1 className="page-header-title">{title}</h1>
            {description && <p className="page-header-desc">{description}</p>}
            {children && <div className="page-header-extra">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
