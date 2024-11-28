import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AvatarBG from "@/asset/logo/avatar_bg.svg"
import LetterS from "@/asset/letter/s.svg"

type TNestedItem = {
    id: string;
    name: string;
    href: string;
    icon?:  React.JSX.Element;
}
type TTopDropListItemProps = {
    id: string;
    activeMenu: string|null;
    items: TNestedItem[];
    user?:{
        name: string,
        email: string,
    },
    className?:string;
}

const TopDropListItem = React.forwardRef<HTMLDivElement, TTopDropListItemProps>(({id,items,activeMenu,user,className}:TTopDropListItemProps,ref) => {
    return (
        <div    ref={ref}
                className={["z-50 absolute top-[42px] right-0 py-2 w-fit list-none font-inter text-typo-primary  bg-white divide-y divide-gray-100 rounded-lg dark:bg-gray-700 dark:divide-gray-600",cn({'hidden':activeMenu != id}),className].join(" ")}
                style={{
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 0.0625em 0.25em, rgba(0, 0, 0, 0.15) 0px 0.125em 0.3em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"
                }}
            >

                {
                    user && <Link className="grid grid-cols-[30px_1fr] gap-2 px-6 py-2 hover:bg-primary_hvr" href={""}>
                        <div className='relative flex items-center justify-start'>
                        <Image className="" src={AvatarBG} width={100} height={100} layout="responsive" alt="" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-10">
                        <Image  src={LetterS} width={100} height={100} layout="responsive" alt="" />
                    </span>
                        </div>
                        <div>
                            <span className="block font-semibold text-side_bar_mainitem ">
                                {user.name}
                            </span>
                            <span className="block text-side_bar_subitem ">
                                {user.email}
                            </span>
                        </div>
                </Link>
                }

                <ul className="" aria-labelledby="user-menu-button">
                    {
                        items.map((item,idx)=><li key={idx}>
                        <Link
                        href={item.href}
                        className="block px-6 py-2 text-side_bar_mainitem transition-colors ease-in-out duration-200  hover:bg-primary_hvr"
                        >
                            <span className='grid grid-cols-[30px_1fr] items-center'>
                                <span className='flex justify-center'>
                                {item.icon ? item.icon : <></> }
                                </span>
                                <span className='whitespace-nowrap'>{item.name} </span>
                            </span>
                        </Link>
                    </li>)
                    }
                </ul>
            </div>
    );
});
// Explicitly set the displayName for the component
TopDropListItem.displayName = "TopDropListItem";
export default TopDropListItem;