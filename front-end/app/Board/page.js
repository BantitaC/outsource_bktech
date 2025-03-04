"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Link from "next/link";

async function getData() {
    const res = await fetch("http://localhost:5000/post");
    return res.json();
}

export default function Board() {
    const [data, setData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    const maxLength = 100;
    const [dataLocal, setDataLocal] = useState("");
    const [responseMessage, setResponseMessage] = useState("");




    const handleSubmit = async () => {
        const response = await fetch('http://localhost:5000/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add other headers if needed
            },
            body: JSON.stringify({
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
            const savedData = localStorage.getItem("login");
            if (savedData) {
                setDataLocal(savedData);
            }
        }
    }, []);



    useEffect(() => {
        getData().then(setData);
    }, []);

    return (
        <div className="bg-[#F0F9FF] min-h-screen">
            <Navbar />
            <div className="grid grid-cols-12">
                <div className="col-span-1">
                </div>
                <div className="col-span-12 my-5 break-normal sm:col-span-10">
                    <div className="text-[30px] font-bold flex justify-between">
                        <div>กระดานถามตอบ</div>
                        <div>

                            {dataLocal == "true" ?
                                <button className=" p-4 bg-[#162456] text-white h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]"
                                    onClick={() => setIsOpen(true)}
                                >
                                    เพิ่มคำถาม
                                </button>
                                :
                                <button className=" p-4 bg-[#162456] text-white h-[46px] rounded-lg flex items-center justify-center"
                                    
                                    disabled
                                >
                                    กรุณาLogin
                                </button>
                            }



                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8 mt-4">
                        {data?.map((item, index) => {
                            return (
                                <button key={index} className="col-span-12 sm:col-span-6 rounded-lg bg-white shadow-lg w-auto sm:p-4 break-words hover:scale-105 duration-300">
                                    <Link
                                        href={{
                                            pathname: "/Board/Comment",
                                            query: { id: item.id, email: item.email, description: item.description },
                                        }}
                                    >
                                        <div className="flex">
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                                                className="rounded-full w-8 h-8"
                                            />
                                            <p className="flex items-center ms-3 font-semibold">{item.email}</p>
                                        </div>
                                        <div className="mt-2 flex items-start">{item.description}</div>
                                    </Link>
                                </button>
                            )
                        })}
                    </div>

                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <h2 className="text-xl font-semibold text-center mb-4">สร้างคำถาม</h2>


                        <textarea onChange={(e) => setText(e.target.value)} value={text} id="message" maxLength={maxLength} rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        <div className=" text-end">{text.length}/{maxLength}</div>


                        {text.length >= 1 ?
                            <button onClick={handleSubmit} className=" bg-[#BEDBFF] text-white h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]">
                                โพสต์
                            </button>
                            :
                            <button className=" bg-[#BEDBFF] text-white h-[46px] rounded-lg flex items-center justify-center duration-300" disabled>
                                โพสต์
                            </button>
                        }

                    </Modal>

                </div>

                <div className="col-span-1">
                </div>
            </div>


        </div>
    );
}
