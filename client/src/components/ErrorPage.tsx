import { Link } from 'react-router-dom';
import { FiFileText, FiHome, FiEdit3 } from 'react-icons/fi';

const ErrorPage = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-center p-6 sm:p-10">
            {/* Illustration */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-8 shadow-lg">
                <FiFileText className="w-16 h-16 sm:w-20 sm:h-20 text-indigo-400" />
            </div>

            {/* Main Message */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Oops! No Posts Found
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md">
                It seems like there are no posts available at the moment. Why not be the first to share your thoughts?
            </p>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    to="/blogs"
                    className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    <FiHome className="w-5 h-5" />
                    Go Back Home
                </Link>
                <Link
                    to="/my-posts/publish"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    <FiEdit3 className="w-5 h-5" />
                    Publish a Blog
                </Link>
            </div>
        </div>
    );
}

export default ErrorPage
