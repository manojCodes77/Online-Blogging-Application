const Loader: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 animate-pulse border border-gray-100">
            {/* Author skeleton */}
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-11 h-11 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                </div>
            </div>
            
            {/* Title skeleton */}
            <div className="w-3/4 h-6 bg-gray-200 rounded mb-4"></div>
            
            {/* Content skeleton */}
            <div className="space-y-3">
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
            </div>

            {/* Footer skeleton */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default Loader;
