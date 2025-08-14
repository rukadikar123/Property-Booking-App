import React from "react";

// Popup component to remind the user about a pending rating
function PendingRatingPopup({ onRateNow, onClose }) {
  return (
    // Full-screen dark overlay
    <section className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center">
      {/* Popup container */}
      <div className="absolute top-10 transform -translate-x-1/2 left-1/2 bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center space-y-4">
        {/* Popup title */}
        <h2 className="text-lg font-semibold text-gray-800">Pending Rating</h2>
        {/* Message text */}
        <p className="text-gray-600">
          You haven’t rated your last booking yet.
        </p>
        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onRateNow}
            className="bg-[#FF385C] text-white px-4 py-2 rounded-md hover:bg-[#e02c4e] transition"
          >
            Rate Now
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Later
          </button>
        </div>
      </div>
    </section>
  );
}

export default PendingRatingPopup;
