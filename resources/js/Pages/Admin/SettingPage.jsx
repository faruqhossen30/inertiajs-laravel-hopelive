'use client'
import {
    CogIcon
} from '@heroicons/react/24/outline'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import SettingSidebar from '@/Components/Dashboard/SettingSidebar'
import { Head, useForm } from '@inertiajs/react';
import { ErrorMessage, Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent';
import SubmitButton from '@/Components/Form/SubmitButton';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'


export default function SettingPage({ agora }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        project_name: '',
        app_id: '',
        app_certificate: '',
    });

    function submit(e) {
        e.preventDefault()
        post(route('settings.agora.store'));
        console.log(data);

    }

    return (
        <AuthenticatedLayout>

            <Head title="Gift Create" />
            {/* <BreadcumComponent pageOne="Categories" pageOneRoute="category.index" /> */}

            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-neutral-700">
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                        Agora Settings
                    </p>
                </div>
                <div className='p-5 border'>
                    <DescriptionList>
                        <DescriptionTerm>Project Name</DescriptionTerm>
                        <DescriptionDetails>{agora.project_name}</DescriptionDetails>

                        <DescriptionTerm>App ID</DescriptionTerm>
                        <DescriptionDetails>{agora.app_id}</DescriptionDetails>

                        <DescriptionTerm>App Certificate</DescriptionTerm>
                        <DescriptionDetails>{agora.app_certificate}</DescriptionDetails>

                        <DescriptionTerm>Update At</DescriptionTerm>
                        <DescriptionDetails>{agora.updated_at}</DescriptionDetails>
                    </DescriptionList>
                </div>
                <div className="p-4 md:p-5">
                    <div className=" px-2 py-2 sm:px-6 lg:px-4 mx-auto">
                        <form onSubmit={submit}>
                            <Field>
                                <Label>Project Name</Label>
                                <Input
                                    name="project_name"
                                    value={data.project_name}
                                    onChange={(e) => setData('project_name', e.target.value)}
                                />
                                {errors.name && <ErrorMessage>{errors.project_name}</ErrorMessage>}
                            </Field>

                            <Field>
                                <Label>App ID</Label>
                                <Input
                                    name="app_id"
                                    value={data.app_id}
                                    onChange={(e) => setData('app_id', e.target.value)}
                                />
                                {errors.app_id && <ErrorMessage>{errors.app_id}</ErrorMessage>}
                            </Field>

                            <Field>
                                <Label>App Certificate</Label>
                                <Input
                                    name="app_certificate"
                                    type="text"
                                    value={data.app_certificate}
                                    onChange={(e) => setData('app_certificate', e.target.value)}
                                />
                                {errors.app_certificate && <ErrorMessage>{errors.app_certificate}</ErrorMessage>}
                            </Field>


                            <div className="py-2">
                                <SubmitButton />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
