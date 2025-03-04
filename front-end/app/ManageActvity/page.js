"use client";
import { useEffect, useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

async function getData() {
    const res = await fetch("http://localhost:5000/activity");
    return res.json();
}

export default function ManageActvity() {
    const [data, setData] = useState(null);
    const [dataLocal, setDataLocal] = useState(null);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);


    useEffect(() => {
        getData().then(setData);
    }, []);


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

    const handleImageChange = (event) => {
        const files = event.target.files; // รับไฟล์จาก input
        const imageArray = Array.from(files); // แปลงไฟล์เป็น Array
        setSelectedImages(imageArray); // เก็บไฟล์ใน state
    };


    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);

        selectedImages.forEach((image) => {
            formData.append('images', image);
        });

        const response = await fetch('http://localhost:5000/activity', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        const data = await response.json();

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };



    const deleteData = async (delId) => {
        try {
            const res = await fetch(`http://localhost:5000/activity/${delId}`, { // ใช้ delId ที่รับมา
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error("Failed to delete data");
            }

            const data = await res.json();

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
        }
    };
    return (
        <div className="w-full h-auto rounded-lg shadow-lg">
            <NavbarAdmin />

            <div className=" justify-end flex my-2">
                <button onClick={() => setIsOpen(true)} className=" px-4 bg-[#162456] text-[20px] text-white h-[46px]  rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-green-400 me-4 mb-4">
                    เพิ่มข้อมูล
                </button>
            </div>
            <div className="h-5/6 bg-white px-4 text-[#162456] text-xl pt-4 rounded-b-lg">
                <div className="grid grid-cols-12 gap-4" >
                    {data?.map((item, index) => {
                        return (
                            <div key={index} className="col-span-12 sm:col-span-6 md:col-span-4">

                                <div className="h-auto shadow-lg mt-6 rounded-lg bg-[#EFF6FF] hover:scale-105 duration-300 cursor-pointer">
                                    <Link
                                        href={{
                                            pathname: "/ManageActvity/DelActvity",
                                            query: { id: item.id, title: item.title },
                                        }}
                                    >
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
                                    </Link>

                                    <div className="flex justify-end m-2 p-2">


                                        <button onClick={() => deleteData(item.id)}
                                            className="bg-[#162456] text-[20px] text-white h-[46px] rounded-lg flex items-center justify-center hover:scale-105 duration-300 hover:bg-red-400 p-4">

                                            ลบข้อมูล

                                        </button>
                                    </div>
                                </div>
                            </div>)
                    })}


                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <h2 className="text-xl font-semibold text-center mb-4">เพิ่มประชาสัมพันธ์</h2>

                        <label className=" font-bold text-xl"><span className=" text-red-600">*</span> Title :</label>
                        <textarea onChange={(e) => setTitle(e.target.value)} value={title} id="message" rows="2" className="mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="Title"></textarea>

                        <label className=" font-bold text-xl"><span className=" text-red-600">*</span> Description :</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} id="message" rows="4" className="mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="Description"></textarea>

                        <label className=" font-bold text-xl"><span className=" text-red-600">*</span> เลือกรูปภาพ :</label>
                        <input onChange={handleImageChange} type="file" accept="image/*" multiple className="p-2 border border-gray-300 rounded-md mb-7" />

                        {title.length != '' && description != '' && selectedImages != "" ?
                            <button onClick={handleSubmit} className=" bg-[#BEDBFF] text-white h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]">
                                เพิ่ม
                            </button>
                            :
                            <button className=" bg-[#b7bdc5] text-white h-[46px] rounded-lg flex items-center justify-center duration-300" disabled>
                                เพิ่ม
                            </button>
                        }
                    </Modal >
                </div>



            </div>

        </div >
    );
}
