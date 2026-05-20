import {
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import { CSVLink } from "react-csv";

import { useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import LeadCharts from "./components/LeadCharts";

import LeadForm from "./components/LeadForm";

import LeadCard from "./components/LeadCard";

import LeadFilters from "./components/LeadFilters";

import Pagination from "./components/Pagination";

import StatsCard from "./components/StatsCard";

import API from "./services/api";

import type { Lead } from "./types/Lead";

function App() {

  const navigate = useNavigate();

  // USER
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const role = user?.role;

  // STATES
  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(false);

  // PAGINATION
  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  // SORT
  const [sortOrder, setSortOrder] =
    useState("latest");

  // FORM
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [status, setStatus] =
    useState<
      | "New"
      | "Contacted"
      | "Qualified"
      | "Lost"
    >("New");

  const [source, setSource] =
    useState<
      | "Website"
      | "Instagram"
      | "Referral"
    >("Website");

  // SEARCH
  const [search, setSearch] =
    useState("");

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState("");

  // FILTERS
  const [
    filterStatus,
    setFilterStatus,
  ] = useState("All");

  const [
    filterSource,
    setFilterSource,
  ] = useState("All");

  // EDIT
  const [
    editingId,
    setEditingId,
  ] = useState<string | null>(
    null
  );

  // DARK MODE
  const [darkMode, setDarkMode] =
    useState(false);

  // EMAIL VALIDATION
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // AUTH CHECK
  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {

      navigate("/login");

    }

  }, []);

  // SEARCH DEBOUNCE
  useEffect(() => {

    const timer = setTimeout(() => {

      setDebouncedSearch(search);

    }, 400);

    return () =>
      clearTimeout(timer);

  }, [search]);

  // FETCH LEADS
  const fetchLeads = async () => {

    try {

      setLoading(true);

      const res =
        await API.get(
          `/leads?page=${page}&sort=${sortOrder}`
        );

      setLeads(
        res.data.leads
      );

      setTotalPages(
        res.data.totalPages
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch leads"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchLeads();

  }, [page, sortOrder]);

  // RESET FORM
  const resetForm = () => {

    setName("");
    setEmail("");
    setCompany("");
    setStatus("New");
    setSource("Website");
    setEditingId(null);

  };

  // CREATE LEAD
  const createLead = async () => {

    try {

      setLoading(true);

      if (
        !name ||
        !email ||
        !company
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;

      }

      if (
        !emailRegex.test(email)
      ) {

        toast.error(
          "Invalid email"
        );

        return;

      }

      await API.post(
        "/leads",
        {
          name,
          email,
          company,
          status,
          source,
        }
      );

      toast.success(
        "Lead created"
      );

      fetchLeads();

      resetForm();

    } catch (error: any) {

      toast.error(
        error?.response?.data
          ?.message ||
        "Create failed"
      );

    } finally {

      setLoading(false);

    }

  };

  // UPDATE LEAD
  const updateLead = async () => {

    try {

      setLoading(true);

      if (
        !name ||
        !email ||
        !company
      ) {

        toast.error(
          "Please fill all fields"
        );

        return;

      }

      if (
        !emailRegex.test(email)
      ) {

        toast.error(
          "Invalid email"
        );

        return;

      }

      await API.put(
        `/leads/${editingId}`,
        {
          name,
          email,
          company,
          status,
          source,
        }
      );

      toast.success(
        "Lead updated"
      );

      fetchLeads();

      resetForm();

    } catch (error: any) {

      toast.error(
        error?.response?.data
          ?.message ||
        "Update failed"
      );

    } finally {

      setLoading(false);

    }

  };

  // DELETE LEAD
  const deleteLead = async (
    id: string
  ) => {

    try {

      const confirmDelete =
        window.confirm(
          "Delete this lead?"
        );

      if (!confirmDelete)
        return;

      await API.delete(
        `/leads/${id}`
      );

      toast.success(
        "Lead deleted"
      );

      fetchLeads();

    } catch (error) {

      toast.error(
        "Delete failed"
      );

    }

  };

  // FILTERED LEADS
  const filteredLeads =
    useMemo(() => {

      return leads.filter(
        (lead) => {

          const matchesSearch =

            lead.name
              .toLowerCase()
              .includes(
                debouncedSearch.toLowerCase()
              ) ||

            lead.email
              .toLowerCase()
              .includes(
                debouncedSearch.toLowerCase()
              ) ||

            lead.company
              .toLowerCase()
              .includes(
                debouncedSearch.toLowerCase()
              );

          const matchesStatus =

            filterStatus ===
            "All" ||
            lead.status ===
            filterStatus;

          const matchesSource =

            filterSource ===
            "All" ||
            lead.source ===
            filterSource;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesSource
          );

        }
      );

    }, [
      leads,
      debouncedSearch,
      filterStatus,
      filterSource,
    ]);

  return (

    <div
      className={
        darkMode
          ? "min-h-screen bg-gray-900 text-white"
          : "min-h-screen bg-gray-100 text-black"
      }
    >

      <Navbar />

      <div className="p-6 md:p-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">

          <div>

            <h1 className="text-5xl font-extrabold text-blue-600">
              Smart Leads Dashboard
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Manage all your business leads efficiently
            </p>

          </div>

          <div className="flex gap-3">

            <CSVLink
              data={filteredLeads}
              filename="leads.csv"
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Export CSV
            </CSVLink>

            <button
              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }
              className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              {darkMode
                ? "Light Mode"
                : "Dark Mode"}
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <StatsCard
            title="Total Leads"
            count={leads.length}
            color="bg-blue-600"
          />

          <StatsCard
            title="New"
            count={
              leads.filter(
                (lead) =>
                  lead.status === "New"
              ).length
            }
            color="bg-green-600"
          />

          <StatsCard
            title="Qualified"
            count={
              leads.filter(
                (lead) =>
                  lead.status ===
                  "Qualified"
              ).length
            }
            color="bg-yellow-500"
          />

          <StatsCard
            title="Lost"
            count={
              leads.filter(
                (lead) =>
                  lead.status === "Lost"
              ).length
            }
            color="bg-red-500"
          />

        </div>

        {/* CHARTS */}
        <LeadCharts leads={leads} />

        {/* FORM */}
        <h2 className="text-3xl font-bold text-purple-600 mt-12 mb-6">
          {editingId
            ? "Edit Lead"
            : "Manage Leads"}
        </h2>

        <LeadForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          company={company}
          setCompany={setCompany}
          status={status}
          setStatus={setStatus}
          source={source}
          setSource={setSource}
          editingId={editingId}
          loading={loading}
          createLead={createLead}
          updateLead={updateLead}
        />

        {/* FILTERS */}
        <LeadFilters
          search={search}
          setSearch={setSearch}
          filterStatus={filterStatus}
          setFilterStatus={
            setFilterStatus
          }
          filterSource={filterSource}
          setFilterSource={
            setFilterSource
          }
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {/* LEADS */}
        {loading ? (

          <div className="flex justify-center items-center py-20">

            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : filteredLeads.length === 0 ? (

          <div className="bg-white rounded-xl p-10 text-center shadow-lg">

            <h2 className="text-3xl font-bold text-gray-700">
              No Leads Found
            </h2>

            <p className="text-gray-400 mt-3">
              Try changing filters or add a new lead.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredLeads.map(
              (lead) => (

                <LeadCard
                  key={lead._id}
                  lead={lead}
                  role={role}
                  setEditingId={
                    setEditingId
                  }
                  setName={setName}
                  setEmail={setEmail}
                  setCompany={setCompany}
                  setStatus={setStatus}
                  setSource={setSource}
                  deleteLead={deleteLead}
                />

              )
            )}

          </div>

        )}

        {/* PAGINATION */}
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

      </div>

    </div>

  );
}

export default App;