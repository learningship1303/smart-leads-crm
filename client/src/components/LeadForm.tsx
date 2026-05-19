interface Props {
  name: string;
  setName: any;

  email: string;
  setEmail: any;

  company: string;
  setCompany: any;

  status: string;
  setStatus: any;

  source: string;
  setSource: any;

  editingId: string | null;

  loading: boolean;

  createLead: () => void;

  updateLead: () => void;
}

function LeadForm({
  name,
  setName,
  email,
  setEmail,
  company,
  setCompany,
  status,
  setStatus,
  source,
  setSource,
  editingId,
  loading,
  createLead,
  updateLead,
}: Props) {

  return (

    <div className="bg-white p-6 rounded-xl mb-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          className="border p-3 rounded-lg"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border p-3 rounded-lg"
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Lost</option>
        </select>

        <select
          value={source}
          onChange={(e) =>
            setSource(e.target.value)
          }
          className="border p-3 rounded-lg"
        >
          <option>Website</option>
          <option>Instagram</option>
          <option>Referral</option>
        </select>

      </div>

      <button
        disabled={loading}
        onClick={
          editingId
            ? updateLead
            : createLead
        }
        className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        {loading
          ? "Processing..."
          : editingId
          ? "Update Lead"
          : "Add Lead"}
      </button>

    </div>

  );
}

export default LeadForm;