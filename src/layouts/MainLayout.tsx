import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

export default function MainLayout() {
  return (
    <div>
        <Navbar />
        <main className="pt-20">
          <Outlet />
        </main>
    </div>
  )
}
