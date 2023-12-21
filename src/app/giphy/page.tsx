"use client";
import { useState, useEffect, SetStateAction } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import dotenv from "dotenv";
import FavoriteButton from "./favouriteButton";
import HotGifsSection from "./HotgifsSection";

type Gif = {
  id: string;
  url: string;
  title: string;
  isFavorite: boolean;
};

const GiphySearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const limit: number = 3;
  dotenv.config();

  const GIPHY_API_KEY: string = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
  const GIPHY_API_URL: string = "https://api.giphy.com/v1/gifs/search";
  const HOT_GIFS_LIMIT: number = 3;

  const searchGifs = async (url: string) => {
    try {
      const response = await axios.get(url, {
        params: {
          api_key: GIPHY_API_KEY,
          q: query,
          offset,
        },
      });
      console.log(response.data);
      const newGifs: Gif[] = response.data.data.map((gif: any) => ({
        id: gif.id,
        url: gif.images.fixed_height.url,
        title: gif.title,
        isFavorite: false, // Initialize isFavorite property
      }));
      if (offset === 0) {
        setGifs(newGifs);
      } else {
        setGifs((prevGifs) => [...prevGifs, ...newGifs]);
      }
    } catch (error) {
      console.error("Oops, Something went wrong!", error);
    }
  };

  useEffect(() => {
    if (query !== "") {
      searchGifs(GIPHY_API_URL);
    }
  }, [query, offset]);

  const toggleFavorite = (id: string) => {
    setGifs((prevGifs) =>
      prevGifs.map((gif) =>
        gif.id === id ? { ...gif, isFavorite: !gif.isFavorite } : gif
      )
    );
  };

  const handleSearch = () => {
    setOffset(0);
    searchGifs(GIPHY_API_URL);
  };

  const handleNext = () => {
    setOffset(offset + limit);
  };

  const handlePrevious = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    redirect("/signin");
  };

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>

      <div className="min-h-screen flex  flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <img
          className="logo"
          src="https://c.tenor.com/3HrcAdrKXigAAAAM/cute-kawaii.gif"
          width={85}
          alt="logo"
        />
        <div className="max-w-4xl w-full space-y-8 p-8 bg-gray-100 rounded-lg shadow-md">
          <div className="flex justify-between">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for GIFs"
                value={query}
                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setQuery(e.target.value)}
                className="block w-full rounded-lg border-gray-300 bg-gray-100 py-2 px-4 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-0 bottom-0 px-4 py-2 bg-black text-white rounded-r-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Search 🔍
              </button>
            </div>
          </div>
          <HotGifsSection GIPHY_API_KEY={GIPHY_API_KEY} />

          <div className="flex flex-wrap justify-center rounded-lg overflow-hidden">
            {gifs.slice(offset, offset + limit).map((gif) => (
              <div key={gif.id} className="w-1/3 p-2 rounded-lg">
                <img src={gif.url} alt={gif.title} />
                <FavoriteButton
                  isFavorite={gif.isFavorite}
                  onToggleFavorite={() => toggleFavorite(gif.id)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevious}
              disabled={offset === 0}
              className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-sm disabled:opacity-40 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
            >
              ⬅️ Previous
            </button>
            <button
              onClick={handleNext}
              disabled={offset + limit >= gifs.length}
              className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-sm disabled:opacity-40 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Next ➡️
            </button>
          </div>
        </div>

        <button
          className="text-white mt-4 bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default GiphySearch;
