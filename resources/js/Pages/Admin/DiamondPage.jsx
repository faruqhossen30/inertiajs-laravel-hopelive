import DashbardCard from '@/Components/Dashboard/DashbardCard';
import { db } from '@/firebase';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { GiftIcon, MicrophoneIcon, UserGroupIcon, UserIcon, UsersIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { collection, collectionGroup, getAggregateFromServer, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function DiamondPage() {
    const [diamonds, setDiamonds] = useState(0);
    const [todayTransctions, setTodayTransctions] = useState(0);
    const [todayTransctionDiamond, setTodayTransctionDiamond] = useState(0);
    const [todadyCommission, setTodayCommission] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const userQuerySnapshot = await getDocs(collection(db, "users"));

            let totalDiamond = 0;
            userQuerySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.diamond) { // Ensure the field exists
                    totalDiamond += data.diamond;
                }

            });

            setDiamonds(totalDiamond);
        };

        const fetchTranction = async () => {

            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            // Get the end of today's date (just before midnight)
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            // Reference the `send` subcollections across all documents
            const sendCollectionGroup = collectionGroup(db, "send");

            // Query Firestore for documents where the date is between start and end of today
            const q = query(
                sendCollectionGroup,
                where("createdAt", ">=", startOfDay),
                where("createdAt", "<=", endOfDay)
            );

            // Execute the query
            const userQuerySnapshot = await getDocs(q);

            setTodayTransctions(userQuerySnapshot.docs.length);

            let diamons = 0;
            let commissions = 0;

            userQuerySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.diamond) { // Ensure the field exists
                    diamons += data.diamond;
                }
                if (data.commission) { // Ensure the field exists
                    commissions += data.commission;
                }

            });

            setTodayTransctionDiamond(diamons);
            setTodayCommission(commissions)
        };


        fetchData();
        fetchTranction();
    }, []);
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Diamond " />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <DashbardCard title={diamonds} subtitle="Total Diamond" icon={<GiftIcon className="w-6 h-6 text-white" />} />
                <DashbardCard title={todayTransctions} subtitle="Today Transction" icon={<GiftIcon className="w-6 h-6 text-white" />} />
                <DashbardCard title={todayTransctionDiamond} subtitle="Today Transction Diamond" icon={<GiftIcon className="w-6 h-6 text-white" />} />
                <DashbardCard title={todadyCommission} subtitle="Today Commission" icon={<GiftIcon className="w-6 h-6 text-white" />} />
            </div>

        </AuthenticatedLayout>
    );
}
