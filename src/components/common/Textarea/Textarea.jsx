import styles from '@/components/common/Textarea/Textarea.module.css';

export default function Textarea({
  className = '',
  label = '',
  id,
  value,
  onChange,
  placeholder = '',
  error = '',
  rows = 4,
  ...props
}) {
  const hasError = Boolean(error);
  const textareaClassNames = `${styles.textarea} ${hasError ? styles.error : ''}`;

  return (
    <div className={`${styles.field} ${className}`}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <textarea
        id={id}
        className={textareaClassNames}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={hasError}
        {...props}
      />

      {hasError && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
