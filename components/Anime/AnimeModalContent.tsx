import Input from "components/common/Input";
import Label from "components/common/Label";
import Rating from "components/common/Rating";
import { useForm, Controller } from "react-hook-form";
import { IAnime } from "types/anime";

type FormValues = {
  name: IAnime["name"];
  rating: IAnime["rating"];
};

const AnimeModalContent = () => {
  const { register, control } = useForm<FormValues>({
    defaultValues: {
      name: "",
      rating: null,
    },
  });

  return (
    <>
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
    </>
  );
};

export default AnimeModalContent;
