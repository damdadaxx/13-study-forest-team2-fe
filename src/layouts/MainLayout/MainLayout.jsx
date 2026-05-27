import { Outlet } from 'react-router';

import styles from '@/layouts/MainLayout/MainLayout.module.css';

export default function MainLayout() {
  return (
    <div className={styles.mainLayout}>
      {/* Header */}
      <Outlet />
    </div>
  );
}
