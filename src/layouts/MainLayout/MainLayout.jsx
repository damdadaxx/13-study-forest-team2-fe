import { Outlet } from 'react-router';

import styles from './MainLayout.module.css';

export default function MainLayout({ size = 'md' }) {
  const classNames = `${styles.layoutMain} ${styles[size]}`;

  return (
    <div className={styles.layoutContainer}>
      {/* Header 추가 예정 */}
      <main className={classNames}>
        <Outlet />
      </main>
    </div>
  );
}
