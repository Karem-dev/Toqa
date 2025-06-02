import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import api from "../api/Api";

// Reusable star rating component
const StarRating = ({ rating, onRatingChange, interactive = false }) => (
  <div className="flex gap-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        className={`${star <= rating ? "text-yellow-500" : "text-gray-400"} 
          ${interactive ? "cursor-pointer" : ""}`}
        onClick={() => interactive && onRatingChange(star)}
      />
    ))}
  </div>
);

// Random data for comments
const randomComments = [
  {
    id: 1,
    user: {
      first_name: "Ahmed",
      last_name: "Mohamed",
      image: "/assets/images/userman.jpeg",
    },
    content:
      "Great learning experience! The instructors are very knowledgeable and supportive.",
    rating: 5,
  },
  {
    id: 2,
    user: {
      first_name: "Sarah",
      last_name: "Ali",
      image: "/assets/images/userman.jpeg",
    },
    content:
      "The courses are well-structured and the practical exercises are very helpful.",
    rating: 4,
  },
  {
    id: 3,
    user: {
      first_name: "Mohammed",
      last_name: "Hassan",
      image: "/assets/images/userman.jpeg",
    },
    content: "I've learned so much in such a short time. Highly recommended!",
    rating: 5,
  },
  {
    id: 4,
    user: {
      first_name: "Fatima",
      last_name: "Ibrahim",
      image: "/assets/images/userman.jpeg",
    },
    content:
      "The online platform is easy to use and the support team is very responsive.",
    rating: 4,
  },
  {
    id: 5,
    user: {
      first_name: "Omar",
      last_name: "Khalil",
      image: "/assets/images/userman.jpeg",
    },
    content:
      "The curriculum is comprehensive and up-to-date with industry standards.",
    rating: 5,
  },
];

const CustomerOpinionsSlider = () => {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  const { user, role } = useAuth();
  const isAuthenticated = !!user;
  const isAdmin = role === 1;

  const fetchComments = useCallback(async () => {
    try {
      const { data } = await api.get("/comments/accepted");
      if (data.comments && data.comments.length > 0) {
        setComments(data.comments);
      } else {
        // Use random comments if no comments are available
        setComments(randomComments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Use random comments if there's an error
      setComments(randomComments);
      // toast.error(t("rating.fetchError"));
    }
  }, [t]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/comments",
        {
          content: newComment,
          rating: Number(rating),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token00"),
          },
        }
      );

      setNewComment("");
      setRating(5);
      fetchComments();
      toast.success(t("rating.submitSuccess"));
    } catch (error) {
      const message = error.response?.data?.msg || t("rating.submitError");
      toast.error(message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const url = isAdmin ? `/admin/comments/${id}` : `/comments/${id}`;
      await api.delete(url);

      fetchComments();
      toast.success(t("rating.deleteSuccess"));
    } catch (error) {
      const message = error.response?.data?.error || t("rating.deleteError");
      toast.error(message);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4" id="opinions">
      <h1 className="text-3xl font-bold text-white hover:text-[#f5a425] mb-8 text-center">
        {t("rating.heading")}
      </h1>

      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-slate-700 text-white"
            placeholder={t("rating.placeholder")}
            maxLength={255}
            required
          />
          <div className="flex gap-2 mb-4">
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              interactive
            />
          </div>
          <button
            type="submit"
            className="bg-[#f5a425] text-white px-4 py-2 rounded hover:bg-[#d88f1f] transition-colors"
          >
            {t("rating.submit")}
          </button>
        </form>
      )}

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{ 1024: { slidesPerView: 2 } }}
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
                  src={comment?.user?.image || "/assets/images/userman.jpeg"}
                  alt={comment?.user?.first_name || "User"}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4 bg-white"
                />
                <div className="flex justify-center gap-1 mb-4">
                  <StarRating rating={comment.rating} />
                </div>
                <h3 className="text-xl font-bold text-[#f5a425] mb-2">
                  {`${comment?.user?.first_name || ""} ${
                    comment?.user?.last_name || ""
                  }`}
                </h3>
                <p className="text-white text-sm line-clamp-4">
                  {comment.content}
                </p>
                {(isAdmin ||
                  (isAuthenticated && comment.user_id === user?.id)) && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="absolute bottom-2 right-2 text-red-400 text-sm hover:text-red-300 transition-colors"
                  >
                    {t("rating.delete")}
                  </button>
                )}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomerOpinionsSlider;
