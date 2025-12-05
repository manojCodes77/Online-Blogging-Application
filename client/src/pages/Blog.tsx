import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import { FiClock, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchPostById, deletePost, clearCurrentPost } from '../store/postsSlice';

interface BlogProps {
    unique: boolean;
}

const Blog: React.FC<BlogProps> = ({ unique }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { currentPost: post, isLoading } = useAppSelector((state) => state.posts);

    useEffect(() => {
        if (id) {
            dispatch(fetchPostById(id));
        }
        return () => {
            dispatch(clearCurrentPost());
        };
    }, [id, dispatch]);

    const formatTimeOrDate = (createdAt: string): string => {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const differenceInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

        if (differenceInSeconds < 86400) {
            if (differenceInSeconds < 60) return `${differenceInSeconds} seconds ago`;
            if (differenceInSeconds < 3600) return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
            return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
        }

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(createdDate);
    };

    const calculateReadTime = (content: string): string => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    };

    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure you want to delete this post?');
        if (confirm && id) {
            try {
                await dispatch(deletePost(id)).unwrap();
                toast.success('Post deleted successfully');
                navigate('/my-posts');
            } catch {
                toast.error('Failed to delete post');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex-1 bg-gradient-to-br from-gray-50 to-indigo-50/30 py-8">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Loader />
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50/30">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    const authorName = post.author.name || 'Unknown Author';

    return (
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-indigo-50/30 py-8">
            <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 mb-8 transition-colors"
                >
                    <FiArrowLeft className="w-4 h-4" />
                    <span>Back to stories</span>
                </button>

                {/* Article Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="p-6 sm:p-10 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <Avatar
                                    name={authorName}
                                    size="56"
                                    round={true}
                                    className="ring-2 ring-indigo-100"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900 text-lg">{authorName}</p>
                                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                                        <span className="flex items-center space-x-1">
                                            <FiCalendar className="w-3.5 h-3.5" />
                                            <span>{formatTimeOrDate(post.createdAt)}</span>
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center space-x-1">
                                            <FiClock className="w-3.5 h-3.5" />
                                            <span>{calculateReadTime(post.content)}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <span className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                                    post.published
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {post.published ? 'Published' : 'Draft'}
                                </span>
                                {unique && (
                                    <button
                                        onClick={handleDelete}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        aria-label="Delete post"
                                    >
                                        <MdDelete className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                            {post.title}
                        </h1>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-10">
                        <div className="prose prose-lg prose-indigo max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {post.content}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 sm:px-10 py-6 bg-gray-50 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Post ID: <span className="font-mono text-xs">{post.id}</span>
                            </p>
                            <button
                                onClick={() => navigate(-1)}
                                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                            >
                                ← Back to stories
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default Blog;
