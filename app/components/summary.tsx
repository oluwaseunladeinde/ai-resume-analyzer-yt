import ScoreBadge from "~/components/score-badge";
import ScoreGauge from "~/components/score-gauge";

import { SCORE_THRESHOLDS } from "~/lib/score-utils";

interface CategoryProps {
  title: string;
  score: number;
}

const FEEDBACK_CATEGORIES = [
    { key: "toneAndStyle", title: "Tone & Style" },
    { key: "content",       title: "Content" },
    { key: "structure",     title: "Structure" },
    { key: "skills",        title: "Skills" }
] as const;

const Category = ({ title, score }: CategoryProps) => {
    const textColor = score > SCORE_THRESHOLDS.EXCELLENT ? 'text-green-600'
        : score > SCORE_THRESHOLDS.GOOD
            ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-2xl">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-2xl" aria-label={`Score: ${score} out of 100`}>
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>
            {FEEDBACK_CATEGORIES.map(({ key, title }) => (
                <Category key={key} title={title} score={feedback[key].score} />
            ))}
        </div>
    )
}
export default Summary;
