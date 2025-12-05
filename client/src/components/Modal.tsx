import { useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const navigate = useNavigate();

  const closeHandler = () => {
    navigate('..');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={closeHandler}
      />
      
      {/* Modal Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-scale-in">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={closeHandler}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
          
          {/* Content */}
          <div className="p-6 sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

