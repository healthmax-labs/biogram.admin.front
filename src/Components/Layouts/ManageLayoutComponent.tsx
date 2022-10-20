import { Outlet } from 'react-router-dom'
import { Sidebar, Navbar, Footer, HeaderStats } from '@Element/Layouts/Manage'

export default function ManageLayoutComponent() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <Navbar />
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    )
}
