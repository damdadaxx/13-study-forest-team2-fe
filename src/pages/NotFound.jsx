import { useNavigate } from 'react-router';

import styles from '@/pages/NotFound.module.css';

import Button from '@/components/common/Button/Button';

import Logo from '@/assets/images/icons/forest-logo.png';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>
        <img src={Logo} alt="스터디 포레스트" height={48} />
      </div>

      <p className={styles.code}>404</p>
      <p className={styles.msg}>페이지를 찾을 수 없어요</p>
      <p className={styles.sub}>
        요청하신 페이지가 존재하지 않거나 이동되었습니다
      </p>

      <Button
        text="홈으로 돌아가기"
        className={styles.btn}
        onClick={() => navigate('/')}
      />
    </div>
  );
}
