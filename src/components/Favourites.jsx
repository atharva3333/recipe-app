import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, app } from "../utils/firebase.config";
import { useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Favourites = () => {
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const fetchData = async () => {
          const db = getFirestore(app);
    
          try {
            const querySnapshot = await getDocs(collection(db, user.uid));
            const fetchedArticles = [];
            querySnapshot.forEach((doc) => {
              fetchedArticles.push({
                id: doc.id,
                data: doc.data(),
              });
            });
            setRecipeDetails(fetchedArticles);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, [user]);

      if (!recipeDetails) {
        return <div>Loading...</div>;
      }

      const { percentCarbs, percentFat, percentProtein } = recipeDetails[0].data.nutrition.caloricBreakdown;

      return (
        <div className="text-center w-[1200px] mx-auto">
          <img className='mx-auto rounded-lg' src={recipeDetails[0].data.image} alt={recipeDetails[0].data.title} />
          <h1 className='font-black text-lg'>{recipeDetails[0].data.title}</h1>
          <p>Healthscore: {recipeDetails[0].data.healthScore}</p>
         
          <h2 className='font-bold text-3xl my-8'>Nutritional Information:</h2>
          <div className='flex justify-center gap-4 items-center'>
            <p>Carbs: {percentCarbs}%</p>
            <p>Fat: {percentFat}%</p>
            <p>Protein: {percentProtein}%</p>
          </div>
          <h2 className='font-bold text-3xl my-8'>Instructions:</h2>
          <ol className='text-left text-xl my-16'>
            {recipeDetails[0].data.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number}> <span className='font-bold'>{step.number}.</span> {step.step}</li>
            ))}
          </ol>
        </div>
      );
};

export default Favourites;