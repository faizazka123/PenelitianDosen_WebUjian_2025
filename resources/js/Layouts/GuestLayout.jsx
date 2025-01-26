import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 justify-center">


            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                <div className='flex items-center justify-center py-5'>
                    <img className="h-20 w-20 fill-current" src="/LogoPendidikan.png" alt="Tut Wuri Handayani" />
                </div>

                {children}
            </div>
        </div>
    );
}
