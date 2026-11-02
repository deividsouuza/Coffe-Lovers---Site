import type { ComponentProps, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './Action.module.css';

type ActionStyle = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  icon?: 'arrow-right' | 'arrow-up';
};

type ActionProps = ActionStyle & (
  | (ComponentProps<'a'> & { href: string })
  | (ComponentProps<'button'> & { href?: never })
);

/** Âncoras navegam; botões alteram o estado da interface. */
export function Action({ children, variant = 'primary', icon = 'arrow-right', ...props }: ActionProps) {
  const className = [styles.action, styles[variant], props.className].filter(Boolean).join(' ');
  const content = <>{children}<Icon name={icon} className={styles.icon} /></>;

  if ('href' in props && props.href !== undefined) {
    const { className: _className, ...linkProps } = props;
    return <a {...linkProps} className={className}>{content}</a>;
  }

  const { className: _className, ...buttonProps } = props;
  return <button type="button" {...buttonProps} className={className}>{content}</button>;
}
