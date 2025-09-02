import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import StarRatings from "react-star-ratings";
import { format, formatDistanceToNow } from "date-fns";

function ReviewsPopup({ onclose, property, reviews }) {
  // Function to format a review date into a readable form
  const formatReviewDate = (dateString) => {
    const date = new Date(dateString); // Convert the given date string into a Date object
    const now = new Date();

    // Check if the review date is in the same month and year as the current date
    if (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return formatDistanceToNow(date, { addSuffix: true }); // e.g., "2 weeks ago"
    } else {
      return format(date, "MMMM yyyy"); // e.g., "May 2025"
    }
  };

  return (
    // Popup component to display all reviews for a property
    <div
      onClick={onclose}
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center p-20 w-full"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border-2 p-2 w-[70%] relative bg-white rounded-md flex flex-col gap-6"
      >
        {/* Close icon at top-right corner */}
        <IoIosCloseCircleOutline
          onClick={onclose}
          className="cursor-pointer hover:text-black/50 absolute right-2"
          size={30}
        />
        {/* Header section: Average rating & total reviews */}
        <div className=" flex items-center space-x-20">
          {/* Average rating with star */}
          <div className="flex items-center gap-1">
            <h1 className="text-2xl font-semibold">{property?.ratings.toFixed(2)}</h1>
            <FaStar /> 
          </div>
          {/* Total reviews count */}
          <div className="text-2xl font-semibold">
            {property?.ratingCount} Reviews
          </div>
        </div>
        <h1 className="text-lg font-medium ">All Reviews</h1>
        {/* Scrollable list of reviews */}
        <div className="flex flex-col gap-8 overflow-y-auto">
          {reviews ? (
            reviews.map((review) => (
              <div key={review._id} className="flex flex-col gap-1">
                {/* Reviewer profile section */}
                <div className="flex gap-2 items-center">
                  {/* User profile picture or initials */}
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
                  {/* Vertical separator */}
                  <div className="h-[50px] w-[2px] bg-gray-300"></div>
                  {/* Reviewer name */}
                  <p className="font-semibold">{review?.user?.fullname}</p>
                </div>
                {/* Review content section */}
                <div className="flex flex-col gap-1 ">
                  {/* Star rating & review date */}
                  <div className="flex gap-1 items-center ">
                    <StarRatings
                      rating={review?.rating}
                      starRatedColor="#FF385C"
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                      starSpacing="2px"
                    />
                    {/* Formatted review date */}
                    <p className="pt-1 text-sm">
                      {formatReviewDate(review?.createdAt)}
                    </p>
                  </div>
                  {/* Review comment */}
                  <p>{review?.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div>No reviews found</div> // If no reviews exist
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewsPopup;
