import { FaBookOpen, FaRegClock, FaStar } from "react-icons/fa6";

const RecommendedCard = ({ title, description, lessons, duration, level }) => (
  <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-start shadow-sm mb-4">
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>

      <div className="flex gap-4 text-xs text-gray-500 mt-3 flex-wrap items-center">
        <span className="flex items-center gap-1.5"><FaBookOpen className="text-primary" /> {lessons} Lessons</span>
        <span className="flex items-center gap-1.5"><FaRegClock className="text-primary" /> {duration} Minutes</span>
        <span className="flex items-center gap-1.5"><FaStar className="text-yellow-500" /> {level}</span>
      </div>
    </div>

    <button
      className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
    >
      Start
    </button>
  </div>
);

export default RecommendedCard;