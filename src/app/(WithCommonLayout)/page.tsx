"use client";

import Banner from "@/components/modules/home/Banner";
import BlogAndNews from "@/components/modules/home/BlogAndNews";
import Category from "@/components/modules/home/Category";
import HappyCustomers from "@/components/modules/home/HappyCustomers";
import NewsletterSection from "@/components/modules/home/NewsLetterSection";
import SpecialOffers from "@/components/modules/home/SpecialOffers/SpecialOffers";
import SupportFeatures from "@/components/modules/home/SupportFeatures";
import TrendingProducts from "@/components/modules/home/TrendingProducts";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <SupportFeatures />
      {/* <NewArrivals /> */}
      <Category />
      <TrendingProducts />
      <SpecialOffers />
      <HappyCustomers />
      <BlogAndNews />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
