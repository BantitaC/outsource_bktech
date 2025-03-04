"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

async function getData() {
    const res = await fetch("http://localhost:5000/post");
    return res.json();
}

export default function ManageBoard() {
    const [data, setData] = useState(null);
    const [dataLocal, setDataLocal] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getData().then(setData);
    }, []);

    const deleteData = async (id) => {
        const res = await fetch(`http://localhost:5000/post/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",

        });

        const data = await res.json();
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    };

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




    return (
        <div className="bg-[#F0F9FF] min-h-screen">
            <NavbarAdmin />
            <div className="grid grid-cols-12">
                <div className="col-span-1">
                </div>
                <div className="col-span-12 my-5 break-normal sm:col-span-10">
                    <div className="text-[30px] font-bold ">
                        <div>กระดานถามตอบ</div>
                    </div>
                    <div className="grid grid-cols-12 gap-8 mt-4">
                        {data?.map((item, index) => {
                            return (
                                <div key={index} className="col-span-12 sm:col-span-6 rounded-lg bg-white shadow-lg w-auto sm:p-4 break-words">

                                    <div className="flex justify-between">
                                        <div className="flex">
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                                                className="rounded-full w-8 h-8"
                                            />
                                            <p className="flex items-center ms-3 font-semibold">{item.email}</p>
                                        </div>
                                        <div    >
                                            <button onClick={() => deleteData(item.id)} className=" bg-red-400 text-[20px] text-white   rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-red-600 px-7">
                                                ลบ
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-start">{item.description}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="col-span-1">
                </div>
            </div>


        </div>
    );
}
