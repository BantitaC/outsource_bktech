"use client";

import Navbar from "@/components/Navbar";
import Image from 'next/image';

import { useSearchParams } from "next/navigation";

export default function AnnouncePage() {
    const searchParams = useSearchParams();

    // ดึงค่าจาก URL
    const id = searchParams.get("id");
    const image = searchParams.get("image");
    const date = searchParams.get("date");
    const title = searchParams.get("title");
    const description = searchParams.get("description");


    return (
        <div className="bg-[#F0F9FF] min-h-screen">
            <Navbar />

            <div className="grid grid-cols-12 mt-10">
                <div className=" col-span-1">
                </div>
                <div className=" col-span-10">
                    <div className="grid grid-cols-12 gap-10">
                        <div className="col-span-12 md:col-span-6">
                            {/* <img src={image} alt="Announcement Image" className="rounded-lg w-full h-auto" /> */}
                            <Image
                                src={`http://localhost:5000/public/images/${image}`}
                                alt="Picture of the author"
                                width={0}
                                height={0}
                                sizes="100vw"
                                objectFit="cover"
                                className="w-full max-h-screen rounded-lg"
                            />

                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <p className="text-[18px]">ข่าวประชาสัมพันธ์</p>
                            <p className="text-[30px] mt-5">
                                {title}
                            </p>
                            <p className="text-[13px] mt-6">{date}</p>
                            <div className=" me-40 mt-5"></div>
                        </div>
                    </div>
                    <div className="col-span-10 mt-5">
                        {description}
                    </div>
                </div>
                <div className=" col-span-1">
                </div>
            </div>





        </div>

    );
}