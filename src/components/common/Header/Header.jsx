import { Link, useLocation } from 'react-router';

import Button from '@/components/common/Button/Button';
import styles from '@/components/common/Header/Header.module.css';

import forestLogo from '@/assets/images/icons/forest-logo.png';

export default function Header() {
  const { pathname } = useLocation();
  const hideButton = pathname === '/studies/new';

  return (
    <header className={styles.forestHeader}>
      <div className={styles.container}>
        <Link to="/">
          <img
            src={forestLogo}
            alt="공부의 숲 로고 이미지"
            className={styles.forestLogo}
          />
        </Link>

        {!hideButton && (
          <Button text="스터디 만들기" size="sm" href="/studies/new" />
        )}
      </div>
    </header>
  );
}
