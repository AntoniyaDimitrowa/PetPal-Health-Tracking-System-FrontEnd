import styles from './HealthTrackingPage.module.css';
import typography from './Typography.module.css';

const FutureFeaturePage = () => {
    return (
        <div className={styles.healthTrackingPage}>
            <h1 className={typography.title}>Exciting Things Are Coming!</h1>
            <p className={typography.p}>
                We're working hard to bring you this feature soon! Stay tuned for updates as we continue to enhance your experience.
            </p>
        </div>
    );
};

export default FutureFeaturePage;