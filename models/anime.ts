import {
  getModelForClass,
  prop,
  Severity,
  modelOptions,
} from "@typegoose/typegoose";
import { IAnime, Statuses } from "types/anime";

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
class AnimeClass implements IAnime {
  @prop({ enum: Statuses, type: String })
  public status!: IAnime["status"];
  @prop()
  public rating!: IAnime["rating"];
  @prop()
  public episodes!: IAnime["episodes"];
  @prop()
  public episodes_watch!: IAnime["episodes_watch"];
  @prop()
  public comment!: IAnime["comment"];
  @prop()
  public name!: IAnime["name"];
  @prop()
  public id!: IAnime["id"];
  @prop()
  public russian!: IAnime["russian"];
}

const AnimeModel = getModelForClass(AnimeClass, {
  schemaOptions: { collection: "animes" },
});

export default AnimeModel;
