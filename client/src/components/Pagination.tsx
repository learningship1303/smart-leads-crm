interface Props {
  page: number;

  totalPages: number;

  setPage: any;
}

function Pagination({
  page,
  totalPages,
  setPage,
}: Props) {

  return (

    <div className="flex justify-center gap-3 mt-10">

      <button
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
      >
        Prev
      </button>

      <span className="font-bold mt-2">
        {page} / {totalPages}
      </span>

      <button
        disabled={
          page === totalPages
        }
        onClick={() =>
          setPage(page + 1)
        }
        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
      >
        Next
      </button>

    </div>

  );
}

export default Pagination;