import { Outlet } from "react-router-dom"
import Navbar from "./navbar"

function Layout() {

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout