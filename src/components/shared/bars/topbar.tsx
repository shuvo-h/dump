
import Image from "next/image";
import Link from "next/link";
import React, { LegacyRef } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosHelpCircleOutline, IoIosLogOut, IoIosNotificationsOutline } from "react-icons/io";
import brandLogo from "@/asset/logo/logo.png"
import TopDropListItem from "./TopDropListItem";
import { cn } from "@/lib/utils";
import { LuUsers } from "react-icons/lu";
import { RiBillLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import AvatarBG from "@/asset/logo/avatar_bg.svg"
import LetterS from "@/asset/letter/s.svg"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import useOutsideClick from "@/hooks/useOutsideClick";


const profile = {
    id: "profile",
    items: [
        { id:"profile_1",name: "Team", href: "#", icon: <LuUsers className="" size={20} />, },
        { id:"profile_2",name: "Billing", href: "#", icon: <RiBillLine size={20} />, },
        { id:"profile_3",name: "Settings", href: "#" , icon: <IoSettingsOutline size={20} />,},
        { id:"profile_4",name: "Profile", href: "#", icon: <CiUser  size={20} />, },
        { id:"profile_5",name: "Referral", href: "#", icon: <LiaMoneyBillWaveSolid  size={20} />, },
        { id:"profile_5",name: "Logout", href: "#", icon: <IoIosLogOut size={20} />, },
      ]
}

const production = {
    id: "production1",
    items: [
        { id:"production_1",name: "product 1", href: "#" },
        { id:"production_2",name: "product 2", href: "#" },
        { id:"production_3",name: "product 3", href: "#" },
        { id:"production_4",name: "product 4", href: "#" },
        { id:"production_5",name: "product 5", href: "#" },
      ]
}
const gmt = {
    id: "gmt",
    items: [
        { id:"gmt_1",name: "my gmt 1", href: "#" },
        { id:"gmt_2",name: "my gmt 2", href: "#" },
        { id:"gmt_3",name: "my gmt 3", href: "#" },
        { id:"gmt_4",name: "my gmt 4", href: "#" },
        { id:"gmt_5",name: "my gmt 5", href: "#" },
      ]
}
const team = {
    id: "team",
    items: [
        { id:"team_1",name: "my team 1", href: "#" },
        { id:"team_2",name: "my team 2", href: "#" },
        { id:"team_3",name: "my team 3", href: "#" },
        { id:"team_4",name: "my team 4", href: "#" },
        { id:"team_5",name: "my team 5", href: "#" },
      ]
}
const help = {
    id: "help",
    items: [
        { id:"help_1",name: "my help 1", href: "#" },
        { id:"help_2",name: "my help 2", href: "#" },
        { id:"help_3",name: "my help 3", href: "#" },
        { id:"help_4",name: "my help 4", href: "#" },
        { id:"help_5",name: "my help 5", href: "#" },
    ]
}


const Topbar = () => {
    const [gmtMenu, setGmtMenu,, gmtMenuRef] = useOutsideClick();
    const [productionMenu, setProductionMenu,, productionMenuRef] = useOutsideClick();
    const [helpMenu, setHelpMenu,, helpMenuRef] = useOutsideClick();
    const [profileMenu, setProfileMenu,, profileMenuRef] = useOutsideClick();

    const handleDropdownMeny = (id:string) =>{
        switch (id) {
            case gmt.id:
                setGmtMenu(gmtMenu === id ? null:id)
                break;
            case production.id:
                setProductionMenu(productionMenu === id ? null:id)
                break;
            case help.id:
                setHelpMenu(helpMenu === id ? null:id)
                break;
            case profile.id:
                setProfileMenu(profileMenu === id ? null:id)
                break;

            default:
                break;
        }
    }

  return (
    <nav className="sticky top-0 left-0 right-0 z-20 border-b bg-primary">
      <div className="flex flex-wrap items-center justify-between h-full mx-auto px-2 md:px-6 py-5">
        <aside className="flex gap-1 md:gap-4">
            <Link
            href=""
            className={cn("flex items-center rtl:space-x-reverse",`md:w-[9.5rem]`)}
            >
                <span className="relative w-8 mr-4">
                    <Image src={brandLogo} width={100} height={80} layout="responsive" alt="" />
                </span>
                <span className="hidden md:block text-head3 font-inter font-medium whitespace-nowrap text-typo-primary">
                    WC Studio
                </span>
            </Link>

            <div className="relative flex items-center md:order-2 space-x-0 md:space-x-0 rtl:space-x-reverse">
                <span className="text-gray-300 mr-2">/</span>
                <button
                    type="button"
                    className="flex items-center gap-1 overflow-hidden text-para1 font-roboto text-typo-secondary font-normal hover:bg-sidebar_active px-2 h-8 rounded-md transition-all ease-in-out duration-200 hover:transition-all hover:ease-in-out hover:duration-200"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom"
                    onClick={()=>handleDropdownMeny(gmt.id)}
                >
                    <span className="">GMT+6</span>
                    <span className="rounded-full">
                        {
                            gmtMenu === gmt.id
                            ? <IoIosArrowUp size={12} />
                            : <IoIosArrowDown size={12} />
                        }
                    </span>
                    <span className="sr-only">Open team menu</span>
                </button>
                <TopDropListItem
                ref={gmtMenuRef as LegacyRef<HTMLDivElement>}
                    className="left-0 min-w-28"
                    activeMenu={gmtMenu as string}
                    id={gmt.id}
                    items={gmt.items}
                />
            </div>
            <div className="relative flex items-center md:order-2 space-x-0 md:space-x-0 rtl:space-x-reverse">
                <span className="text-gray-300 mr-2">/</span>
                <button
                    type="button"
                    className="flex items-center gap-1 overflow-hidden text-para1 font-roboto text-typo-secondary font-normal hover:bg-sidebar_active px-2 h-8 rounded-md"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom"
                    onClick={()=>handleDropdownMeny(production.id)}
                >
                    <span className="">Production</span>
                    <span className="rounded-full">
                        {
                            productionMenu === production.id
                            ? <IoIosArrowUp size={12} />
                            : <IoIosArrowDown size={12} />
                        }
                    </span>
                    <span className="sr-only">Open production menu</span>
                </button>
                <TopDropListItem
                    ref={productionMenuRef as LegacyRef<HTMLDivElement>}
                    className="left-0 min-w-28"
                    activeMenu={productionMenu as string}
                    id={production.id}
                    items={production.items}
                />
            </div>

        </aside>

        <aside className="flex gap-0 md:gap-4">

            <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                    type="button"
                    className="flex items-center gap-1 overflow-hidden text-para1 font-roboto text-typo-secondary font-normal hover:bg-sidebar_active px-2 h-8 rounded-md transition-all ease-in-out duration-200 hover:transition-all hover:ease-in-out hover:duration-200"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom"
                    onClick={()=>handleDropdownMeny(team.id)}
                >
                    <span>
                        <IoIosNotificationsOutline  size={18}  />
                    </span>
                    <span className="hidden md:block">News Center</span>
                </button>

            </div>
            <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                    type="button"
                    className="flex items-center gap-1 overflow-hidden text-para1 font-roboto text-typo-secondary font-normal hover:bg-sidebar_active px-2 h-8 rounded-md transition-all ease-in-out duration-200 hover:transition-all hover:ease-in-out hover:duration-200"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom"
                    onClick={()=>handleDropdownMeny(help.id)}
                >
                    <span>
                        <IoIosHelpCircleOutline size={17}  />
                    </span>
                    <span className="hidden md:block">Get Help</span>
                    <span className="rounded-full">
                        {
                            helpMenu === help.id
                            ? <IoIosArrowUp size={12} />
                            : <IoIosArrowDown size={12} />
                        }
                    </span>
                    <span className="sr-only">Open team menu</span>
                </button>
                <TopDropListItem
                    ref={helpMenuRef as LegacyRef<HTMLDivElement>}
                    className="right-0 min-w-28"
                    activeMenu={helpMenu as string}
                    id={help.id}
                    items={help.items}
                />
            </div>
            <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button className="relative w-8 h-8" onClick={()=>handleDropdownMeny(profile.id)}>

                    <Image className="" src={AvatarBG} width={100} height={100} layout="responsive" alt="" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-10">
                        <Image  src={LetterS} width={100} height={100} layout="responsive" alt="" />
                    </span>

                    <span className="absolute -bottom-[7px] -right-[2px]  rounded-full border border-white bg-gray-300">
                        {
                            profileMenu === profile.id
                            ? <MdOutlineKeyboardArrowUp size={14} />
                            : <MdOutlineKeyboardArrowDown  size={14} />
                        }
                    </span>
                </button>
                <TopDropListItem
                    ref={profileMenuRef as LegacyRef<HTMLDivElement>}
                    activeMenu={profileMenu as string}
                    id={profile.id}
                    items={profile.items}
                    user={{name:"Bappi",email:"bappi.cs@gmail.com"}}
                />
            </div>

            {/* <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
            >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {menuItems.map((item, idx) => (
                <li key={idx}>
                    <a
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    aria-current="page"
                    >
                    {item.name}
                    </a>
                </li>
                ))}
            </ul>
            </div> */}
        </aside>
      </div>
    </nav>
  );
};

export default Topbar;
