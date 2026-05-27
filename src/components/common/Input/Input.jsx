import styles from '@/components/common/Input/Input.module.css';

export default function Input({
  className = '',
  label = '',
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '', // 에러 메시지 문자열. 있으면 에러 스타일 + 메시지 노출
  rightIcon, // 우측 아이콘 노드 (예: 비밀번호 토글). 없으면 미노출
  onRightIconClick,
  ...props
}) {
  const hasError = Boolean(error);
  const inputClassNames = `${styles.input} ${hasError ? styles.error : ''} ${rightIcon ? styles.hasIcon : ''}`;

  return (
    <div className={`${styles.field} ${className}`}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          id={id}
          className={inputClassNames}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={hasError}
          {...props}
        />
        {rightIcon && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={onRightIconClick}
            tabIndex={-1}
          >
            {rightIcon}
          </button>
        )}
      </div>

      {hasError && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
