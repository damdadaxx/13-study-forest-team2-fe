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

  const classNames = [styles.pointTag, styles[size], styles[color], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      <img src={iconSrc} alt="leaf icon" className={styles.pointIcon} />
      <span className={styles.pointNumber}>{displayPoint}P 획득</span>
    </div>
  );
}
