import styles from '@/components/common/Button/ButtonControllerCircle.module.css';

import IcPause from '@/assets/images/icons/ic_pause.svg';
import IcRestart from '@/assets/images/icons/ic_restart.svg';

export default function ButtonControllerCircle({
  className = '',
  variant = 'primary', // primary: 리셋 버튼, secondary: 정지 버튼
  color = 'brand', // brand, gray, green
  onClick,
  ...props
}) {
  const classNames = `${styles.button} ${styles[color]} ${className}`;

  return (
    <button
      className={classNames}
      type="button"
      onClick={onClick}
      aria-label={`${variant === 'primary' ? '리셋 버튼' : '정지 버튼'}`}
      {...props}
    >
      <img
        className={styles.icon}
        src={variant === 'primary' ? IcRestart : IcPause}
        alt={`${variant === 'primary' ? '리셋 버튼' : '정지 버튼'} 아이콘`}
      />
    </button>
  );
}
