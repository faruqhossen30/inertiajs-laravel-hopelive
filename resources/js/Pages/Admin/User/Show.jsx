import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent'
import { db } from '@/firebase'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CogIcon, EyeIcon, PencilIcon, PlusCircleIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { collection, doc, getDoc, getDocs, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import moment from 'moment'
import { DeleteAlert } from '@/Components/Alert/DeleteAlert'
import { StatusAlert } from '@/Components/Alert/StatusAlert'
import { Button } from '@/Components/button'


const Show = () => {
    const { uid } = route().params;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const docRef = doc(db, "users", uid); // specify your collection and document ID
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUser(docSnap.data());
                    console.log(docSnap.data());

                } else {
                    setError("Document does not exist!");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDocument();
    }, []);




    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12 bg-white p-5">
                {loading && <p>Loading</p>}
                {error && <p className="text-red-600">{error}</p>}

                {user && <DescriptionList>
                    <DescriptionTerm>Photo</DescriptionTerm>
                    <DescriptionDetails>
                        <img src={user.photoURL} alt="photo" className="h-20 rounded border" />
                    </DescriptionDetails>

                    <DescriptionTerm>Name</DescriptionTerm>
                    <DescriptionDetails>{user.name}</DescriptionDetails>

                    <DescriptionTerm>Email</DescriptionTerm>
                    <DescriptionDetails>{user.email}</DescriptionDetails>

                    <DescriptionTerm>ID</DescriptionTerm>
                    <DescriptionDetails>{user.id}</DescriptionDetails>

                    <DescriptionTerm>Diamond</DescriptionTerm>
                    <DescriptionDetails>{user.diamond}</DescriptionDetails>

                    <DescriptionTerm>Level</DescriptionTerm>
                    <DescriptionDetails>{user.level}</DescriptionDetails>


                    <DescriptionTerm>VIP</DescriptionTerm>
                    <DescriptionDetails>
                        {user.vip ?
                            <Link href={route('admin.user.viptoggle', user.uid)} method="post" as="button" className="flex text-red-500 items-center space-x-1 border p-1 rounded-md dark:border-gray-700 text-gray-500">
                                <XMarkIcon className="w-4 h-4" />
                                <span>Remove VIP</span>
                            </Link>

                            : <Link href={route('admin.user.viptoggle', user.uid)} method="post" as="button" className="flex text-red-500 items-center space-x-1 border p-1 rounded-md dark:border-gray-700 text-gray-500">
                                <PlusIcon className="w-4 h-4" />
                                <span>Add VIP</span>
                            </Link>

                        }
                    </DescriptionDetails>

                    <DescriptionTerm>VVIP</DescriptionTerm>
                    <DescriptionDetails>
                        {user.vip ?
                            <Link href={route('admin.user.vviptoggle', user.uid)} method="post" as="button" className="flex text-red-500 items-center space-x-1 border p-1 rounded-md dark:border-gray-700 text-gray-500">
                                <XMarkIcon className="w-4 h-4" />
                                <span>Remove VVIP</span>
                            </Link>

                            : <Link href={route('admin.user.vviptoggle', user.uid)} method="post" as="button" className="flex text-red-500 items-center space-x-1 border p-1 rounded-md dark:border-gray-700 text-gray-500">
                                <PlusIcon className="w-4 h-4" />
                                <span>Add VVIP</span>
                            </Link>

                        }
                    </DescriptionDetails>




                </DescriptionList>}
            </div>

        </AuthenticatedLayout>
    )
}

export default Show
