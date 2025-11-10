import React from "react";
import { useNavigate } from "react-router";
import "./Button.css";

const HabbitCard = ({ habits }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/habits/${id}`);
  };

  return (
    <section className="py-12 px-6">
      <div className="flex flex-wrap justify-center gap-8">
        {habits.map((habit, index) => (
          <div
            key={index}
            className={`m-2 group px-10 py-5 bg-white/20 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-lime-400 z-20 shadow-xl after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0 [&_p]:delay-200 [&_p]:transition-all w-80`}
          >
            <div
              className={`w-32 h-32 rounded-full bg-gradient-to-r from-lime-400 to-lime-600 p-2 transition-all duration-300 group-hover:-translate-y-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]`}
              style={{
                backgroundImage: `url(${habit.imageURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <p className="font-semibold text-gray-800 tracking-wider group-hover:text-gray-900 text-xl">
              {habit.title}
            </p>
            <p className="font-semibold text-gray-600 text-xs text-center group-hover:text-gray-800">
              {habit.description}
            </p>
            {habit.isPublic && (
              <p className="text-xs text-gray-500 italic group-hover:text-gray-700">
                Creator: {habit.user?.name}
              </p>
            )}
            <button
              onClick={() => handleViewDetails(habit._id)}
              className="btnCus"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HabbitCard;
