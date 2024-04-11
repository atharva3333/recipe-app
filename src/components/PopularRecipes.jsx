import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const PopularRecipes = () => {
  const [searchQuery, setSearchQuery] = useState("pasta");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        {
          params: {
            apiKey: "8f8949c136db4acaa279e99025a16061",
            query: searchQuery,
            maxFat: 25,
            number: 6,
          },
        }
      );
      setRecipes(response.data.results);
    } catch (error) {
      if (error.response.status === 402) {
        setError("API quota is full. Please try again tomorrow.");
      } else {
        setError("Error fetching recipes. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchRecipes();
    console.log("useEffect");
  }, []);

  const handleSearch = () => {
    fetchRecipes();
    console.log("fetched");
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div className="my-16">
      {error && (
        <div className="bg-red-500 rounded-xl text-white p-8 fixed top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 z-10">
          <div className="flex justify-center items-center gap-6">
          <span>{error}</span>
          <button onClick={handleCloseError} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          </div>
        </div>
      )}
      <h1 className="text-center font-black text-5xl">
        Some of our Featured Recipe&apos;s just for you
      </h1>

      <div className="text-center mt-12">
        <input
          className="bg-gray-200 pl-6 py-4 rounded-full w-[300px]"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="px-8 py-4 bg-green-900 text-white rounded-full ml-4"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
            <div key={recipe.id}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="mx-auto rounded-xl"
              />
              <h2 className="text-center font-medium text-xl mt-3">
                {recipe.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularRecipes;
