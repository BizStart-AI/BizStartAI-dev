import { FaRegClock } from "react-icons/fa6";

const InProgressCourseCard = ({ title, description, completedLessons, totalLessons, duration }) => {
  const progressPercent = (completedLessons / totalLessons) * 100;

  return (
    <div className="bg-gray-50 rounded-2xl p-4 mb-4 shadow-sm">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>

      {/* Progress Bar */}
      <div className="mt-3 bg-gray-200 rounded-full h-2 w-full">
        <div
          style={{ width: `${progressPercent}%` }}
          className="h-2 rounded-full bg-primary"
        ></div>
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-2 items-center">
        <span>Lessons: {completedLessons}/{totalLessons}</span>
        <span className="flex items-center gap-1"><FaRegClock /> {duration} mins</span>
      </div>
    </div>
  );
};

export default InProgressCourseCard;