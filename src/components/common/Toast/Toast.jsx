import styles from './Toast.module.css';

export default function Toast({ type = 'success', message }) {
  let typeClass = '';

  if (type === 'success') {
    typeClass = styles.success;
  } else if (type === 'warning') {
    typeClass = styles.warning;
  }

  const toastClass = `${styles.toastContainer} ${typeClass}`;

  return (
    <div className={toastClass}>
      <span className={styles.message}>{message}</span>
    </div>
  );
}
