import Navbar from "@/components/Navbar";
import Image from 'next/image'
import Link from "next/link";

export default async function ActvityPage({ searchParams }) {
    const { id, title } = await searchParams; // ค่าที่ถูกส่งมาจาก query

    // ดึงข้อมูลจาก API
    const res = await fetch(`http://localhost:5000/image_activity/${id}`);
    const data = await res.json();

    return (
        <div className="bg-[#F0F9FF] min-h-screen">
            <Navbar />

            <div className="grid grid-cols-12">
                <div className="col-span-1">
                </div>
                <div className="col-span-10 my-5 break-normal">
                    <div className="text-[30px] font-bold">{title}</div>
                    <div className="grid grid-cols-12 gap-4">
                        {data?.map((item, index) => {
                            return (
                                <button key={index} className="col-span-12 sm:col-span-6 md:col-span-3">
                                    <Link
                                        href={`http://localhost:5000/public/images/${item?.name}`}
                                    >
                                        <div className="h-auto shadow-lg mt-6 rounded-lg bg-[#EFF6FF] hover:scale-105 duration-300 cursor-pointer">
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

            {/* {data?.map((item, index) => {
                return (
                    <button key={index} className="col-span-12 sm:col-span-6 md:col-span-3">

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
                    </button>
                )
            })} */}
        </div>

    );
}