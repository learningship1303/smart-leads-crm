import {
    Link,
    Navigate,
} from "react-router-dom";

function Home() {

    const token =
        localStorage.getItem("token");

    // IF LOGGED IN
    if (token) {

        return (
            <Navigate to="/dashboard" />
        );
    }

    return (

        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex justify-center items-center">

            <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-2xl">

                <h1 className="text-6xl font-bold text-gray-800 mb-6">
                    Smart Leads CRM
                </h1>

                <p className="text-gray-600 text-lg mb-10">
                    Manage your leads,
                    track sales,
                    and grow your business
                    with a modern CRM dashboard.
                </p>

                <div className="flex justify-center gap-6">

                    <Link
                        to="/login"
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition text-lg font-semibold"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition text-lg font-semibold"
                    >
                        Register
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Home;