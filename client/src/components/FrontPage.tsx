import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const FrontPage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 justify-between">
        <Header />
        <Outlet />
        <Footer />
      </div>

    </>
  )
}

export default FrontPage
