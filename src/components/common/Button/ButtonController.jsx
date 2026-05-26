import styles from '@/components/common/Button/ButtonController.module.css';

import IcPlay from '@/assets/images/icons/ic_play.svg';
import IcStop from '@/assets/images/icons/ic_stop.svg';

export default function ButtonController({
  className = '',
  variant = 'primary', // primary: 시작 버튼, secondary: 정지 버튼
  color = 'brand', // brand, gray
  disabled = false,
  onClick,
  ...props
}) {
  const classNames = `${styles.button} ${styles[color]} ${className}`;

  return (
    <button
      className={classNames}
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={`${variant === 'primary' ? '재생 버튼' : '정지 버튼'}`}
      {...props}
    >
      <img
        className={styles.icon}
        src={variant === 'primary' ? IcPlay : IcStop}
        alt={`${variant === 'primary' ? '재생 버튼' : '정지 버튼'} 아이콘`}
      />
      <p className={styles.text}>
        {variant === 'primary' ? 'start!' : 'stop!'}
      </p>
    </button>
  );
}
