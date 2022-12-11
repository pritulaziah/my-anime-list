import Input from "components/common/Input";
import Label from "components/common/Label";
import { useForm } from "react-hook-form";

type FormValues = {};

const AnimeModalContent = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {},
  });

  return (
    <div>
      <div className="mb-6">
        <Label>Название аниме</Label>
        <Input placeholder="Евангелион" />
      </div>
    </div>
  );
};

export default AnimeModalContent;
