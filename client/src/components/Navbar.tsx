import {
  Link,
  useNavigate,
} from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  // USER
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // LOGOUT
  const logout = () => {

    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (!confirmLogout)
      return;

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("role");

    navigate("/login");

  };

  return (

    <nav className="bg-gray-900 text-white px-6 md:px-10 py-4 shadow-lg">

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* LOGO */}
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">

            S

          </div>

          <div>

            <h1 className="text-2xl font-bold">
              Smart Leads CRM
            </h1>

            <p className="text-sm text-gray-400">
              Lead Management Dashboard
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 flex-wrap justify-center">

          {/* DASHBOARD */}
          <Link
            to="/dashboard"
            className="hover:text-blue-400 transition font-medium"
          >
            Dashboard
          </Link>

          {/* ROLE BADGE */}
          <span
            className={
              user?.role === "admin"
                ? "bg-green-600 px-3 py-1 rounded-full text-sm"
                : "bg-blue-600 px-3 py-1 rounded-full text-sm"
            }
          >
            {user?.role || "user"}
          </span>

          {/* USER INFO */}
          <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-xl">

            {/* AVATAR */}
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-lg">

              {user?.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}

            </div>

            <div>

              <p className="font-semibold">
                {user?.name || "User"}
              </p>

              <p className="text-sm text-gray-400">
                {user?.email}
              </p>

            </div>

          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;