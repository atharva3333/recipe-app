import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaBookmark } from "react-icons/fa6";
import {auth, app} from "../utils/firebase.config"
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";
import { LuChefHat } from "react-icons/lu";

import LoginPopup from './LoginPopup';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [error, setError] = useState(null);

  const [user] = useAuthState(auth);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if(user){
      setShowLoginPopup(false);
    }
  }, [user])


  const handleAddArticle = () => {
    if (!user) {
      // User is not logged in, show login popup
      setShowLoginPopup(!showLoginPopup);
      return;
    }

    addFavoriteArticle(user.uid, recipeDetails);
  };
  const addFavoriteArticle = async (userId, recipeDetails) => {
    const db = getFirestore(app);
    // const userArticlesCollection = collection(db, 'userArticles', userId);

    // console.log(userArticlesCollection);

    try {
      // Add the article data to the user's collection
      const docRef = await addDoc(collection(db, userId), recipeDetails);

      toast.success("Article is added to Favourites", {
        style: {
          borderRadius: "10px",
         
        },
      });
    } catch (error) {
      console.error("Error adding article: ", error);
    }
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: 'f1517a22fbb04976abe3cd145cf60b2b',
              includeNutrition: true,
            },
          }
        );
        setRecipeDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setError(error.message);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipeDetails) {
    return <div>Loading...</div>;
  }

  const { percentCarbs, percentFat, percentProtein } = recipeDetails.nutrition.caloricBreakdown;

  return (
    <div className='text-center w-[1200px] mx-auto'>

<Toaster
        toastOptions={{ duration: 4000 }}
        position="top-center"
        reverseOrder={false}
      />


      {user && 
      <div className='font-medium text-xl text-left'>Welcome {user.displayName}!</div>
      }

    <div className='fixed right-10 top-10 rounded-full p-4'>

    <div>
    <button onClick={handleAddArticle} className='text-2xl'>Save <FaBookmark  className='mx-auto mt-1'/></button>
    </div>
    

     
      {user && 
     <div className='mt-6'>
    <Link to="/fav" className='text-2xl'> Your Recipe&apos;s<LuChefHat className='mx-auto mt-1'/></Link>
    </div>
   }
     
     
     
    </div>
    
    

    {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup} />}
      
      <img className='mx-auto rounded-lg' src={recipeDetails.image} alt={recipeDetails.title} />
      <h1 className='font-black text-lg'>{recipeDetails.title}</h1>
      <p>Healthscore: {recipeDetails.healthScore}</p>
     
     
      <h2 className='font-bold text-3xl my-8'>Nutritional Information:</h2>
      <div className='flex justify-center gap-4 items-center'>
      <p>Carbs: {percentCarbs}%</p>
      <p>Fat: {percentFat}%</p>
      <p>Protein: {percentProtein}%</p>
      </div>
      <h2 className='font-bold text-3xl my-8'>Instructions:</h2>
      <ol className='text-left text-xl my-16'>
        {recipeDetails.analyzedInstructions[0].steps.map((step) => (
          <li key={step.number}> <span className='font-bold'>{step.number}.</span> {step.step}</li>
        ))}
      </ol>
      
    </div>
  );
};

export default RecipeDetails;
