/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    header: "Admin Dashboard",
    i18n: "Admin Dashboard",
  },
  {
    url: "/seller/analytics",
    name: "Analytics",
    slug: "Analytics",
    i18n: "Analytics",
    icon: "HomeIcon"
  },
  {
    header: "Users",
    i18n: "Users",
  },
  {
    url: "/seller/orders/buy",
    name: "Sellers",
    slug: "sellers",
    icon: "LayersIcon",
    i18n: "Sellers",
  },
  {
    url: "/seller/orders/drive",
    name: "Drivers",
    slug: "drivers",
    icon: "CopyIcon",
    i18n: "Drivers",
  },
  {
    header: "Products",
    i18n: "Products"
  },
  {
    url: "/seller/products",
    name: "Products",
    slug: "products",
    icon: "GridIcon",
    i18n: "Products",
  },
  {
    url: "/seller/payments",
    name: "RegisterRequests",
    slug: "register-requests",
    icon: "ClockIcon",
    i18n: "Register Requests",
  }
]
