import React, {useEffect, useState} from 'react'
import {Link} from "react-router";
import ScoreCircle from "~/components/score-circle";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = (
    {resume: {id, companyName, jobTitle, feedback, imagePath}}:
    {resume: Resume}) => {

    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadResume = async () => {
            try {
               const blob = await fs.read(imagePath);
               if(!blob) return;
               const url = URL.createObjectURL(blob);
               setResumeUrl(url);
           } catch (error) {
               console.error('Failed to load resume image:', error);
           }
            setIsLoading(false);
        }

        loadResume();

        // Cleanup function to revoke object URL
        return () => {
            if (resumeUrl) {
                URL.revokeObjectURL(resumeUrl);
            }
        };
    }, [imagePath, resumeUrl]);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                    {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            {isLoading ? (
                    <div className="gradient-border animate-in fade-in duration-1000">
                            <div className="w-full h-[350px] max-sm:h-[200px] flex items-center justify-center bg-gray-100">
                                <p className="text-gray-500">Loading...</p>
                            </div>
                        </div>
                ) : resumeUrl && (
                <div className="gradient-border animate-in fade-in duration-1000">
                    <div className="w-full h-full">
                        <img
                            src={resumeUrl}
                            alt="resume"
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                        />
                    </div>
                </div>
            )}
        </Link>
    )
}
export default ResumeCard
