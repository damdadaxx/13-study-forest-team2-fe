import { Outlet } from 'react-router';

import styles from '@/layouts/MainLayout/MainLayout.module.css';

import Header from '@/components/common/Header/Header';

export default function MainLayout() {
  return (
    <main className={styles.mainLayout}>
      <Header />
      <Outlet />
    </main>
  );
}
