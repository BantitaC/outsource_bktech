"use client";
import CardManageAnnounce from "@/components/CardManageAnnounce";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

async function getData() {
    const res = await fetch("http://localhost:5000/advert");
    return res.json();
}

export default function ManageAnnounce() {
    const [data1, setData1] = useState(null);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dataLocal, setDataLocal] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        getData().then(setData1);
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

        const response = await fetch('http://localhost:5000/advert', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        const data = await response.json();

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };



    return (
        <div>
            <div>
                <NavbarAdmin />
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-10"></div>
                <div className="flex justify-end mt-5">
                    <button onClick={() => setIsOpen(true)} className=" w-[152px] bg-[#162456] text-[20px] text-white h-[46px]  rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-green-400 me-4 mb-4">
                        เพิ่มข้อมูล
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12">
                <div className="col-span-1">
                </div>

                <div className="col-span-10 my-5 break-normal">
                    <div className="flex flex-wrap gap-4">
                        {data1?.map((item) => (
                            <div key={item.id} className="w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] shadow-lg rounded-lg">
                                <CardManageAnnounce id={item.id} img={item.image_path} date={item.created_at} title={item.title} description={item.description} />
                            </div>
                        ))}

                    </div>
                </div>

                <div className="col-span-1">
                </div>
            </div>

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
        </div >



    );
}