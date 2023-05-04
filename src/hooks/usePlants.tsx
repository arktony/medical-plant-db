import axios, { CanceledError } from "axios";
import React, { useEffect } from "react";

export interface IPlant {
  id: number;
  family: string;
  scientificName: string;
  genus: string;
  englishName: string;
  localName: string;
  disease: string;
  narration: string;
  imagename: string;
  picByte: string;
  type: string;
}
const defaultPosts: IPlant[] = [];

const usePlants = () => {
  const [plants, setPlants]: [IPlant[], (posts: IPlant[]) => void] =
    React.useState(defaultPosts);
  const [error, setErro] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState<ImageData[]>();

  React.useEffect(() => {
    const controller = new AbortController();
    axios
      .get<IPlant[]>("http://localhost:8080/api/v1/plants", {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPlants(response.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErro(err.message);
      });
    return () => controller.abort();
  }, []);

  return { plants, error };
};
export default usePlants;
