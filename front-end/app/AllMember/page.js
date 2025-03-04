"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from 'next/image'

async function getData() {
    const res = await fetch("http://localhost:5000/student");
    return res.json();
}
async function getDataTeacher() {
    const res = await fetch("http://localhost:5000/teacher");
    return res.json();
}
export default function AllMember() {
    const [data, setData] = useState(null);
    const [dataTeacher, setDataTeacher] = useState(null);


    useEffect(() => {
        getData().then(setData);
    }, []);

    useEffect(() => {
        getDataTeacher().then(setDataTeacher);
    }, []);

    return (

        <div className="bg-[#F0F9FF] min-h-screen">
            <Navbar />
            <div className="grid grid-cols-12">
                <div className="col-span-1">
                </div>
                <div className="col-span-12 my-5 break-normal sm:col-span-10">
                    <div className="text-[30px] font-bold ">
                        <div>อาจารย์</div>
                    </div>
                    <div className="grid grid-cols-12 gap-8 mt-4">
                        {dataTeacher?.map((item, index) => {
                            return (
                                <div key={index} className="col-span-12 sm:col-span-6 md:col-span-3">

                                    <div className="h-auto shadow-lg mt-6 rounded-lg bg-[#EFF6FF] break-words">
                                        <div className="relative w-full ">
                                            <Image
                                                src={`http://localhost:5000/public/images/${item?.image}`}
                                                alt="Picture of the author"
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                className="w-full h-auto rounded-lg"
                                            />
                                        </div>

                                        <p className='px-4 pt-2 font-bold text-[#162456] text-left text-xl'>{item.email}</p>
                                        <p className='px-4 pt-2 font-bold text-[#162456] text-left text-xl'>{item.tel}</p>
                                        <p className='px-4 pt-2 text-[#162456] text-left text-xl'>{item.nick}</p>
                                        <p className='px-4 pt-2 text-[#162456] text-left text-xl'>{item.name}</p>
                                        <p className='px-4 pt-2 pb-4 text-[#162456] text-left text-xl'>{item.created_at.split("T")[0]}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="col-span-1">
                </div>
            </div>
            <div className="grid grid-cols-12 break-words">
                <div className="col-span-1">
                </div>
                <div className="col-span-12 my-5 break-normal sm:col-span-10">
                    <div className="text-[30px] font-bold ">
                        <div>นักเรียน</div>
                    </div>
                    <div className="grid grid-cols-12 gap-8 mt-4 ">
                        {data?.map((item, index) => {
                            return (
                                <div key={index} className="col-span-12 sm:col-span-6 md:col-span-3">

                                    <div className="h-auto shadow-lg mt-6 rounded-lg bg-[#EFF6FF]">
                                        <div className="relative w-full ">
                                            <Image
                                                src={`http://localhost:5000/public/images/${item?.image}`}
                                                alt="Picture of the author"
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                className="w-full h-auto rounded-lg"
                                            />
                                        </div>

                                        <p className='px-4 pt-2 font-bold text-[#162456] text-left text-xl'>{item.id}</p>

                                        <p className='px-4 pt-2 text-[#162456] text-left text-xl'>{item.nick}</p>
                                        <p className='px-4 pt-2 text-[#162456] text-left text-xl'>{item.name}</p>
                                        <p className='px-4 pt-2 pb-4 text-[#162456] text-left text-xl'>{item.created_at.split("T")[0]}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>


        </div>
    );
}
