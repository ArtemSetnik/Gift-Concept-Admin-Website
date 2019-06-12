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
    url: "/admin/analytics",
    name: "Analytics",
    slug: "Analytics",
    i18n: "Analytics",
    icon: "HomeIcon"
  },
  // {
  //   url: null,
  //   name: "Dashboard",
  //   slug: "dashboard",
  //   icon: "HomeIcon",
  //   i18n: "Admin Dashboard",
  //   submenu: [
  //     {
  //       url: "/admin/analytics",
  //       name: "Analytics",
  //       slug: "Analytics",
  //       i18n: "Analytics"
  //     },
  //   ]
  // },
  {
    header: "Users",
    i18n: "Users",
  },
  {
    url: "/admin/sellers",
    name: "Sellers",
    slug: "sellers",
    icon: "LayersIcon",
    i18n: "Sellers",
  },
  {
    url: "/admin/drivers",
    name: "Drivers",
    slug: "drivers",
    icon: "CopyIcon",
    i18n: "Drivers",
  },
  {
    url: "/admin/buyers",
    name: "Buyers",
    slug: "buyers",
    icon: "ShoppingCartIcon",
    i18n: "Buyers",
  },
  {
    url: "/admin/register-requests",
    name: "RegisterRequests",
    slug: "register-requests",
    icon: "ClockIcon",
    i18n: "Register Requests",
  },
  {
    header: "Products",
    i18n: "Products",
  },
  {
    url: "/admin/product-list",
    name: "Products",
    slug: "products",
    icon: "GridIcon",
    i18n: "Products",
  },
  {
    url: "/admin/products/pending",
    name: "Pending Products",
    slug: "pending-products",
    icon: "ClockIcon",
    i18n: "Pending Products",
  },
  {
    header: "Orders",
    i18n: "Orders",
  },
  {
    url: "/admin/orders/buy",
    name: "Buy Orders",
    slug: "buy-orders",
    icon: "ShoppingCartIcon",
    i18n: "Buy Orders",
  },
  {
    url: "/admin/orders/drive",
    name: "Drive Orders",
    slug: "drive-orders",
    icon: "CopyIcon",
    i18n: "Drive Orders",
  },
  {
    header: "Payments",
    i18n: "Payments",
  },
  {
    header: "Statistics",
    i18n: "Statistics",
  },
]
