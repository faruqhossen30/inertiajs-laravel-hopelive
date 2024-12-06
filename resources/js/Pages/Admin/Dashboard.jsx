import DashbardCard from '@/Components/Dashboard/DashbardCard';
import { db } from '@/firebase';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { GiftIcon, MicrophoneIcon, UserGroupIcon, UserIcon, UsersIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { collection, getAggregateFromServer, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [countUser, setCountUser] = useState(0);
    const [diamonds, setDiamonds] = useState(0);
    const [vip, sevVip] = useState(0);
    const [vvip, sevVvip] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const userQuerySnapshot = await getDocs(collection(db, "users"));
            setCountUser(userQuerySnapshot.docs.length);

            let totalDiamond = 0;
            let totalVip = 0;
            let totalVvip = 0;

            userQuerySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.diamond) { // Ensure the field exists
                    totalDiamond += data.diamond;
                }

                if(data.host){
                    totalhost++;
                }

                // Vip
                if(data.vip){
                    totalVip++;
                }

                // vVip
                if(data.vvip){
                    totalVvip++;
                }
            });

            setDiamonds(totalDiamond);
            sevVip(totalVip);
            sevVvip(totalVvip);
        };


        fetchData();
    }, []);
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <DashbardCard title={countUser} subtitle="Total Users" icon={<UserGroupIcon className="w-6 h-6 text-white" />} />
                <DashbardCard title={vip} subtitle="Total VIP" icon={<UsersIcon className="w-6 h-6 text-white" />} />
                <DashbardCard title={vvip} subtitle="Total VVIP" icon={<UsersIcon className="w-6 h-6 text-white" />} />
            </div>

        </AuthenticatedLayout>
    );
}
