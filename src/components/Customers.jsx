import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const CustomerOpinionsSlider = () => {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  // Authentication Context
  const { user, role } = useAuth(); // Access current user and role from context
  const isAuthenticated = !!user; // Checks if a user is logged in
  const isAdmin = role == 1; // Admin role check

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/acceptedComments`);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8000/api/create-comment`,
        { content: newComment, rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewComment("");
      setRating(5);
      fetchComments();
      toast.success(t("rating.success"));
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error(t("rating.error"));
    }
  };

  const handleDelete = async (id) => {
    try {
      const url = isAdmin
        ? `http://localhost:8000/api/admin/comments/${id}`
        : `http://localhost:8000/api/user/comments/${id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchComments();
      toast.success(t("rating.deleteSuccess"));
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error(t("rating.deleteError"));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4" id="opinions">
      <h1 className="text-3xl font-bold text-white hover:text-[#f5a425] mb-8 text-center">
        {t("rating.heading")}
      </h1>

      {/* Comment Form */}
      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-slate-700 text-white"
            placeholder={t("rating.placeholder")}
            maxLength={500}
            required
          />
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer ${
                  star <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <button type="submit" className="bg-[#f5a425] text-white px-4 py-2 rounded">
            {t("rating.submit")}
          </button>
        </form>
      )}

      {/* Display Comments */}
      {comments.length === 0 ? (
        <p className="text-center text-white">{t("rating.noComments")}</p>
      ) : (
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            1024: { slidesPerView: 2 },
          }}
        >
          {comments.map((comment) => (
            <SwiperSlide key={comment.id}>
              <motion.div
                className="flex justify-center items-center mt-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-slate-800 cursor-grab rounded-xl w-full max-w-[400px] h-[350px] relative shadow-lg border border-white p-6 text-center">
                  <img
                    src={comment.user?.image || "/assets/images/userman.jpeg"}
                    alt={comment.user?.first_name || "User"}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-4 bg-white"
                  />
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: comment.rating }, (_, index) => (
                      <FaStar key={index} className="text-yellow-500" />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-[#f5a425] mb-2">
                    {`${comment.user?.first_name || ""} ${comment.user?.last_name || ""}`}
                  </h3>
                  <p className="text-white text-sm">{comment.content}</p>
                  {isAuthenticated && comment.user_id === user.id && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="absolute bottom-2 right-2 text-red-400 text-sm"
                    >
                      {t("rating.delete")}
                    </button>
                  )}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CustomerOpinionsSlider;
