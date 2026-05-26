import { Outlet } from 'react-router-dom';

import Header from '../Header';

export default function MainLayout({ maxWidthType = 'md' }) {
  const maxWidthMap = {
    sm: 'max-w-[696px]', // 상세페이지
    md: 'max-w-[1200px]', // 스터디 상세, 홈
    lg: 'max-w-[1248px]', // 오늘의 집중, 오늘의 습관
  };

  const currentMaxWidth = maxWidthMap[maxWidthType] || maxWidthMap['md'];

  return (
    <div className="min-h-screen bg-[#F6F4EF] flex flex-col">
      <Header />

      <main
        className={`flex-1 w-full mx-auto ${currentMaxWidth} px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12`}
      >
        <Outlet />
      </main>
    </div>
  );
}
