import {
  LayoutDashboard,
  List,
  ShoppingCart,
  TrendingUp,
  User,
} from "lucide-react";

export const UserDashboardNavigation = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Purchase History",
    url: "/dashboard/purchase-history",
    icon: ShoppingCart,
  },
  {
    title: "Manage Listings",
    url: "/dashboard/listing",
    icon: List,
  },
  {
    title: "Sales History",
    url: "/dashboard/sales-history",
    icon: TrendingUp,
  },
  {
    title: "Edit Profile",
    url: "/dashboard/profile",
    icon: User,
  },
];
