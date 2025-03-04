"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from 'next/image'

async function getData() {
    const res = await fetch("http://localhost:5000/activity");
    return res.json();
}
export default function Actvity() {
    const [data, setData] = useState(null);


    useEffect(() => {
        getData().then(setData);
    }, []);


    return (

        <div className="bg-[#F0F9FF] min-h-screen">
            <Navbar />
            <div className="grid grid-cols-12">
                <div className="col-span-1">
                </div>
                <div className="col-span-10 my-5 break-normal">
                    <div className="text-[30px] font-bold">Actvity</div>
                    <div className="grid grid-cols-12 gap-4">
                        {data?.map((item, index) => {
                            return (
                                <button key={index} className="col-span-12 sm:col-span-6 md:col-span-3">
                                    <Link
                                        href={{
                                            pathname: "/Actvity/ActvityPage",
                                            query: { id: item.id, title: item.title},
                                        }}
                                    >
                                        <div className="h-auto shadow-lg mt-6 rounded-lg bg-[#EFF6FF] hover:scale-105 duration-300 cursor-pointer">
                                            <div className="h-5/6 w-full">
                                                <div className="relative w-full h-[180px]">
                                                    <Image
                                                        src={`http://localhost:5000/public/images/${item?.image_name}`}
                                                        alt="Picture of the author"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="rounded-t-lg"
                                                    />
                                                </div>


                                            </div>
                                            <div className="h1/6 flex ms-2 py-2">
                                                {item.title.length > 15 ? item.title.slice(0, 15) + "..." : item.title}
                                            </div>
                                        </div>
                                    </Link>
                                </button>
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
