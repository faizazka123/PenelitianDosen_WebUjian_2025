import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Card from "@/Components/Card";
import CardList from "@/Components/CardList";

export default function Dashboard(kerjas) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <Card type="profile" props={kerjas.auth} />
            <div className="overflow-auto ">
                <PrimaryButton className="mt-3 float-right me-5">
                    + Masuk Ujian
                </PrimaryButton>
            </div>
            <div className="py-6 mx-5 ">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-3 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold w-full border-b-2 border-black mb-5">
                            <span className="ps-4">Daftar Ujian</span>
                        </h3>
                        <CardList />
                        {/* <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">
                                        Mata Pelajaran
                                    </th>
                                    <th className="border px-4 py-2 hidden sm:table-cell">
                                        Tahun Ajaran
                                    </th>
                                    <th className="border px-4 py-2">Durasi</th>
                                    <th className="border px-4 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">judul</td>
                                    <td className="border px-4 py-2 hidden sm:table-cell">
                                        2024/2025
                                    </td>
                                    <td className="border px-4 py-2">
                                        1:30:00
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                                            onClick={() =>
                                                alert(`Masuk ke ujian`)
                                            }
                                        >
                                            Masuk
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table> */}
                    </div>

                    {/* <pre>{JSON.stringify(kerjas, undefined, 2)}</pre> */}

                    <div></div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
