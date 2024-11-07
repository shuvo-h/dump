import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
  import { Calendar, ChevronDown, Home, Inbox, Search, Settings } from "lucide-react"
import { useState } from "react"

  // Menu items.
const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      nestedItems: [
        {
          title: "Inbox Submenu 1",
          url: "#",
        },
        {
          title: "Inbox Submenu 2",
          url: "#",
        },
      ],
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]

  export function AppSidebar() {
    const [activeIdx, setActiveIdx] = useState<number | null>(null)
    const [openMenu, setOpenMenu] = useState<string | null>(null)

    const handleToggleMenu = (menu: string) => {
        setOpenMenu((prevMenu) => (prevMenu === menu ? null : menu))
    }
    return (
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader />
        <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>

            <SidebarMenu>
              {items.map((item,idx) => {
                if (item.nestedItems) {
                    return (<SidebarMenuItem key={item.title}>
                            <SidebarMenuButton className="cursor-pointer" asChild onClick={() => handleToggleMenu(item.title)}>
                            <a className="">
                                <item.icon />
                                <span>{item.title}</span>
                                <ChevronDown className={cn("ml-auto transition-transform duration-300",{"rotate-180": openMenu === item.title})} />
                            </a>
                            </SidebarMenuButton>
                            <div
                                className={cn("transition-all overflow-hidden duration-300",
                                {
                                    "max-h-screen opacity-100": openMenu === item.title,
                                    "max-h-0 opacity-0": openMenu != item.title,
                                })}
                            >
                            <SidebarMenu>
                                {item.nestedItems.map((nestedItem) => (
                                    <SidebarMenuItem key={nestedItem.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={nestedItem.url}>
                                        <span>{nestedItem.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                      </div>
                    </SidebarMenuItem>)
                }else{
                    return (<SidebarMenuItem className={cn({'bg-red-400':activeIdx === idx})} onClick={()=>setActiveIdx(idx)} key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>)
                }
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
        <SidebarFooter >
            <div>Collapse</div>
            <div>Light mode</div>
        </SidebarFooter>
      </Sidebar>
    )
  }
