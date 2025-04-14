"use client";

import Banner from "@/components/modules/home/Banner";
import NewArrivals from "@/components/modules/home/NewArrivals";
import NewsletterSection from "@/components/modules/home/NewsLetterSection";
import SupportFeatures from "@/components/modules/home/SupportFeatures";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <Banner />
      <SupportFeatures />
      <NewArrivals />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
