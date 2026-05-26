import { Outlet } from 'react-router';

import './MainLayout.css';

export default function MainLayout({ maxWidthType = 'md' }) {
  const maxWidthMap = {
    sm: 'layoutSm', // 상세페이지
    md: 'layoutMd', // 스터디 상세, 홈
    lg: 'layoutLg', // 오늘의 집중, 오늘의 습관
  };

  const currentMaxWidth = maxWidthMap[maxWidthType] || maxWidthMap.md;

  return (
    <div className="layoutContainer">
      {/* Header  */}

      <main className={`layoutMain ${currentMaxWidth}`}>
        <Outlet />
      </main>
    </div>
  );
}
