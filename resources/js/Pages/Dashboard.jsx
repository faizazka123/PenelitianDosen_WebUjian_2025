import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import KodeInputForm from "@/Components/KodeInputForm";
import { Head, usePage } from "@inertiajs/react";
import Card from "@/Components/Card";
import CardList from "@/Components/CardList";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function Dashboard(kerjas) {
    const { flash } = usePage().props;

    console.log(flash);

    useEffect(() => {
        if (flash.error) {
            Swal.fire({
                icon: 'error',
                title: 'Dikeluarkan dari Ujian',
                text: flash.error,
            });
        }
    }, [flash.error]);

    return (
        <AuthenticatedLayout title="Dashboard">
            <Head title="Dashboard" />

            <Card type="profile" props={kerjas.auth} />

            <div className="py-7">
                <div className={`mx-auto max-w-7xl sm:px-6 lg:px-8`}>
                    {flash.success && (
                        <div
                            className="bg-green-100 border mb-5 border-green-400 text-green-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong className="font-bold">Success!</strong>
                            <span className="block sm:inline">
                                {" "}
                                {flash.success}
                            </span>
                        </div>
                    )}
                    {/* {flash.error && (
                        <div
                            className="bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline">
                                {" "}
                                {flash.error}
                            </span>
                        </div>
                    )} */}

                    <KodeInputForm className="float-right mb-5 me-5" />

                    <div className="clear-both bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mx-3 mb-5 w-full">
                            <h3 className="text-xl border-b-2 shadow-md border-black font-bold">
                                Daftar Ujian
                            </h3>
                        </div>
                        {kerjas.kerjas.data.length > 0 ? (
                            kerjas.kerjas.data.map((kerja, index) => (
                                <div key={index}>
                                    <CardList props={kerja} />
                                </div>
                            ))
                        ) : (
                            <div>Belum Ada Ujian</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
