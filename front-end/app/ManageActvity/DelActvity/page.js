"use client";
import { useEffect, useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";



export default function DelActvity() {
    const searchParams = useSearchParams(); // ใช้ useSearchParams() อ่านค่าจาก URL

    const [id, setId] = useState(null);
    const [title, setTitle] = useState(null);
    const [data, setData] = useState(null);
    const [dataLocal, setDataLocal] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (searchParams) {
            const newId = searchParams.get("id");
            const newTitle = searchParams.get("title");

            if (newId) setId(newId);
            if (newTitle) setTitle(newTitle);

        }
    }, [searchParams]);


    useEffect(() => {
        async function getData(activityId) {
            if (!activityId) return; // ถ้ายังไม่มี id ไม่ต้อง fetch
            try {
                const res = await fetch(`http://localhost:5000/image_activity/${activityId}`);
                if (!res.ok) throw new Error("Failed to fetch");
                const json = await res.json();
                setData(json);
            } catch (error) {
            }
        }

        getData(id);

    }, [id]); // รอจนกว่า id จะถูกอัปเดต



    useEffect(() => {
        const timeout = setTimeout(() => {
            if (dataLocal === null) {
                // ถ้าผ่านไป 5 วินาทีแล้วข้อมูลยังไม่โหลด ให้ทำการ redirect
                router.replace("/");
            }
        }, 1000); // 5 วินาที

        if (typeof window !== "undefined") {
            const savedData = localStorage.getItem("loginAdmin");
            setDataLocal(savedData); // โหลดข้อมูล loginAdmin จาก localStorage
        }

        return () => {
            clearTimeout(timeout); // เคลียร์ timeout ถ้ามีการ unmount
        };
    }, [dataLocal, router]);

    // กรณีที่ยังโหลดข้อมูลไม่เสร็จ
    if (dataLocal === null) {
        return <p className="text-center text-lg text-gray-500">404 ERROR</p>;
    }




    const deleteData = async (delId) => {
        try {
            const res = await fetch(`http://localhost:5000/image_activity/${delId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error("Failed to delete data");
            }

            const data = await res.json();

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
        }
    };

    return (
        <div className="w-full h-auto rounded-lg shadow-lg">
            <NavbarAdmin />
            <div className="h-5/6 bg-white px-4 text-[#162456] text-xl pt-4 rounded-b-lg">
                <div className="grid grid-cols-12 gap-4" >
                    {data?.map((item, index) => {
                        return (
                            <div key={index} className="col-span-12 sm:col-span-6 md:col-span-4">

                                <div className="h-auto shadow-lg mt-6 rounded-lg bg-[#EFF6FF] ">
                                    <div className="relative w-full ">
                                        <Image
                                            src={`http://localhost:5000/public/images/${item?.name}`}
                                            alt="Picture of the author"
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className="w-full h-auto rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-end m-2 p-2">
                                        <button onClick={() => deleteData(item.id)}
                                            className="bg-[#162456] text-[20px] text-white h-[46px] rounded-lg flex items-center justify-center hover:scale-105 duration-300 hover:bg-red-400 p-4">

                                            ลบข้อมูล

                                        </button>
                                    </div>
                                </div>
                            </div>)
                    })}

                </div>



            </div>

        </div >
    );
}
