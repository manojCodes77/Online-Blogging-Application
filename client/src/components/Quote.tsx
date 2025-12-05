import { FiBookOpen } from 'react-icons/fi';

const Quote = () => {
  return (
    <div className="hidden lg:flex bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 items-center justify-center min-h-screen lg:w-1/2 p-8 lg:p-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-white"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white"></div>
      </div>

      {/* Quote Content */}
      <div className="relative z-10 max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm mb-8">
          <FiBookOpen className="w-8 h-8 text-white" />
        </div>
        
        <blockquote className="text-2xl lg:text-3xl font-medium text-white leading-relaxed mb-6">
          "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
        </blockquote>
        
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg">
            JD
          </div>
          <div className="text-left">
            <p className="text-white font-semibold">Jules Winnfield</p>
            <p className="text-white/70 text-sm">CEO, Acme Inc</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
