import styles from '@/components/common/Textarea/Textarea.module.css';

export default function Textarea({
  className = '',
  value,
  onChange,
  placeholder = '',
  error = '',
  ...props
}) {
  const hasError = Boolean(error);
  const textareaClassNames = `${styles.textarea} ${hasError ? styles.error : ''}`;

  return (
    <div className={`${styles.textareaWrapper} ${className}`}>
      <textarea
        className={textareaClassNames}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={hasError}
        {...props}
      />

      {hasError && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
