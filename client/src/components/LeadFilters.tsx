interface Props {
  search: string;
  setSearch: any;

  filterStatus: string;
  setFilterStatus: any;

  filterSource: string;
  setFilterSource: any;

  sortOrder: string;
  setSortOrder: any;
}

function LeadFilters({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  filterSource,
  setFilterSource,
  sortOrder,
  setSortOrder,
}: Props) {

  return (

    <div className="flex flex-col md:flex-row gap-4 mb-10">

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="border p-3 rounded-lg flex-1"
      />

      <select
        value={filterStatus}
        onChange={(e) =>
          setFilterStatus(
            e.target.value
          )
        }
        className="border p-3 rounded-lg"
      >
        <option value="All">
          All Status
        </option>

        <option value="New">
          New
        </option>

        <option value="Contacted">
          Contacted
        </option>

        <option value="Qualified">
          Qualified
        </option>

        <option value="Lost">
          Lost
        </option>

      </select>

      <select
        value={filterSource}
        onChange={(e) =>
          setFilterSource(
            e.target.value
          )
        }
        className="border p-3 rounded-lg"
      >
        <option value="All">
          All Sources
        </option>

        <option value="Website">
          Website
        </option>

        <option value="Instagram">
          Instagram
        </option>

        <option value="Referral">
          Referral
        </option>

      </select>

      <select
        value={sortOrder}
        onChange={(e) =>
          setSortOrder(
            e.target.value
          )
        }
        className="border p-3 rounded-lg"
      >
        <option value="latest">
          Latest
        </option>

        <option value="oldest">
          Oldest
        </option>

      </select>

    </div>

  );
}

export default LeadFilters;