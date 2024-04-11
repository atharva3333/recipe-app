import  Logo from "../assets/Logo.jpg"

const Navigation = () => {
  return (
    <div className="px-10 py-5">
      <div className="flex justify-between bg-white items-center px-10 rounded-full">
        <div className="flex items-center gap-1">
        
          <img src={Logo} alt="logo" className="w-[5%]"/>
          <h2 className="font-black text-xl">Magic Recipe&apos;s</h2>
        </div>
        <div className="flex items-center gap-8">
          <li className=" list-none font-bold">Recipes</li>
          <button className="font-bold bg-blue-600 text-white px-5 py-2 rounded-full">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navigation