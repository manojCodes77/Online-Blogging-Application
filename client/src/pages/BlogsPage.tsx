import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import ErrorPage from "../components/ErrorPage";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAllPosts, fetchMyPosts, removePost } from "../store/postsSlice";
import { FiEdit3, FiBookOpen, FiFileText } from "react-icons/fi";

interface BlogsPageProps {
  unique: boolean;
}

const BlogsPage: React.FC<BlogsPageProps> = ({ unique }) => {
  const dispatch = useAppDispatch();
  const { posts, isLoading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (unique) {
      dispatch(fetchMyPosts());
    } else {
      dispatch(fetchAllPosts());
    }
  }, [unique, dispatch]);

  const handlePostDelete = (id: string) => {
    dispatch(removePost(id));
  };

  if (isLoading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-indigo-50/30 py-8">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <Loader />
          <Loader />
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <ErrorPage />
        <Outlet />
      </>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-indigo-50/30 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-3">
            {unique ? (
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <FiFileText className="w-6 h-6 text-white" />
              </div>
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <FiBookOpen className="w-6 h-6 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {unique ? "My Stories" : "Explore Stories"}
              </h1>
              <p className="text-gray-500 text-sm">
                {unique ? "Manage your published content" : "Discover amazing content from our community"}
              </p>
            </div>
          </div>
          
          {unique && (
            <Link
              to="/my-posts/publish"
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200"
            >
              <FiEdit3 className="w-4 h-4" />
              <span>Write Story</span>
            </Link>
          )}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onDelete={handlePostDelete}
                unique={unique}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiFileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories yet</h3>
            <p className="text-gray-500 mb-6">
              {unique
                ? "Start writing your first story and share it with the world!"
                : "Be the first to share something amazing with our community!"}
            </p>
            {unique && (
              <Link
                to="/my-posts/publish"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <FiEdit3 className="w-4 h-4" />
                <span>Write Your First Story</span>
              </Link>
            )}
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default BlogsPage;
