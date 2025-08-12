import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import StarRatings from "react-star-ratings";
import { format, formatDistanceToNow } from "date-fns";


function ReviewsPopup({ onclose, property, reviews }) {

   const formatReviewDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
      return formatDistanceToNow(date, { addSuffix: true }); // e.g., "2 weeks ago"
    } else {
      return format(date, "MMMM yyyy"); // e.g., "May 2025"
    }
  };

  return (
    <div onClick={onclose} className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center p-20 w-full">
      <div onClick={(e) => e.stopPropagation()} className="border-2 p-2 w-[70%] relative bg-white rounded-md flex flex-col gap-6">
        <IoIosCloseCircleOutline
          onClick={onclose}
          className="cursor-pointer hover:text-black/50 absolute right-2"
          size={30}
        />
        <div className=" flex items-center space-x-20">
          <div className="flex items-center gap-1">
            <h1 className="text-2xl font-semibold">{property?.ratings}</h1>
            <FaStar />
          </div>
          <div className="text-2xl font-semibold">
            {property?.ratingCount} Reviews
          </div>
        </div>
        <h1 className="text-lg font-medium ">All Reviews</h1>
        <div className="flex flex-col gap-8 overflow-y-auto">
          {reviews ? (
            reviews.map((review) => (
              <div key={review._id} className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <div className="rounded-full  h-[50px] w-[50px] bg-gray-700 flex items-center justify-center overflow-hidden">
                    {review?.user?.profilepic !== "" ? (
                      <img
                        className="h-full w-full object-cover rounded-full"
                        src={review?.user?.profilepic}
                        alt=""
                      />
                    ) : (
                      <p className="text-white font-medium">
                        {review?.user?.fullname
                          ?.split(" ")
                          .map((name) => name[0])
                          .join(" ")
                          .toUpperCase()}
                      </p>
                    )}
                  </div>
                  <div className="h-[50px] w-[2px] bg-gray-300"></div>
                  <p className="font-semibold">{review?.user?.fullname}</p>
                </div>
                <div className="flex flex-col gap-1 ">
                  <div className="flex gap-1 items-center ">
                    <StarRatings
                      rating={review?.rating} 
                      starRatedColor="#FF385C"
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="2px"
                    />
                    <p className="pt-1 text-sm">{formatReviewDate(review?.createdAt)}</p>
                  </div>
                  <p>{review?.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div>No reviews found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewsPopup;
