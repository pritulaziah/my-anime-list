import { IAnime } from "types/anime";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import statusCollection from "constants/statusCollection";
import Rating from "components/Rating";
import Progress from "components/Progress";
import Button from "components/common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const columnHelper = createColumnHelper<IAnime>();

const columns = [
  columnHelper.accessor((row) => `${row.name} / ${row.russian}`, {
    id: "name",
    cell: (cell) => <b>{cell.getValue()}</b>,
    header: () => <span>Name</span>,
    minSize: 400,
  }),
  columnHelper.accessor(
    (row) => (row.status ? statusCollection[row.status] : ""),
    {
      id: "status",
      cell: (cell) => cell.getValue(),
      header: () => <span>Status</span>,
    }
  ),
  columnHelper.accessor((row) => row.rating, {
    id: "rating",
    cell: (cell) => {
      const cellRating = cell.getValue();
      const rating = cellRating ? cellRating / 2 : null;

      return (
        <div className="flex justify-start whitespace-nowrap">
          {rating ? (
            <Rating value={rating} readonly label={`(${rating})`} />
          ) : (
            "n/a"
          )}
        </div>
      );
    },
    header: () => <span>Rating</span>,
  }),
  columnHelper.accessor((row) => [row.episodes_watch, row.episodes], {
    id: "progress",
    cell: (cell) => {
      const [episodesWatch, episodes] = cell.getValue();
      return episodesWatch ? (
        <Progress
          progress={(episodesWatch / episodes!) * 100}
          label={`${episodesWatch}/${episodes}`}
          size={80}
          strokeWidth={8}
        />
      ) : (
        "n/a"
      );
    },
    header: () => <span>Progress</span>,
  }),
  columnHelper.accessor((row) => row.comment, {
    id: "comment",
    cell: (cell) => <span>{cell.getValue()}</span>,
    header: () => <span>Comment</span>,
    minSize: 400,
  }),
  columnHelper.display({
    id: "actions",
    cell: () => (
      <div className="flex w-full space-x-2">
        <Button color="red" variant="outlined">
          <FontAwesomeIcon
            icon={faTrash}
            width={14}
            height={14}
            className="mr-1"
          />
          Delete
        </Button>
        <Button variant="outlined">
          <FontAwesomeIcon
            icon={faEdit}
            width={14}
            height={14}
            className="mr-1"
          />
          Edit
        </Button>
      </div>
    ),
  }),
];

interface ITableProps {
  data: IAnime[];
}

const Table = ({ data }: ITableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-max text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="py-3 px-6"
                style={{
                  width: header.getSize(),
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="bg-white border-b">
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="py-4 px-6"
                style={{ width: cell.column.getSize() }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
