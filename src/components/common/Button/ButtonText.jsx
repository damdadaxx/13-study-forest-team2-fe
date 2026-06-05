import clsx from 'clsx';

import styles from '@/components/common/Button/ButtonText.module.css';

export default function ButtonText({
  className = '',
  color = 'green', // green, gray
  text = '',
  onClick,
  ...props
}) {
  const classNames = clsx(
    styles.button, //기본 클래스
    styles[color], // 색상에 따른 클래스
    className, // 페이지 내에서 적용하는 클래스
  );

  return (
    <button className={classNames} onClick={onClick} {...props}>
      <p className={styles.text}>{text}</p>
    </button>
  );
}
