import Button from "components/common/Button";
import Input from "components/common/Input";
import Label from "components/common/Label";
import Modal from "components/common/Modal/Modal";
import Rating from "components/common/Rating";
import { useForm, Controller } from "react-hook-form";
import { IAnime } from "types/anime";
import { ModalAction } from "./Anime";
import axios from "axios";

interface IAnimeBody {
  name: IAnime["name"];
  rating: number | null;
}

type FormValues = {
  name: IAnime["name"];
  rating: IAnime["rating"];
};

const getModalTitle = (action: ModalAction) => {
  if (action === "idle") {
    return undefined;
  }

  const titles = {
    create: "Добавить",
    delete: "Удалить",
    update: "Изменить",
  };

  return `${titles[action]} аниме`;
};

interface IProps {
  action: ModalAction;
  refetch: () => void;
}

const AnimeModalContent = ({ action, refetch }: IProps) => {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: "",
      rating: null,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const body: IAnimeBody = {
      name: data.name,
      rating: data.rating || null,
    };

    try {
      await axios.post("/api/animes", body);
      refetch();
    } catch (error) {}
  });

  return (
    <>
      <Modal.Header>{getModalTitle(action)}</Modal.Header>
      <Modal.Body>
        <div className="mb-6">
          <Label>Название аниме</Label>
          <Input placeholder="Евангелион" {...register("name")} />
        </div>
        <div className="mb-6">
          <Label>Рейтинг</Label>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => <Rating {...field} count={10} />}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>Save</Button>
      </Modal.Footer>
    </>
  );
};

export default AnimeModalContent;
