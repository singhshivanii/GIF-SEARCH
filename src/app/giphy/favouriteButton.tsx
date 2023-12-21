// FavoriteButton.tsx
import React from "react";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <button
      onClick={onToggleFavorite}
      className={`favorite-btn mt-2 rounded-lg ${
        isFavorite ? "favorite-active" : ""
      }`}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
