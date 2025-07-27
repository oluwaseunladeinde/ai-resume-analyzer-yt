import { cn } from "~/lib/utils";
import ScoreBadge from "~/components/score-badge";

import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from "./accordion";

interface Tip {
    type: "good" | "improve";
    tip: string;
    explanation: string;
}

interface CategoryContentProps {
    tips: Tip[];
}

const CategoryHeader = ({
                            title,
                            categoryScore,
                        }: {
    title: string;
    categoryScore: number;
}) => {
    return (
        <div className="flex flex-row gap-4 items-center py-2">
            <p className="text-2xl font-semibold">{title}</p>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

const CategoryContent = ({ tips }: CategoryContentProps) => {

    return (
        <div className="flex flex-col gap-4 items-center w-full">
            {/* Tips Summary */}
            <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4" role="list" aria-label="Tips summary">
                {tips.map((tip, index) => (
                    <div className="flex flex-row gap-2 items-center" key={index} role="listitem">
                        <img
                            src={
                                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
                            }
                            alt="score"
                            className="size-5"
                        />
                        <p className="text-xl text-gray-500 ">{tip.tip}</p>
                    </div>
                ))}
            </div>
            {/* Detailed Tips */}
            <div className="flex flex-col gap-4 w-full" role="list" aria-label="Detailed explanations">
                {tips.map((tip, index) => (
                    <div
                        key={index + tip.tip}
                        role="listitem"
                        className={cn(
                            "flex flex-col gap-2 rounded-2xl p-4",
                            tip.type === "good"
                                ? "bg-green-50 border border-green-200 text-green-700"
                                : "bg-yellow-50 border border-yellow-200 text-yellow-700"
                        )}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src={
                                    tip.type === "good"
                                        ? "/icons/check.svg"
                                        : "/icons/warning.svg"
                                }
                                alt={tip.type === "good" ? "Good practice" : "Needs improvement"}
                                className="size-5"
                            />
                            <p className="text-xl font-semibold">{tip.tip}</p>
                        </div>
                        <p>{tip.explanation}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const FEEDBACK_SECTIONS = [
    { id: 'tone-style', title: 'Tone & Style', key: 'toneAndStyle' },
    { id: 'content',     title: 'Content',      key: 'content' },
    { id: 'structure',   title: 'Structure',    key: 'structure' },
    { id: 'skills',      title: 'Skills',       key: 'skills' }
] as const;

const Details = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Accordion>
                {FEEDBACK_SECTIONS.map(({ id, title, key }) => (
                    <AccordionItem key={id} id={id}>
                        <AccordionHeader itemId={id}>
                            <CategoryHeader
                                title={title}
                                categoryScore={feedback[key].score}
                            />
                        </AccordionHeader>
                        <AccordionContent itemId={id}>
                            <CategoryContent tips={feedback[key].tips} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
export default Details
