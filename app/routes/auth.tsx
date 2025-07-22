import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate, useNavigation} from "react-router";

export const meta = () => ([
    {title: 'Resumind | Auth'},
    {name: 'description', content: 'Log into your account'},
])

const Auth = () => {
    const {isLoading, auth} = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated){
            console.log({next})

            navigate(next);
        }
    }, [auth.isAuthenticated, next])

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg ">
                <section className="flex flex-col gap-8 bg-white rouned-2xl p-10">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log in to continue your job journey</h2>
                    </div>
                    <div className="">
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                Signing you in...
                            </button>
                        ): (
                            <>
                                {auth.isAuthenticated ? (
                                    <button
                                        className="auth-button"
                                        onClick={auth.signOut}
                                    >
                                        <p>Log Out</p>
                                    </button>
                                ): (
                                    <button
                                        className="auth-button"
                                        onClick={auth.signIn}
                                    >
                                        <p className="">Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}
export default Auth
    