"use client";

import Banner from "@/components/modules/home/Banner";
import NewArrivals from "@/components/modules/home/NewArrivals";
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
    </div>
  );
};

export default HomePage;
