import React from "react";
import { Post } from "../types/Post";
import Avatar from "react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FiClock, FiArrowRight } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

// Utility function to calculate time elapsed
const timeElapsed = (createdAt: string): string => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const differenceInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  if (differenceInSeconds < 60) return `${differenceInSeconds} seconds ago`;
  if (differenceInSeconds < 3600) return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
  if (differenceInSeconds < 86400) return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
  return `${Math.floor(differenceInSeconds / 86400)} days ago`;
};

// Calculate read time
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

interface BlogCardProps {
  post: Post;
  onDelete: (id: string) => void;
  unique: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onDelete, unique }) => {
  const authorName = post.author.name || "Unknown Author";
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to delete posts");
      return;
    }

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/post/delete/${post.id}`, {
        headers: { Authorization: token },
      });
      onDelete(post.id);
      toast.success("Post deleted successfully");
      navigate("/my-posts");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const linkTo = unique ? `/blog/${post.id}` : `/others-blog/${post.id}`;

  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-6 sm:p-8">
        {/* Author Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar
              name={authorName}
              size="44"
              round={true}
              className="ring-2 ring-indigo-100"
            />
            <div>
              <p className="font-medium text-gray-900">{authorName}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{timeElapsed(post.createdAt)}</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <FiClock className="w-3 h-3" />
                  <span>{calculateReadTime(post.content)}</span>
                </span>
              </div>
            </div>
          </div>

          {unique && (
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              aria-label="Delete post"
            >
              <MdDelete className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <Link to={linkTo} className="block group/link">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover/link:text-indigo-600 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
            {post.content.split(" ").slice(0, 50).join(" ")}...
          </p>
        </Link>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              post.published
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {post.published ? "Published" : "Draft"}
            </span>
          </div>
          
          <Link
            to={linkTo}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm group/read"
          >
            <span>Read more</span>
            <FiArrowRight className="w-4 h-4 group-hover/read:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
