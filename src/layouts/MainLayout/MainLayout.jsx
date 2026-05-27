import { Outlet } from 'react-router';

import Header from '@/components/common/Header/Header';

export default function MainLayout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}
