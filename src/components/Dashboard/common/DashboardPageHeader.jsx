import React from "react";

export default function DashboardPageHeader({
  icon: Icon,
  title,
  subtitle,
  badges = [],
  actions,
}) {
  const renderIcon = () => {
    if (!Icon) return null;
    if (React.isValidElement(Icon)) return Icon;
    if (typeof Icon === "function" || typeof Icon === "object") {
      const Component = Icon;
      return <Component className="text-active w-5 h-5" />;
    }
    return null;
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 bg-white dark:bg-[#070F2B] p-5 sm:p-6 rounded-2xl border border-brand-500/15 shadow-xs w-full">
      <div className="flex items-start sm:items-center gap-4 min-w-0">
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-active/10 border border-active/30 flex items-center justify-center shrink-0">
            {renderIcon()}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-foreground tracking-tight truncate">
            {title}
          </h1>
          {(subtitle || badges.length > 0) && (
            <div className="flex flex-wrap items-center gap-2.5 mt-1 font-['Inter'] text-xs text-[#535C91] dark:text-[#9290C3]">
              {subtitle && <span>{subtitle}</span>}
              {badges.map((badge, idx) => (
                <React.Fragment key={idx}>
                  <span>•</span>
                  <span>{badge}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
