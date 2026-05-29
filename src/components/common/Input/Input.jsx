import styles from '@/components/common/Input/Input.module.css';

export default function Input({
  className = '',
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
  const inputClassNames = `${styles.input} ${hasError ? styles.error : ''} ${rightIcon ? styles.hasIcon : ''}`;

  return (
    <div className={`${styles.inputField} ${className}`}>
      <div className={styles.inputWrapper}>
        <input
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
