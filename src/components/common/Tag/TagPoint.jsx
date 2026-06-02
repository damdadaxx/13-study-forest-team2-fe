import clsx from 'clsx';

import styles from '@/components/common/Tag/TagPoint.module.css';

import IcPointLg from '@/assets/images/icons/ic_point_lg.svg';
import IcPointSm from '@/assets/images/icons/ic_point_sm.svg';

export default function TagPoint({
  className = '',
  point = 0,
  size = 'lg',
  color = 'light',
  ...props
}) {
  const pointNum = Number(point);
  const numericPoint = !isNaN(pointNum) ? pointNum : undefined;
  const displayPoint = numericPoint?.toLocaleString();

  const iconSrc = size === 'lg' ? IcPointLg : IcPointSm;

  const classNames = clsx(
    styles.pointTag, // 기본 클래스
    styles[size], // size에 따른 스타일 (예: styles.lg, styles.sm)
    styles[color], // color에 따른 스타일 (예: styles.light, styles.dark)
    className, // 사용하는 페이지 내에서 적용하는 클래스네임
  );

  return (
    <div className={classNames} {...props}>
      <img src={iconSrc} alt="leaf icon" className={styles.pointIcon} />
      <span className={styles.pointNumber}>{displayPoint}P 획득</span>
    </div>
  );
}
