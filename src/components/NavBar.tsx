import { appleImg } from "../ultis"
import { searchImg } from "../ultis"
import { bagImg } from "../ultis"
import { navLists } from "../data-constants/data-constants"
// if doing this project again add an hamburguer menu to it

const NavBar = () => {
  return (
    <header className="w-full py-5 px-5 sm:px-10 flex justify-between items-center text-2xl">
        <nav className="flex w-full screen-max-width">
            <img src={appleImg} alt="Apple" width={14} height={18}/>

            <div className="flex flex-1 justify-center max-sm:hidden">
                {navLists.map((navItem, i) => (
                    <div key={i} className="px-5 text-sm text-gray hover:text-white cursor-pointer transition-all">
                        {navItem}
                    </div>
                ))}
            </div>

            <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
                <img src={searchImg} alt="searchImg" width={18} height={18} className="cursor-pointer"/>
                <img src={bagImg} alt="bagImg" width={18} height={18} className="cursor-pointer"/>
            </div>
        </nav>
    </header>
  )
}

export default NavBar