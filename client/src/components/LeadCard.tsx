import type { Lead } from "../types/Lead";

interface Props {
  lead: Lead;

  role: string;

  setEditingId: any;

  setName: any;

  setEmail: any;

  setCompany: any;

  setStatus: any;

  setSource: any;

  deleteLead: (id: string) => void;
}

function LeadCard({
  lead,
  role,
  setEditingId,
  setName,
  setEmail,
  setCompany,
  setStatus,
  setSource,
  deleteLead,
}: Props) {

  return (

    <div className="bg-white p-5 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold">
        {lead.name}
      </h2>

      <p className="mt-2">
        {lead.email}
      </p>

      <p>{lead.company}</p>

      <p className="mt-2">
        Source: {lead.source}
      </p>

      <p  className="text-sm text-gray-500 mt-3 border-t pt-3">
        Added on{" "}
        {new Date(
          lead.createdAt
        ).toLocaleDateString()}
      </p>

      <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
        {lead.status}
      </span>

      <div className="flex gap-3 mt-5">

        <button
          onClick={() => {

            setEditingId(
              lead._id
            );

            setName(lead.name);

            setEmail(
              lead.email
            );

            setCompany(
              lead.company
            );

            setStatus(
              lead.status
            );

            setSource(
              lead.source
            );

          }}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        {role === "admin" && (

          <button
            onClick={() =>
              deleteLead(
                lead._id
              )
            }
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>

        )}

      </div>

    </div>

  );
}

export default LeadCard;