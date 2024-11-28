import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
  } from "lucide-react";
  
// Menu items.
export const items = [
    {
      id: 101,
      title: "Dashboard",
      url: "#",
      icon: Home,
    },
    {
      id: 103,
      title: "Stores",
      url: "#",
      icon: Inbox,
      nestedItems: [
        {
          id: 1001,
          title: "All Stores",
          url: "#",
        },
        {
          id: 1002,
          title: "Create New Store",
          url: "#",
        },
        {
          id: 1003,
          title: "Migrate Existing Store",
          url: "#",
        },
      ],
    },
    {
      id: 104,
      title: "Configurations",
      url: "#",
      icon: Calendar,
    },
    {
      id: 105,
      title: "Blueprints",
      url: "#",
      icon: Search,
    },
    {
      id: 106,
      title: "Collaborators",
      url: "#",
      icon: Settings,
    },
  ];

export  const items2 = [
    {
      id: 201,
      title: "Themes",
      url: "#",
      icon: Home,
    },
    {
      id: 202,
      title: "Extensions",
      url: "#",
      icon: Inbox,
      // nestedItems: [
      //   {
      //     id: 2001,
      //     title: "Inbox Submenu 1",
      //     url: "#",
      //   },
      //   {
      //     id: 2002,
      //     title: "Inbox Submenu 2",
      //     url: "#",
      //   },
      // ],
    },
    {
      id: 203,
      title: "WCS Addons",
      url: "#",
      icon: Inbox,
      // nestedItems: [
      //   {
      //     id: 2001,
      //     title: "Inbox Submenu 1",
      //     url: "#",
      //   },
      //   {
      //     id: 2002,
      //     title: "Inbox Submenu 2",
      //     url: "#",
      //   },
      // ],
    },
  ];

export  const reportsAndBilling = [
    {
      id: 301,
      title: "Store Reports",
      url: "#",
      icon: Home,
    },
    {
      id: 302,
      title: "Usages",
      url: "#",
      icon: Home,
    },
    {
      id: 303,
      title: "My Plan",
      url: "#",
      icon: Home,
       nestedItems: [
          {
            id: 3001,
            title: "Invoices",
            url: "#",
          },
          {
            id: 3002,
            title: "Modify Plan",
            url: "#",
          },

        ],
    },

  ];

export  const footerItems = [
    {
      id: 907,
      title: "Recommandations",
      url: "#",
      icon: Settings,
    },

  ];
