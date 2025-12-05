import React, { useState } from 'react';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createPost } from '../store/postsSlice';
import { FiEdit3, FiFileText } from 'react-icons/fi';

const Publish: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.posts);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await dispatch(createPost({ title, content })).unwrap();
      toast.success('Story published successfully! 🎉');
      setTitle('');
      setContent('');
      navigate('/my-posts');
    } catch (error: any) {
      toast.error(error || 'Failed to publish the post');
    }
  };

  return (
    <Modal>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <FiEdit3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Your Story</h1>
            <p className="text-gray-500 text-sm">Share your thoughts with the world</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <FiFileText className="w-4 h-4" />
              <span>Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter a captivating title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-lg font-medium"
              required
            />
          </div>

          {/* Content Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Content</label>
            <textarea
              placeholder="Tell your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white min-h-[200px] resize-y"
              required
            />
          </div>

          {/* Character Count */}
          <div className="flex justify-between text-sm text-gray-500">
            <span>{content.split(/\s+/).filter(Boolean).length} words</span>
            <span>{Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)} min read</span>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <FiEdit3 className="w-4 h-4" />
                  <span>Publish Story</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Publish;
