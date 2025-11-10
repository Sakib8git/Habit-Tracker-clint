import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Spinner from "../../Components/Spinner/Spinner";
import { useParams } from "react-router";

const HabitDetails = () => {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/habits/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHabit(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load habit:", err);
        setLoading(false);
      });
  }, [id]);

  const handleMarkComplete = () => {
    if (!habit) return;
    setMarking(true);

    fetch(`http://localhost:3000/habits/${id}/complete`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const today = new Date().toISOString();
          setHabit((prev) => ({
            ...prev,
            completionHistory: [...prev.completionHistory, today],
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
      <Content>
        <Spinner />
      </Content>
    );

  const { title, description, imageURL, category, currentStreak, completionHistory, user, createdAt } = habit;
  const completedDays = completionHistory?.length || 0;
  const progressPercent = Math.min((completedDays / 30) * 100, 100).toFixed(0);
  const today = new Date().toISOString().split("T")[0];
  const alreadyMarked = completionHistory?.some((d) => d.startsWith(today));

  return (
    <Content>
      <Card>
        <Image src={imageURL || "https://source.unsplash.com/400x200/?habit,focus"} alt="Habit" />
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <span className="text-sm bg-purple-600 text-white px-3 py-1 rounded-full mb-4 inline-block">
          {category}
        </span>
        <p className="text-gray-700 mb-4">{description}</p>

        {/* Progress */}
        <div className="mb-4 text-left">
          <label className="text-sm font-medium text-gray-600">Progress (Last 30 Days)</label>
          <ProgressBar>
            <ProgressFill style={{ width: `${progressPercent}%` }} />
          </ProgressBar>
          <p className="text-sm text-gray-500 mt-1">
            {completedDays}/30 days completed
          </p>
        </div>

        {/* Streak Badge */}
        <div className="mb-4">
          <StreakBadge>🔥 {currentStreak}-Day Streak</StreakBadge>
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
              Created by: {user?.name || "Unknown"}
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
          {alreadyMarked ? "Already Marked Today" : marking ? "Marking..." : "Mark Today as Complete"}
        </button>
      </Card>
    </Content>
  );
};

export default HabitDetails;

const Content = styled.div`
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  height: 10px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #9333ea;
  transition: width 0.3s ease;
`;

const StreakBadge = styled.div`
  display: inline-block;
  background: #facc15;
  color: #92400e;
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.875rem;
`;