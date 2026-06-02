import clsx from 'clsx';

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
  const textareaClassNames = clsx(
    styles.textarea, // 기본 클래스
    hasError && styles.error, //에러가 있을 때만 붙는 클래스
    className, // 페이지 내에서 지정한 클래스
  );

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
