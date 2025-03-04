"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";


export default function Comment() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [description, setDescription] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [data, setData] = useState([]);
    const [dataLocal, setDataLocal] = useState("");
    const [text, setText] = useState("");
    const maxLength = 100;

    // ดึงข้อมูลจาก API ตาม id
    async function getData() {
        try {
            const res = await fetch(`http://localhost:5000/comment/${id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            setData(data);
        } catch (error) {
            setResponseMessage("Error fetching data.");
        }
    }

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:5000/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add other headers if needed
            },
            body: JSON.stringify({
                post_id: id,
                description: text
            }),
            credentials: 'include', // Ensures cookies are sent with the request

        })
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };


    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedData = localStorage.getItem("userInfo");
            if (savedData) {
                setDataLocal(savedData);
            }
        }
    }, []);

    // ใช้ useEffect เพื่อดึงข้อมูลเมื่อ id เปลี่ยนแปลง
    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]); // ใช้ id เป็น dependency

    // ใช้ useEffect เพื่อดึงค่าจาก searchParams และตั้งค่าที่เกี่ยวข้อง
    useEffect(() => {
        if (searchParams) {
            setId(searchParams.get("id") || "");
            setEmail(searchParams.get("email") || "");
            setDescription(searchParams.get("description") || "");
        }
    }, [searchParams]); // เมื่อ searchParams เปลี่ยนแปลงให้ตั้งค่าใหม่

    return (

        <div className="bg-[#F0F9FF] min-h-screen">
            <Navbar />

            <div className="grid grid-cols-12">
                <div className="col-span-1">
                </div>

                <div className="col-span-12 md:col-span-10 my-5 ">
                    <div className="text-[30px] font-bold flex justify-between">
                        <div>กระดานถามตอบ</div>
                    </div>

                    <div className="col-span-12 mt-5 sm:col-span-6 mb-10 rounded-lg bg-[#DBEAFE] shadow-lg w-auto p-4 break-words scale-105">
                        <div className="flex">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                                className="rounded-full w-8 h-8"
                            />
                            <p className="flex items-center ms-3 text-2xl font-semibold">{email}</p>
                        </div>
                        <div className="mt-2 flex items-start text-xl">{description}</div>
                    </div>
                    <div className=" mb-[250px]">
                        {data.map((item, index) => (

                            <div key={index} className="col-span-12 mt-4 sm:col-span-6 rounded-lg bg-white shadow-lg w-auto p-4 break-words">
                                <div className="flex">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                                        className="rounded-full w-8 h-8"
                                    />
                                    <p className="flex items-center ms-3 text-xl font-semibold">{item.email}</p>
                                </div>
                                <div className="mt-2 flex items-start text-lg">{item.description}</div>

                            </div>
                        ))}
                    </div>
                    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 w-[80%] p-4 bg-white shadow-lg rounded-lg">
                        {dataLocal === '' || dataLocal == null ?
                            <div>
                                <h3 className="mb-5 text-xl font-semibold flex items-center">

                                    <div className="ms-4">กรุณา Login เพื่อ comment</div>
                                </h3>
                            </div>
                            :
                            <div className="">
                                <h3 className="mb-5 text-xl font-semibold flex items-center">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                                        className="rounded-full w-8 h-8"
                                    />
                                    <div className="ms-4">{dataLocal.slice(1, -1)}</div>
                                </h3>
                                <textarea onChange={(e) => setText(e.target.value)} value={text} id="message" maxLength={maxLength} rows="3" className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                <div className="mt-1 text-end">{text.length}/{maxLength}</div>
                                <div className="flex  justify-end mt-2">

                                    {text.length >= 1 ?
                                        <div>
                                            <button onClick={handleSubmit} className="bg-[#BEDBFF] px-10 text-white h-[46px] rounded-lg flex items-center duration-300 hover:scale-105 hover:bg-[#50A2FF]">
                                                โพสต์
                                            </button>
                                        </div>
                                        :
                                        <div>
                                            <button className="bg-[#adb0b4] px-10 text-white h-[46px] rounded-lg flex items-center" disabled>
                                                โพสต์
                                            </button>
                                        </div>
                                    }

                                </div>

                            </div>
                        }

                    </div>

                </div>

                <div className="col-span-1">
                </div>
            </div>


        </div>
    );
}
