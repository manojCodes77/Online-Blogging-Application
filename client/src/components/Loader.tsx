// const Loader = () => {
//     return (
//         <div>
//             {/* <div classNameName="flex items-center justify-center min-h-screen bg-gray-100">
//                 <div classNameName="flex space-x-2">
//                     <div classNameName="w-6 h-6 bg-blue-500 animate-bounce rounded"></div>
//                     <div classNameName="w-6 h-6 bg-green-500 animate-bounce rounded animation-delay: 0.2s" ></div>
//                     <div classNameName="w-6 h-6 bg-red-500 animate-bounce rounded animation-delay: 0.4s"></div>
//                 </div>
//             </div> */}
//             <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//                 <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg animate-pulse">
//                     <div className="w-full h-6 bg-gray-300 rounded mb-4"></div> {/* Title skeleton */}
//                     <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 1 */}
//                     <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 2 */}
//                     <div className="w-full h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 3 */}
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Loader
const Loader: React.FC = () => {
    return (
        <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg animate-reload-effect">
            <div className="w-full h-6 bg-gray-300 rounded mb-4"></div> {/* Title skeleton */}
            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 1 */}
            <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 2 */}
            <div className="w-full h-4 bg-gray-300 rounded mb-2"></div> {/* Content line 3 */}
        </div>
    );
};

export default Loader;
