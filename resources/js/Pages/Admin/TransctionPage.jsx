import DashbardCard from '@/Components/Dashboard/DashbardCard';
import { db } from '@/firebase';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { GiftIcon, MicrophoneIcon, UserGroupIcon, UserIcon, UsersIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { collection, collectionGroup, getAggregateFromServer, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'

export default function TransctionPage() {
    const[transctions, setTransction] = useState([]);

    useEffect(() => {
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

            const querySnapshot = await getDocs(q);

            const items = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setTransction(items);

        };

        fetchTranction();

    }, []);
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Diamond " />
            <h4>Today Transctions</h4>
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">

                            {/* <!-- Table --> */}
                            <Table className="px-6" dense>
                                <TableHead>
                                    <TableRow>
                                        <TableHeader>S.N</TableHeader>
                                        <TableHeader>Diamond</TableHeader>
                                        <TableHeader>Commission</TableHeader>
                                        <TableHeader>Title</TableHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transctions.map((transction, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{index + 1}</TableCell>

                                            <TableCell className="font-medium">{transction.diamond}</TableCell>
                                            <TableCell className="font-medium">
                                                {transction.commission}
                                            </TableCell>
                                            <TableCell className="text-zinc-500">
                                                {transction.description}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* <!-- End Table --> */}
                            <hr className="dark:border-gray-700" />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
