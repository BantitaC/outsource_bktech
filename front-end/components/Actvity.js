"use client";
import { useEffect, useState } from "react";
import Image from 'next/image'
import Link from "next/link";

async function getData() {
    const res = await fetch("http://localhost:5000/activity/6");
    return res.json();
}

export default function Actvity() {
    const [data, setData] = useState(null);


    useEffect(() => {
        getData().then(setData);
    }, []);

    // const data = [
    //     { "id": "1", "img": "https://cdn.getyourguide.com/img/tour/dd8d8ea0e2075e853d1254a1987b6c49489614d6217325cc732d0c236504f288.png/146.jpg", "nameActvity": "1" },
    //     { "id": "2", "img": "https://cdn.getyourguide.com/img/tour/dd8d8ea0e2075e853d1254a1987b6c49489614d6217325cc732d0c236504f288.png/146.jpg", "nameActvity": "2" },
    //     { "id": "3", "img": "https://cdn.getyourguide.com/img/tour/dd8d8ea0e2075e853d1254a1987b6c49489614d6217325cc732d0c236504f288.png/146.jpg", "nameActvity": "3" },
    //     { "id": "4", "img": "https://cdn.getyourguide.com/img/tour/dd8d8ea0e2075e853d1254a1987b6c49489614d6217325cc732d0c236504f288.png/146.jpg", "nameActvity": "4" },
    //     { "id": "5", "img": "https://cdn.getyourguide.com/img/tour/dd8d8ea0e2075e853d1254a1987b6c49489614d6217325cc732d0c236504f288.png/146.jpg", "nameActvity": "5" },
    //     { "id": "6", "img": "https://cdn.getyourguide.com/img/tour/dd8d8ea0e2075e853d1254a1987b6c49489614d6217325cc732d0c236504f288.png/146.jpg", "nameActvity": "6" },
    // ]



    return (
        <div className="w-full h-auto rounded-lg shadow-lg">
            <div className="h-1/6 bg-[#BEDBFF] rounded-t-lg flex items-center px-4 font-bold text-[#162456] text-[30px]">
                รูปภาพกิจกรรม
            </div>
            <div className="h-5/6 bg-white px-4 text-[#162456] text-xl pt-4 rounded-b-lg">

                <div className="grid grid-cols-12 gap-4" >
                    {data?.map((item, index) => {
                        return (
                            <button key={index} className="col-span-12 sm:col-span-6 md:col-span-4" onClick={() => Click(item.id)}>
                                <Link
                                    href={{
                                        pathname: "/Actvity/ActvityPage",
                                        query: { id: item.id, title: item.title },
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
                                        <div className="h1/6 flex ms-2 p-4">
                                            {item.title.length > 15 ? item.title.slice(0, 15) + "..." : item.title}
                                        </div>
                                    </div>
                                </Link>
                            </button>)
                    })}

                </div>

                <div className="flex justify-center mt-12 pb-12 mb-12">
                    <Link
                        href="/Actvity"
                    >
                        <button className=" w-[152px] bg-[#BEDBFF] text-[20px] text-white h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]">
                            ดูเพิ่มเติม
                        </button>
                    </Link>
                </div>

            </div>

        </div >
    );
}
