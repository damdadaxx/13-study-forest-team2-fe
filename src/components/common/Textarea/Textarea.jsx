import Label from '@/components/common/Label/Label';
import styles from '@/components/common/Textarea/Textarea.module.css';

export default function Textarea({
  className = '',
  label = '',
  value,
  onChange,
  placeholder = '',
  error = '',
  ...props
}) {
  const hasError = Boolean(error);
  const textareaClassNames = `${styles.textarea} ${hasError ? styles.error : ''}`;

  return (
    <Label text={label} className={className}>
      <textarea
        className={textareaClassNames}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={hasError ? 'error-message' : undefined}
        {...props}
      />

      {hasError && (
        <p id="error-message" className={styles.errorMessage}>
          {error}
        </p>
      )}
    </Label>
  );
}
