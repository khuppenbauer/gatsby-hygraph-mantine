import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

interface LinkProps {
  children: React.ReactNode;
  to: string;
  activeClassName?: string;
  partiallyActive?: boolean;
  className?: string;
}

function Link({ children, to, activeClassName, partiallyActive, ...other }: LinkProps) {
  const internal = /^\/(?!\/)/.test(to);
  if (internal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    );
  }
  return (
    <a href={to} {...other} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default Link;
