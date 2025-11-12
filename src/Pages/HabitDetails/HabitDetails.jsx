import React, { use, useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import { useParams } from "react-router";
import "../../App.css";
import { AuthContext } from "../../AuthContext/AuthContext";

const HabitDetails = () => {
  const { user } = use(AuthContext);
  // const uesrName = user.displayName;
  // console.log();
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    fetch(`https://habit-tracker-server-teal.vercel.app/habits/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHabit(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load habit:", err);
        setLoading(false);
      });
  }, [id, user]);

  const handleMarkComplete = () => {
    if (!habit) return;
    setMarking(true);

    fetch(
      `https://habit-tracker-server-teal.vercel.app/habits/${id}/complete`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const today = new Date().toISOString();
          setHabit((prev) => ({
            ...prev,
            completionHistory: [...(prev.completionHistory || []), today],
            currentStreak: prev.currentStreak + 1,
            updatedAt: today,
          }));
        }
        setMarking(false);
      })
      .catch((err) => {
        console.error("❌ Failed to mark complete:", err);
        setMarking(false);
      });
  };

  if (loading || !habit)
    return (
      <div className="habit-content">
        <Spinner />
      </div>
    );

  const {
    title,
    description,
    imageURL,
    category,
    currentStreak,
    completionHistory,
     user: creator,
    createdAt,
  } = habit;
console.log(habit);
  const completedDays = completionHistory?.length || 0;
  const progressPercent = Math.min((completedDays / 30) * 100, 100).toFixed(0);
  const today = new Date().toISOString().split("T")[0];
  const alreadyMarked = completionHistory?.some((d) => d.startsWith(today));

  return (
    <div className="habit-content">
      <title>{title}</title>
      <div className="habit-card">
        <img
          src={imageURL || "https://source.unsplash.com/400x200/?habit,focus"}
          alt="Habit"
          className="habit-image"
        />
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <span className="text-sm bg-purple-600 text-white px-3 py-1 rounded-full mb-4 inline-block">
          {category}
        </span>
        <p className="text-gray-700 mb-4">{description}</p>

        {/* Progress */}
        <div className="mb-4 text-left">
          <label className="text-sm font-medium text-gray-600">
            Progress: {completedDays}/30 days completed
          </label>
          <div className="habit-progress-bar">
            {/* % er opor base kore barabe */}
            <div
              className="habit-progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">(Last 30 Days)</p>
        </div>

        {/* Streak Badge */}
        <div className="mb-4">
          <div className="habit-streak-badge">
            🔥 {currentStreak}-Day Streak
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={user?.photoURL || "https://i.pravatar.cc/100?img=12"}
            alt="Creator"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">
              Created by: {creator.name || "Unknown"}
            </p>
            <p className="text-xs text-gray-500">
              Started on: {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Mark Complete Button */}
        <button
          className="btn bg-purple-600 text-white hover:bg-purple-700 w-full disabled:opacity-50"
          onClick={handleMarkComplete}
          disabled={alreadyMarked || marking}
        >
          {alreadyMarked
            ? "Already Marked Today"
            : marking
            ? "Marking..."
            : "Mark Today as Complete"}
        </button>
      </div>
    </div>
  );
};

export default HabitDetails;
