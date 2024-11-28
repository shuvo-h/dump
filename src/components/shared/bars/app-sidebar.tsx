import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import SideSection from "./SideSection";
import  { footerItems, items, items2, reportsAndBilling } from "./navList";
import { MobileAppBar } from "./MobileAppBar";
import { SidebarProvider } from "@/components/ui/MobileSidebar";


export function AppSidebar() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeNestedIdx, setActiveNestedIdx] = useState<number | null>(null);
  const [isCollapse,setIsCollapse] = useState(false);

  // console.log({ activeIdx, openMenu, activeNestedIdx });

  const handleMainItem = (idx: number) => {
    setActiveIdx(idx);
    setOpenMenu(null);
    setActiveNestedIdx(null);
  };
  const handleToggleMenu = (menu: string, mainIdx: number) => {
    setActiveIdx(mainIdx);
    // setOpenMenu((prevMenu) => (prevMenu === menu ? null : menu))
    setOpenMenu((prevMenu) => {
      if (prevMenu === menu) {
        setActiveNestedIdx(null);
        return null;
      }
      if (mainIdx !== activeIdx) {
        setActiveNestedIdx(null);
      }
      return menu;
    });
  };
  const handleNestedIdx = (idx: number) => {
    // setActiveIdx(null)
    setActiveNestedIdx(idx);
  };

  const onCollapseClick = (e,data) =>{
    console.log(e,data,isCollapse);
    setIsCollapse(data.open)
  }

  return (
    <>

    <SidebarProvider>
      <MobileAppBar />
    </SidebarProvider>
    {/* <div className="absolute -top-20 left-40 z-20">
    <SidebarTrigger className="w-full justify-start hover:text-typo-secondary" onClick={onCollapseClick} label="Collapse" />
    </div> */}



    <Sidebar
      className="overflow-auto bg-sidebar_container border-primary" // position: fixed dont allow overflow
      side="left"
      collapsible="icon"
    >
      {/* <div className="h-screen border overflow-auto"> */}


      {/* <SidebarHeader className="h-[75px]" /> */}
      <div className="mt-20"></div>
      <SideSection
        label=""
        activeIdx={activeIdx}
        activeNestedIdx={activeNestedIdx}
        handleMainItem={handleMainItem}
        handleNestedIdx={handleNestedIdx}
        handleToggleMenu={handleToggleMenu}
        openMenu={openMenu}
        items={items}
      />

      {/* <p className={isCollapse?"w-72 bg-red-500 h-auto absolute":""}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur labore culpa ipsa quo magnam unde, error non ipsam recusandae autem!</p> */}

      <SideSection
        label="Products"
        isExpand={false}
        activeIdx={activeIdx}
        activeNestedIdx={activeNestedIdx}
        handleMainItem={handleMainItem}
        handleNestedIdx={handleNestedIdx}
        handleToggleMenu={handleToggleMenu}
        openMenu={openMenu}
        items={items2}
      />
      <SideSection
        label="Reports & Billing"
        isExpand={true}
        activeIdx={activeIdx}
        activeNestedIdx={activeNestedIdx}
        handleMainItem={handleMainItem}
        handleNestedIdx={handleNestedIdx}
        handleToggleMenu={handleToggleMenu}
        openMenu={openMenu}
        items={reportsAndBilling}
      />

      <SidebarFooter className="p-0">
        <SidebarGroup className="p-0"></SidebarGroup>
        <SidebarGroupContent className="py-6 ps-6">
          <SidebarMenu className="text-typo-secondary ">
            {footerItems.map((item,) => (
              <SidebarMenuItem
                className={cn(
                  "font-inter rounded-l-md border-r-2 border-transparent transition-all hover:bg-sidebar_active",
                  { "bg-sidebar_active border-active": activeIdx === item.id }
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
                      className={cn({ "text-icon-active": activeIdx === item.id })}
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

            ))}
            <SidebarMenuItem
                className={cn(
                  "font-inter rounded-l-md border-r-2 border-transparent transition-all hover:bg-sidebar_active",

                )}

              >
                <SidebarMenuButton
                  className="h-8 font-normal transition-all ease-in-out duration-300 hover:transition-all hover:ease-in-out hover:duration-300  hover:bg-sidebar_active"
                  asChild
                >
                  <div>
                    <SidebarTrigger className="w-full justify-start hover:text-typo-secondary" onClick={onCollapseClick} label="Collapse" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>

        </SidebarGroupContent>
      </SidebarFooter>
      {/* </div> */}
    </Sidebar>
    </>
  );
}
