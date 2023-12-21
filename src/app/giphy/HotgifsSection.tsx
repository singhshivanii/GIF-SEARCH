// HotGifsSection.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteButton from "./favouriteButton";

type Gif = {
  id: string;
  url: string;
  title: string;
  isFavorite: boolean;
};

interface HotGifsSectionProps {
  GIPHY_API_KEY: string;
}

const HotGifsSection: React.FC<HotGifsSectionProps> = ({ GIPHY_API_KEY }) => {
  const [hotGifs, setHotGifs] = useState<Gif[]>([]);
  const limit: number = 3;

  const fetchHotGifs = async () => {
    try {
      const hotResponse = await axios.get(
        "https://api.giphy.com/v1/gifs/trending",
        {
          params: {
            api_key: GIPHY_API_KEY,
            limit: limit,
          },
        }
      );
      const hotGifsData: Gif[] = hotResponse.data.data.map((gif: any) => ({
        id: gif.id,
        url: gif.images.fixed_height.url,
        title: gif.title,
        isFavorite: false,
      }));
      setHotGifs(hotGifsData);
    } catch (error) {
      console.error(
        "Oops, Something went wrong while fetching hot GIFs!",
        error
      );
    }
  };

  useEffect(() => {
    fetchHotGifs();
  }, []); // Run once when the component mounts

  const toggleFavorite = (id: string) => {
    setHotGifs((prevGifs) =>
      prevGifs.map((gif) =>
        gif.id === id ? { ...gif, isFavorite: !gif.isFavorite } : gif
      )
    );
  };

  return (
    <div className="flex flex-wrap justify-center rounded-lg overflow-hidden">
      {hotGifs.map((hotGif) => (
        <div key={hotGif.id} className="w-1/3 p-2 rounded-lg">
          <img src={hotGif.url} alt={hotGif.title} />
          <FavoriteButton
            isFavorite={hotGif.isFavorite}
            onToggleFavorite={() => toggleFavorite(hotGif.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default HotGifsSection;
