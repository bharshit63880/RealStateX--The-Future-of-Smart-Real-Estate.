import { Link } from 'react-router-dom';

import { cn } from '@utils/cn.js';

export function ButtonLink({ children, className, ...props }) {
  return (
    <Link className={cn('button-link', className)} {...props}>
      {children}
    </Link>
  );
}
