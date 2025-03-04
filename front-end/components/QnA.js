"use client";  // ทำให้ Component นี้เป็น Client Component

import Link from "next/link";
import { useEffect, useState } from "react";

async function getData() {
    const res = await fetch("http://localhost:5000/post");
    return res.json();
}



export default function QnA() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getData().then(setData);
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <div className="w-full h-auto rounded-lg shadow-lg bg-white mr-4">
            <div className="h-1/6 bg-[#BEDBFF] rounded-t-lg flex items-center px-4 font-bold text-[#162456] text-[30px]">
                กระดานถาม-ตอบ
            </div>
            <div>
                {data?.map((item, index) => {
                    return (
                        <Link
                            href={{
                                pathname: "/Board/Comment",
                                query: { id: item.id, email: item.email, description: item.description },
                            }}
                            key={index}
                        >
                            <button
                                className="hover:scale-105 duration-300 w-full"
                                onClick={() => Click(item.id)} // ✅ ใช้ Arrow Function
                            >
                                <div className="flex items-center mt-4 ms-6">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                                        className="rounded-full w-8 h-8"
                                    />
                                    <p className="ms-4">{item.email}</p>
                                </div>
                                <div className="flex items-center mt-2 ms-6">
                                    <p>{item.description}</p>
                                </div>
                            </button>
                        </Link>
                    );
                })}
            </div>
            <div className="flex justify-end mx-4">
                <Link href="/Board">
                    <button className="my-4 w-[152px] bg-[#BEDBFF] text-white h-[46px] rounded-lg flex items-center justify-center duration-300 hover:bg-[#50A2FF] hover:scale-105">
                        ดูเพิ่มเติม
                    </button>
                </Link>

            </div>
        </div>
    );
}
