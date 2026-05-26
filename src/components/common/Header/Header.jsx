import { Link } from 'react-router';

import Button from '@/components/common/Button/Button';
import styles from '@/components/common/Header/Header.module.css';

import forestLogo from '@/assets/images/icons/forest-logo.png';

export default function Header({ showButton = true }) {
  return (
    <header className={styles['forest-header']}>
      <Link to="/">
        <img
          src={forestLogo}
          alt="forest-logo"
          className={styles['forest-logo']}
        />
      </Link>
      {showButton && (
        <Link to="/studies/new">
          <Button
            className={styles['mk-study-btn']}
            width="252px"
            text="스터디만들기"
          />
        </Link>
      )}
    </header>
  );
}
