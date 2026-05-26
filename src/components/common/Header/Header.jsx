import { Link } from 'react-router';

import Button from '@/components/common/Button/Button';
import styles from '@/components/common/Header/Header.module.css';

import forestLogo from '@/assets/images/icons/forest-logo.png';

export default function Header({ showButton = true }) {
  return (
    <header className={styles.forestHeader}>
      <div className={styles.headerContainer}>
        <Link to="/">
          <img
            src={forestLogo}
            alt="forest-logo"
            className={styles.forestLogo}
          />
        </Link>

        {showButton && (
          <div
            className={`${styles.mkBtnContainer} ${styles.mkStudyBtnContainer}`}
          >
            <Button text="스터디 만들기" href="/studies/new" />
          </div>
        )}
      </div>
    </header>
  );
}
