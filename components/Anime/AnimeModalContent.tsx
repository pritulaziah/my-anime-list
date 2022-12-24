import Button from "components/common/Button";
import Input from "components/common/Input";
import Label from "components/common/Label";
import Modal from "components/common/Modal/Modal";
import Rating from "components/common/Rating";
import { useForm, Controller } from "react-hook-form";
import { IAnime } from "types/anime";
import axios from "axios";
import { useContext } from "react";
import ModalContext from "components/common/Modal/ModalContext";

type IAnimeBody = {
  name: IAnime["name"];
  rating: number | null;
};

type FormValues = {
  name: IAnime["name"];
  rating: number | null;
};

interface IProps {
  refetch: () => void;
  anime: IAnime | null;
}

const AnimeModalContent = ({ anime, refetch }: IProps) => {
  const isUpdate = anime != null;
  const context = useContext(ModalContext);
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: anime ? anime.name : "",
      rating: anime ? anime.rating : null,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const body: IAnimeBody = {
      name: data.name,
      rating: data.rating,
    };

    try {
      await axios.post("/api/animes", body);
      refetch();
      context.onHide();
    } catch (error) {}
  });

  return (
    <>
      <Modal.Header>{`${
        isUpdate ? "Изменить" : "Добавить"
      } аниме`}</Modal.Header>
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
        <Button onClick={context.onHide} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onSubmit}>Save</Button>
      </Modal.Footer>
    </>
  );
};

export default AnimeModalContent;
