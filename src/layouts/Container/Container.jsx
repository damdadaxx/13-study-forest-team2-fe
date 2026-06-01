import { useLocation } from 'react-router';

import styles from '@/layouts/Container/Container.module.css';

import { CONTAINER_RULES } from '@/constants/constants.js';

export default function Container({ className, children }) {
  const location = useLocation();
  const size =
    CONTAINER_RULES.find((rule) => rule.pattern.test(location.pathname))
      ?.size || 'md';

  const classNames = `${styles.container} ${styles[size]} ${className}`;

  return (
    <section className={classNames}>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
