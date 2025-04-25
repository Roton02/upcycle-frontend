"use client";

import { ChangePasswordModal } from "@/components/modals/ChangePasswordModal";
import { EditProfileModal } from "@/components/modals/EditProfileModal";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

export default function Page() {
  const { user, setIsLoading } = useUser();
  console.log(user);

  return (
    <div className="min-h-screen px-3 my-2">
      <div className="flex justify-between items-center border-b-2 border-gray-300 py-4">
        <div>
          <h1 className="text-3xl text-[#393739d7] font-bold text-transparen drop-shadow-lg mb-3 dark:text-gray-100">
            Personal Info
          </h1>
          <p className="text-[#7f7c7f] dark:text-gray-300">
            Update your profile, contact details and preferences to personalize
            your experience.
          </p>
        </div>

        <EditProfileModal user={user} setIsLoading={setIsLoading} />
      </div>

      <div className="flex flex-col items-center gap-3 justify-center my-3">
        <Image
          src={
            "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
          }
          width={200}
          height={200}
          alt="profile"
        />

        <p className="text-gray-700 font-medium dark:text-gray-200">
          Role: <span className="font-semibold text-lg">{user?.role}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="border-b-2 border-gray-300 py-4">
          <h1 className="text-xl text-[#393739d7] font-bold text-transparen drop-shadow-lg mb-3 dark:text-gray-100">
            Name
          </h1>
          <p className="text-[#7f7c7f] dark:text-gray-200">{user?.username}</p>
        </div>

        <div className="border-b-2 border-gray-300 py-4">
          <h1 className="text-xl text-[#393739d7] font-bold text-transparen drop-shadow-lg mb-3 dark:text-gray-100">
            Phone
          </h1>
          <p className="text-[#7f7c7f] dark:text-gray-200">{user?.phone}</p>
        </div>

        <div className="border-b-2 border-gray-300 py-4">
          <h1 className="text-xl text-[#393739d7] font-bold text-transparen drop-shadow-lg mb-3 dark:text-gray-100">
            email
          </h1>
          <p className="text-[#7f7c7f] dark:text-gray-200">{user?.email}</p>
        </div>

        <div className="border-b-2 border-gray-300 py-4">
          <h1 className="text-xl text-[#393739d7] font-bold text-transparen drop-shadow-lg mb-3 dark:text-gray-100">
            Password
          </h1>
          <div className="flex justify-between items-center pr-3">
            <p className="text-[#7f7c7f] dark:text-gray-200">
              Change Your Password
            </p>
            <ChangePasswordModal user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
