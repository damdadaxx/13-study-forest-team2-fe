import { useState } from 'react';

import clsx from 'clsx';

import styles from '@/components/common/Input/Input.module.css';
import Label from '@/components/common/Label/Label';

import visibilityOff from '@/assets/images/icons/ic_visibility_off.svg';
import visibilityOn from '@/assets/images/icons/ic_visibility_on.svg';

export default function Input({
  className = '',
  label = '',
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const hasError = Boolean(error);
  const inputClassNames = clsx(
    styles.input, // 기본 클래스
    hasError && styles.error, // 에러 상태일 때 적용되는 스타일
    type === 'password' && styles.hasIcon, // 패스워드 사용 시 오른쪽 아이콘 적용되는 스타일
  );

  return (
    <Label text={label} className={className}>
      <div className={styles.inputWrapper}>
        <input
          className={inputClassNames}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? 'error-message' : undefined}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <img
              src={showPassword ? visibilityOn : visibilityOff}
              alt={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              width={24}
              height={24}
            />
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
