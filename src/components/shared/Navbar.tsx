/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@/context/UserContext";
import {
  Heart,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logoutUser } from "@/services/AuthService";

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [cartItems, setCartItems] = useState(2);
  const { user, setIsLoading } = useUser();

  // Handle scroll effect by this useEffect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // handle logout functionality
  const handleLogout = () => {
    logoutUser();
    setIsLoading(true);
  };

  const navLinks = [
    { name: "Collections", href: "/products" },
    // { name: "Brands", href: "/brands" },
    // { name: "Stores", href: "/stores" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Sale", href: "/sale", highlight: true },
  ];

  const categories = [
    { name: "Clothing", href: "/category/clothing" },
    { name: "Electronics", href: "/category/electronics" },
    { name: "Accessories", href: "/category/accessories" },
    { name: "Furniture", href: "/category/furniture" },
    { name: "Home Appliances", href: "/category/home-appliances" },
    { name: "Vehicles", href: "/category/vehicles" },
    { name: "Books & Stationery", href: "/category/books-stationery" },
    { name: "Toys & Games", href: "/category/toys-games" },
    { name: "Sports & Fitness", href: "/category/sports-fitness" },
    { name: "Musical Instruments", href: "/category/musical-instruments" },
    { name: "Beauty & Personal Care", href: "/category/beauty-personal-care" },
    { name: "Pet Supplies", href: "/category/pet-supplies" },
    { name: "Tools & Hardware", href: "/category/tools-hardware" },
    { name: "Others", href: "/category/others" },
  ];

  return (
    <header
      className={`w-full fixed top-0 z-50 bg-white dark:bg-zinc-800 transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      {/* Top bar */}
      <div className="border-b">
        <div className="sm:container sm:mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl">
            UpCycle
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {isMounted &&
                (theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                ))}
            </Button>

            {/* Favorites */}
            <Button variant="ghost" size="icon" aria-label="Favorites">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>

            {/* Account */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-black rounded w-full mr-4">
                  <DropdownMenuLabel className="text-center border-b border-b-gray-300">
                    {user?.username}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="text-gray-500" />
                  <DropdownMenuItem className="border-b border-b-gray-300">
                    <Link href={"/profile"} className="hover:text-red-500">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="border-b border-b-gray-300">
                    <Link href={`/dashboard`} className="hover:text-red-500">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>My Shop</DropdownMenuItem> */}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="bg-red-500 m-1 mt-2"
                  >
                    <LogOut />
                    <span className="hover:text-red-500">Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={"/login"}>
                <Button variant="ghost" size="icon" aria-label="Favorites">
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mx-auto px-4 flex items-center justify-between h-12">
        {/* Categories dropdown - desktop */}
        <div className="hidden md:flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 font-medium"
              >
                <Menu className="h-5 w-5" />
                CATEGORIES
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 bg-white dark:bg-slate-900"
            >
              {categories.map((category) => (
                <DropdownMenuItem key={category.name} asChild>
                  <Link href={category.href} className="cursor-pointer">
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] bg-white text-black dark:bg-slate-900 dark:text-white"
            >
              {/* Add DialogTitle and DialogDescription for accessibility */}
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Menu containing categories and navigation links for UpCycle.
              </SheetDescription>

              <div className="py-6 space-y-6">
                <div className="px-3 space-y-1">
                  <h3 className="text-sm font-medium">CATEGORIES</h3>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block py-2 px-3 rounded-md hover:bg-accent"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="px-3 space-y-1">
                  <h3 className="text-sm font-medium">MENU</h3>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`block py-2 px-3 rounded-md hover:bg-accent ${
                        link.highlight ? "text-rose-500 font-medium" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Navigation links - desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                link.highlight ? "text-rose-500" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
