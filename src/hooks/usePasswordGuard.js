import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

export function usePasswordGuard(redirectTo = '/') {
  const location = useLocation();
  const navigate = useNavigate();

  const [password] = useState(() => location.state?.password ?? null);

  // 진입 직후 히스토리 엔트리에서 password 제거 (뒤로가기 재진입 차단)
  useEffect(() => {
    if (location.state?.password) {
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // password 없으면 상세페이지로
  // 정상 진입은 통과, 재진입/새로고침은 차단
  useEffect(() => {
    if (!password) {
      navigate(redirectTo, { replace: true, state: { denied: true } });
    }
  }, [password, navigate, redirectTo]);

  return password;
}
