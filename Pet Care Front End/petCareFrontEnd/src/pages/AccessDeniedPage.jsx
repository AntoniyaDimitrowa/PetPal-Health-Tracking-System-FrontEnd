import styles from './GridLayout.module.css';
import typography from './Typography.module.css';


const AccessDeniedPage = () => {
  return (
    <div className={styles.pagePlusMessages} style={{ height: `100vh` }}>
      <div className={styles.pageContainer}>
        <h1 className={typography.title}>Access Denied!</h1>
        <p className={typography.p}>
          You are not authorized to access this page!
        </p>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
