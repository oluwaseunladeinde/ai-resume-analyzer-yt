import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {

        if (!confirm('Are you sure you want to wipe all app data? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);

        try {
            // Use Promise.all for concurrent deletion or for...of for sequential
            await Promise.all(files.map(file => fs.delete(file.path)));
            await kv.flush();
            await loadFiles();
        } catch (error) {
            console.error('Error during wipe operation:', error);
            // Show error to user
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error {error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Data Management</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p>Authenticated as: <strong>{auth.user?.username}</strong></p>
            </div>
            <h2 className="text-lg font-semibold mb-3">Existing Files ({files.length})</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto">
                {files.length === 0 ? (
                    <p className="text-gray-500 italic">No files found</p>
                    ) : (
                            files.map((file) => (
                                <div key={file.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                    <span className="font-medium">{file.name}</span>
                                    <span className="text-sm text-gray-500">{file.size || 'Unknown size'}</span>
                                </div>
                            ))
                )}
                <div className={"mt-10"}>
                    {files.length === 0 ? (
                        <Link to={"/"} className={"back-button"}>
                            <img src={"/icons/back.svg"} alt="back" className={"w-2.5 h-2.5"} />
                            <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                        </Link>
                    ):(
                        <button
                            className={`px-4 py-2 rounded-md text-white font-semibold ${
                                isDeleting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-red-500 hover:bg-red-600 cursor-pointer'
                            }`}
                            disabled={isDeleting}
                            onClick={() => handleDelete()}
                        >
                            {isDeleting ? 'Wiping Data...' : 'Wipe App Data'}
                        </button>
                    )}

            </div>
        </div>
        </div>
    );
};

export default WipeApp;