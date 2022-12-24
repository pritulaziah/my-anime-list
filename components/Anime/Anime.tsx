import { IAnime } from "types/anime";
import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "components/common/Table";
import axios from "axios";
import { createColumnHelper } from "@tanstack/react-table";
import statusCollection from "constants/statusCollection";
import Rating from "components/common/Rating";
import Progress from "components/common/Progress";
import Button from "components/common/Button";
import Modal from "components/common/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import AnimeModalContent from "./AnimeModalContent";

const columnHelper = createColumnHelper<IAnime>();

const Anime = () => {
  const [animes, setAnimes] = useState<IAnime[]>([]);
  const [modalInfo, setModalInfo] = useState<{
    action: "idle" | "create" | "delete" | "update";
    currentAnime: IAnime | null;
  }>({ action: "idle", currentAnime: null });

  const addNewAnime = () =>
    setModalInfo({ action: "create", currentAnime: null });

  const closeModal = useCallback(
    () => setModalInfo({ action: "idle", currentAnime: null }),
    []
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
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
      columnHelper.accessor("rating", {
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
      columnHelper.accessor("comment", {
        id: "comment",
        cell: (cell) => <span>{cell.getValue()}</span>,
        header: () => <span>Comment</span>,
        minSize: 400,
      }),
      columnHelper.display({
        id: "actions",
        cell: (cell) => (
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
            <Button
              variant="outlined"
              onClick={() => {
                setModalInfo({
                  action: "update",
                  currentAnime: cell.row.original,
                });
              }}
            >
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
    ],
    []
  );

  const getAnimes = useCallback(async () => {
    try {
      const response = await axios.get<IAnime[]>("/api/animes");

      setAnimes(response.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getAnimes();
  }, [getAnimes]);

  console.log(modalInfo);

  return (
    <div className="min-h-screen p-4">
      <div className="flex items-center mb-6">
        <Button onClick={addNewAnime}>Add new anime</Button>
      </div>
      <div className="overflow-auto">
        <Table data={animes} columns={columns} />
      </div>
      <Modal
        show={["create", "update"].includes(modalInfo.action)}
        onHide={closeModal}
        size="4xl"
      >
        <AnimeModalContent refetch={getAnimes} anime={modalInfo.currentAnime} />
      </Modal>
    </div>
  );
};

export default Anime;
