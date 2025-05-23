import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";
import {
  CornerDownRight,
  PenLine,
  // Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import "@smastrom/react-rating/style.css";

export default function ReviewSection() {
  const reviewData = {
    5: 120,
    4: 60,
    3: 30,
    2: 10,
    1: 7,
  };

  const totalReviews = Object.values(reviewData).reduce((a, b) => a + b, 0);

  return (
    <div className="my-16">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl text-[#181D25] font-semibold dark:text-gray-100">
          Reviews{" "}
        </h2>
        <Button className="bg-[#EEF1F6] rounded-[8px] text-[#333D4C] text-sm font-medium">
          <PenLine /> Leave a review
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 mb-8">
        <div className="bg-[#F5F7FA] py-8 px-6 text-center rounded-[8px] w-full max-w-xs mx-auto">
          <div>
            <h2 className="text-[32px] md:text-[40px] text-[#181D25] font-semibold">
              4.2
            </h2>
            <Rating
              style={{ maxWidth: 80 }}
              value={3}
              readOnly
              className="mx-auto"
            />
            <p className="text-sm text-[#4E5562] font-normal mt-1">
              68 reviews
            </p>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-center md:justify-start">
          <div className="w-full max-w-md space-y-3">
            {([5, 4, 3, 2, 1] as const).map((star) => {
              const count = reviewData[star];
              const percent = (count / totalReviews) * 100;

              return (
                <div key={star} className="flex items-center gap-2">
                  <div className="w-12 text-sm font-medium">{star} star</div>
                  <div className="flex-1 bg-gray-200 h-2 rounded">
                    <div
                      className="bg-yellow-500 h-2 rounded"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="w-10 text-sm text-right text-gray-500">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* customer review */}
      <div className="my-8 border-b-2 border-b-[#E0E5EB] pb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-[#181D25] font-semibold dark:text-gray-100">
            Rafael Marquez
          </h3>
          <p className="text-sm text-[#6C727F] font-normal dark:text-gray-300">
            June 28, 2023
          </p>
        </div>
        <Rating
          style={{ maxWidth: 80 }}
          value={3}
          readOnly
          className="mt-4 mb-3"
        />
        <div className="flex gap-8 my-3">
          <div className="flex items-center gap-1">
            <h3 className="text-sm text-[#1B2027] font-medium dark:text-gray-100">
              Color:
            </h3>
            <p className="text-sm text-[#4E5562] font-normal dark:text-gray-400 ml-3">
              Black
            </p>
          </div>
          <div className="flex items-center gap-1">
            <h3 className="text-sm text-[#1B2027] font-medium dark:text-gray-100">
              Model:
            </h3>
            <p className="text-sm text-[#4E5562] font-normal dark:text-gray-400 ml-3">
              256GB
            </p>
          </div>
        </div>

        <p className="text-sm text-[#4E5562] font-normal my-3 dark:text-gray-400 ml-4 border-l-4 pl-2">
          The phone has a new A15 Bionic chip, which makes it lightning-fast and
          responsive. The camera system has also been upgraded, and it now
          includes a 12-megapixel ultra-wide lens and a 12-megapixel wide lens.
          The battery life is excellent, and it can easily last a whole day of
          heavy use.
        </p>

        <div className="flex items-center mb-2">
          <h3 className="text-sm text-[#181D25] font-medium dark:text-gray-100">
            Pros:
          </h3>
          <p className="text-sm text-[#4E5562] font-normal dark:text-gray-400 ml-3">
            Consequuntur magni, voluptatem sequi, tempora
          </p>
        </div>

        <div className="flex items-center mb-3">
          <h3 className="text-sm text-[#181D25] font-medium dark:text-gray-100">
            Cons:
          </h3>
          <p className="text-sm text-[#4E5562] font-normal dark:text-gray-400 ml-3">
            Architecto beatae, quis autem
          </p>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-1 items-center text-sm text-[#222934] font-medium dark:text-gray-100">
            <CornerDownRight /> Reply
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <ThumbsUp /> 0
            </div>
            <div className="h-6 w-[2px] bg-gray-500"></div>
            <div className="flex items-center gap-2">
              <ThumbsDown /> 0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
