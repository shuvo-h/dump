/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
  import {
    ChevronDown,
  } from "lucide-react";
import { cn } from '@/lib/utils';

interface NestedItem {
  title: string;
  url: string;
}

interface Item {
  id: number;
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  nestedItems?: NestedItem[];
}

interface SidebarProps {
    label: string;
  items: Item[];
  activeIdx: number | null;
  openMenu: string | null;
  activeNestedIdx: number | null;
  handleMainItem: (idx: number) => void;
  handleToggleMenu: (menu: string, mainIdx: number) => void;
  handleNestedIdx: (idx: number) => void;
  isExpand?: boolean
}

const SideSection: React.FC<SidebarProps> = ({
    label,
  items,
  activeIdx,
  openMenu,
  activeNestedIdx,
  isExpand,
  handleMainItem,
  handleToggleMenu,
  handleNestedIdx,
}) => {
  return (
    <SidebarContent className={cn(isExpand?'flex-1': 'flex-none')}>
        <SidebarGroup className="p-0">
          {
            label &&  <SidebarGroupLabel className="ps-6 text-pata3 text-typo-secondary">{label}</SidebarGroupLabel>
          }

          <SidebarGroupContent className="pb-6 ps-6">
            <SidebarMenu className="text-typo-secondary ">
              {items.map((item, ) => {
                if (item.nestedItems) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className={cn(
                          "cursor-pointer rounded-l-md rounded-r-none  border-r-2 border-transparent font-normal hover:text-typo-sidebar_active hover:bg-sidebar_active transition-all ease-in-out duration-300 hover:transition-all hover:ease-in-out hover:duration-300",
                          {
                            "font-medium text-typo-sidebar_active bg-sidebar_active border-active":
                              openMenu === item.title &&
                              activeNestedIdx === null,
                            "font-medium text-typo-sidebar_active":
                              openMenu === item.title,
                          }
                        )}
                        asChild
                        onClick={() => handleToggleMenu(item.title, item.id)}
                      >
                        <a className="">
                          <item.icon
                            className={cn({
                              "text-icon-active": activeIdx === item.id,
                            })}
                          />
                          <span className="font-inter text-side_bar_mainitem">
                            {item.title}
                          </span>
                          <ChevronDown
                            className={cn(
                              "ml-auto transition-transform duration-300",
                              { "rotate-180": openMenu === item.title }
                            )}
                          />
                        </a>
                      </SidebarMenuButton>
                      <div
                        className={cn(
                          "transition-all overflow-hidden duration-300",
                          {
                            "max-h-screen opacity-100": openMenu === item.title,
                            "max-h-0 opacity-0": openMenu != item.title,
                          }
                        )}
                      >
                        <SidebarMenu className="">
                          <div className="border-l-1 ml-4 pl-2 mt-[1px] border-primary">
                            {item.nestedItems.map((nestedItem, nestedIdx) => (
                              <SidebarMenuItem
                                className={cn(
                                  "mt-[1px] rounded-l-md border-r-2 border-transparent font-normal hover:text-typo-sidebar_active transition-all ease-in-out duration-300 hover:transition-all hover:ease-in-out hover:duration-300  hover:bg-sidebar_active",
                                  {
                                    " font-medium text-typo-sidebar_active bg-sidebar_active border-active":
                                      activeNestedIdx === nestedIdx,
                                  }
                                )}
                                key={nestedItem.title}
                                onClick={() => handleNestedIdx(nestedIdx)}
                              >
                                <SidebarMenuButton
                                  className="pr-0 py-0 pl-2"
                                  asChild
                                >
                                  <a href={nestedItem.url}>
                                    <span
                                      className={cn(
                                        "font-inter text-side_bar_subitem"
                                      )}
                                    >
                                      {nestedItem.title}
                                    </span>
                                  </a>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </div>
                        </SidebarMenu>
                      </div>
                    </SidebarMenuItem>
                  );
                } else {
                  return (
                    <SidebarMenuItem
                      className={cn(
                        "font-inter rounded-l-md border-r-2 border-transparent transition-all hover:bg-sidebar_active",
                        {
                          "bg-sidebar_active border-active":
                            activeIdx === item.id,
                        }
                      )}
                      onClick={() => handleMainItem(item.id)}
                      key={item.title}
                    >
                      <SidebarMenuButton
                        className="h-8 font-normal transition-all ease-in-out duration-300 hover:transition-all hover:ease-in-out hover:duration-300  hover:bg-sidebar_active"
                        asChild
                      >
                        <a href={item.url}>
                          <item.icon
                            className={cn({
                              "text-icon-active": activeIdx === item.id,
                            })}
                          />
                          <span
                            className={[
                              "text-side_bar_mainitem",
                              cn({
                                "font-medium text-typo-sidebar_active":
                                  activeIdx === item.id,
                              }),
                            ].join(" ")}
                          >
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
  );
};

export default SideSection;
