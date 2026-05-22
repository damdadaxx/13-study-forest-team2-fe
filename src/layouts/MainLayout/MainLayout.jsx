import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <main>
      {/* TODO: <Header /> 추가 예정 */}
      <Outlet />
    </main>
  );
}
