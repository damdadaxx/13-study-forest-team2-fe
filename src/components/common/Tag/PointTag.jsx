import styles from '@/components/common/Tag/PointTag.module.css';

import IcPointLarge from '@/assets/images/icons/ic_point_large.svg';
import IcPointSmall from '@/assets/images/icons/ic_point_small.svg';

export default function PointTag({
  className = '',
  point,
  size = 'large',
  variant = 'light', // dark | light
  ...props
}) {
  if (typeof point !== 'number' && typeof point !== 'string') return null;

  const numericPoint = Number(point);

  if (!Number.isFinite(numericPoint)) return null;

  const displayPoint = numericPoint.toLocaleString();
  const iconSrc = size === 'large' ? IcPointLarge : IcPointSmall;
  const classNames = [styles.pointTag, styles[size], styles[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      <img src={iconSrc} alt="" className={styles.pointIcon} />
      <span className={styles.pointNumber}>{displayPoint}P 획득</span>
    </div>
  );
}
