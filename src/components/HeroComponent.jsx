import HeroImage from "../assets/Cooking-cuate.png";
import Navigation from "../components/Navigation";
const HeroComponent = () => {
  return (
    <div className="px-20 bg-green-900 pt-15">
    
    <Navigation/>
   
     
    <div className="flex justify-evenly w-full items-center mt-[-50px]">
      <div className=" text-white">
        <h1 className="font-black text-6xl">
          Learn Cooking through <br /> our Amazing recipes
        </h1>
        <p className="mt-3 opacity-90 text-lg">
          We offer a diverse collection of over 1000 recipes, catering to both
          children and adults. Our range includes fast food options, each
          featuring innovative variations on classic recipes to delight and
          satisfy your taste buds.
        </p>
        <button className="rounded-full px-8 py-3 bg-white mt-6 text-green-900 font-bold text-lg">Discover Recipes</button>
      </div>
      <div className="">
        <img src={HeroImage} className="" alt="cooking-cuate" />
      </div>
    </div>
  </div>
  )
}

export default HeroComponent