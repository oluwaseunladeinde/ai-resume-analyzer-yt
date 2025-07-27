export const SCORE_THRESHOLDS = {
    EXCELLENT: 69,
    GOOD: 49
} as const;

export const getScoreCategory = (score: number) => {
    if (score < 0 || score > 100) {
        throw new Error('Score must be a number between 0 and 100');
    }

    if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'excellent';
    if (score >= SCORE_THRESHOLDS.GOOD) return 'good';
    return 'poor';
};

export const getScoreStyles = (score: number) => {
    const category = getScoreCategory(score);
    return {
        gradient: category === 'excellent' ? 'from-green-100' :
            category === 'good' ? 'from-yellow-100' : 'from-red-100',
        icon: category === 'excellent' ? '/icons/ats-good.svg' :
            category === 'good' ? '/icons/ats-warning.svg' : '/icons/ats-bad.svg',
        subtitle: category === 'excellent' ? 'Great Job!' :
            category === 'good' ? 'Good Start' : 'Needs Improvement'
    };
};