import { useNavigate } from 'react-router-dom';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const navigate = useNavigate();

  const closeHandler = () => {
    navigate('..'); // Dynamically go back to the parent route
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 z-10"
        onClick={closeHandler}
      />
      {/* Modal Dialog */}
      <dialog
        open
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-20 overflow-hidden"
      >
        {children}
      </dialog>
    </>
  );
};

export default Modal;

