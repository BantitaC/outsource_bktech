"use client";
import { useEffect, useState } from "react";
import Image from 'next/image'
import Link from "next/link";

async function getData() {
    const res = await fetch("http://localhost:5000/advert/2");
    return res.json();
}

export default function Annoucement({ id, img, date, description }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        getData().then(setData);
    }, []);

    // เช็คว่า data มีค่าและไม่เป็น null หรือ undefined
    if (!data) {
        return <div>Loading...</div>; // หรือแสดงการโหลดบางอย่าง
    }


    return (
        <div className="w-full h-auto  rounded-lg shadow-lg">
            <div className="h-1/6 bg-[#BEDBFF] rounded-t-lg flex items-center px-4 font-bold text-[#162456] text-[30px]">
                ข่าวประชาสัมพันธ์
            </div>

            <div className="h-auto bg-white px-4 text-[#162456] text-xl pt-4">
                <div className="grid grid-cols-12 gap-4">

                    {data.map((item, index) => (

                        <button
                            key={index}
                            className="col col-span-12 sm:col-span-8 sm:col-start-3 md:col-span-8 md:col-start-3"
                        >
                            <Link
                                href={{
                                    pathname: "/AnnouncePage",
                                    query: { id: id,  image:item.image_path, date: item.date, description: item.description, title: item.title },
                                }}
                                className="text-blue-500"
                            >
                                <div className="h-auto mt-6 hover:scale-105 duration-300 cursor-pointer">
                                    <div className="h-auto w-full">

                                        <Image
                                            src={`http://localhost:5000/public/images/${item?.image_path}`}
                                            alt="Picture of the author"
                                            width={100}
                                            height={500}
                                            layout="responsive"

                                        />
                                    </div>
                                    <div className="h-auto mt-5">
                                        {item.title}
                                    </div>
                                    <div className="h-auto mt-5 pb-10">
                                        {item.created_at.split("T")[0]}
                                    </div>
                                </div>
                            </Link>

                        </button>

                    ))}

                </div>
            </div>

        </div>
    );
}
