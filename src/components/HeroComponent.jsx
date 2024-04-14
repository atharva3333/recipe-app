import HeroImage from "../assets/Cooking-cuate.png";
import Navigation from "../components/Navigation";

const HeroComponent = () => {

  
  return (
    <div className="sm:px-20 px-5 bg-green-900 py-15">
    
    <Navigation/>
   
     
    <div className="flex justify-evenly w-full items-center ">
      <div className=" text-white">
        <h1 className="font-black text-6xl">
          Learn Cooking through our Amazing recipes
        </h1>
        <p className="mt-3 opacity-90 text-lg">
          We offer a diverse collection of over 1000 recipes, catering to both
          children and adults. Our range includes fast food options, each
          featuring innovative variations on classic recipes to delight and
          satisfy your taste buds.
        </p>
        <button className="rounded-full px-8 py-3 bg-white my-6 text-green-900 font-bold text-lg">
        <a href="/#recipes" className="list-none font-bold">Discover Recipes</a>
        </button>
      </div>
      <div className="hidden sm:block mt-[-50px]">
        <img src={HeroImage} className="" alt="cooking-cuate" />
      </div>
    </div>
  </div>
  )
}

export default HeroComponent