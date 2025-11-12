import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Feedback = () => {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState("🙂");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback:", entry);
    console.log("Mood:", mood);
    setEntry("");
    setMood("🙂");
    toast.success("😊 We respect your valuable feedback");
  };

  return (
    <section className="py-12 px-6 ">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Share Your Feedback
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gray-100 p-6 rounded-xl shadow-md"
      >
        {/* Mood Selector */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            How was your experience today?
          </label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option>🙂 Happy</option>
            <option>😐 Neutral</option>
            <option>😞 Sad</option>
            <option>😤 Frustrated</option>
            <option>😎 Satisfied</option>
          </select>
        </div>

        {/* Feedback Textarea */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Leave your comments or suggestions
          </label>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows="5"
            placeholder="What did you like? What could be improved?"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
        >
          Send Your Feedback
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </section>
  );
};

export default Feedback;
