import clsx from 'clsx';

import styles from '@/components/common/Input/Input.module.css';
import Label from '@/components/common/Label/Label';

export default function Input({
  className = '',
  label = '',
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  rightIcon,
  onRightIconClick,
  ...props
}) {
  const hasError = Boolean(error);
  const inputClassNames = clsx(
    styles.input, // 기본 클래스
    hasError && styles.error, // 에러 상태일 때 적용되는 스타일
    rightIcon && styles.hasIcon, // 오른쪽 아이콘이 있을 때 적용되는 스타일
  );

  return (
    <Label text={label} className={className}>
      <div className={styles.inputWrapper}>
        <input
          className={inputClassNames}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? 'error-message' : undefined}
          {...props}
        />
        {rightIcon && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </button>
        )}
      </div>
      {hasError && (
        <p id="error-message" className={styles.errorMessage}>
          {error}
        </p>
      )}
    </Label>
  );
}
