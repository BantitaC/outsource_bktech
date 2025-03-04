"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import Modal from "@/components/Modal";

async function getData() {
    const res = await fetch("http://localhost:5000/student");
    return res.json();
}
async function getDataTeacher() {
    const res = await fetch("http://localhost:5000/teacher");
    return res.json();
}
export default function ManageMember() {
    const [data, setData] = useState(null);
    const [dataTeacher, setDataTeacher] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [nick, setNick] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);

    const [dataLocal, setDataLocal] = useState(null);
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState(""); // ค่าเริ่มต้นเป็น "อาจารย์"

    const handleChange = (event) => {
        setSelectedRole(event.target.value);

    };
    useEffect(() => {
        getData().then(setData);
    }, []);
    useEffect(() => {
        getDataTeacher().then(setDataTeacher);
    }, []);

    const deleteData = async (id) => {
        const res = await fetch(`http://localhost:5000/student/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",

        });

        const data = await res.json();
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    };


    const handleImageChange = (event) => {
        const files = event.target.files; // รับไฟล์จาก input
        const imageArray = Array.from(files); // แปลงไฟล์เป็น Array
        setSelectedImages(imageArray); // เก็บไฟล์ใน state
    };


    const deleteDataTeacher = async (id) => {
        const res = await fetch(`http://localhost:5000/teacher/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",

        });

        const dataTeacher = await res.json();
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    };


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

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('nick', nick);

        selectedImages.forEach((image) => {
            formData.append('image', image);
        });

        const response = await fetch('http://localhost:5000/student', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        const data = await response.json();

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleSubmitTeacher = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('tel', tel);
        formData.append('email', email);

        selectedImages.forEach((image) => {
            formData.append('image', image);
        });

        const response = await fetch('http://localhost:5000/teacher', {
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
        <div className="bg-[#F0F9FF] min-h-screen">
            <NavbarAdmin />
            <div className="flex justify-end mt-5">
                <div className="">
                    <button onClick={() => setIsOpen(true)} className=" px-4 bg-[#162456] text-[20px] text-white h-[46px]  rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-green-400 me-4 mb-4">
                        เพิ่มข้อมูล
                    </button>
                </div>
            </div>
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
                                        <button onClick={() => deleteDataTeacher(item.id)}
                                            className="bg-[#162456] text-[20px] w-full  text-white h-[46px] rounded-lg flex items-center justify-center hover:scale-105 duration-300 hover:bg-red-400 p-4">
                                            ลบข้อมูล
                                        </button>
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
                                        <button onClick={() => deleteData(item.id)}
                                            className="bg-[#162456] text-[20px] w-full  text-white h-[46px] rounded-lg flex items-center justify-center hover:scale-105 duration-300 hover:bg-red-400 p-4">

                                            ลบข้อมูล

                                        </button>
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
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>

                    <h2 className="text-xl font-semibold text-center mb-4">เพิ่มข้อมูล</h2>
                    <div className="flex ">
                        <div className="flex items-center ">
                            <input id="radio-student" onChange={handleChange} checked={selectedRole === "นักเรียน"} type="radio" value="นักเรียน" name="user-role" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                            <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">นักเรียน</label>
                        </div>
                        <div className=" flex items-center ms-4">
                            <input id="radio-teacher" checked={selectedRole === "อาจารย์"} onChange={handleChange} type="radio" value="อาจารย์" name="user-role" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                            <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">อาจารย์</label>
                        </div>
                    </div>
                    {selectedRole === "นักเรียน" ? (
                        <div>
                            <label className="font-bold text-xl">
                                <span className="text-red-600">*</span> รหัสนักเรียน :
                            </label>
                            <textarea
                                onChange={(e) => setId(e.target.value)}
                                value={id}
                                id="message"
                                rows="1"
                                className="mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="รหัสนักเรียน"
                            />

                            <label className="font-bold text-xl">
                                <span className="text-red-600">*</span> ชื่อเล่น :
                            </label>
                            <textarea
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                id="message"
                                rows="1"
                                className="mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="ชื่อเล่น"
                            />

                            <label className="font-bold text-xl">
                                <span className="text-red-600">*</span> ชื่อ-นามสกุล :
                            </label>
                            <textarea
                                onChange={(e) => setNick(e.target.value)}
                                value={nick}
                                id="message"
                                rows="1"
                                className="mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="ชื่อ-นามสกุล"
                            />

                            <label className="font-bold text-xl">
                                <span className="text-red-600">*</span> เลือกรูปภาพ :
                            </label>
                            <input
                                onChange={handleImageChange}
                                type="file"
                                accept="image/*"
                                multiple
                                className="p-2 border border-gray-300 rounded-md mb-7"
                            />

                            {id !== '' && name !== '' && selectedImages.length >= 1 && nick !== "" ? (
                                <button
                                    onClick={handleSubmit}
                                    className="bg-[#BEDBFF] text-white w-full h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]"
                                >
                                    เพิ่ม
                                </button>
                            ) : (
                                <button className="bg-[#b7bdc5] text-white h-[46px] rounded-lg w-full flex items-center justify-center duration-300" disabled>
                                    เพิ่ม
                                </button>
                            )}
                        </div>
                    ) : selectedRole === "อาจารย์" ? (
                        <div>
                            <label className="font-bold text-xl">
                                <span className="text-red-600">*</span> ชื่อ-นามสกุล :
                            </label>
                            <textarea
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                id="message"
                                rows="1"
                                className="mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="ชื่อ-นามสกุล"
                            />

                            <label className="font-bold text-xl">
                                <span className="text-red-600">*</span> E-mail :
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                id="message"
                                type="email"
                                className="mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="E-mail"
                            />

                            <label className="font-bold text-xl">
                                <span className="text-red-600">*</span> เบอร์โทร :
                            </label>
                            <textarea
                                onChange={(e) => setTel(e.target.value)}
                                value={tel}
                                id="message"
                                rows="1"
                                className="mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="เบอร์โทร"
                            />

                            <label className="font-bold text-xl">
                                <span className="text-red-600">*</span> เลือกรูปภาพ :
                            </label>
                            <input
                                onChange={handleImageChange}
                                type="file"
                                accept="image/*"
                                multiple
                                className="p-2 border border-gray-300 rounded-md mb-7"
                            />

                            {id.length !== '' && name !== '' && selectedImages.length >= 1 && tel !== "" && email !== "" ? (
                                <button
                                    onClick={handleSubmitTeacher}
                                    className="bg-[#BEDBFF] text-white w-full h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]"
                                >
                                    เพิ่ม
                                </button>
                            ) : (
                                <button className="bg-[#b7bdc5] text-white h-[46px] rounded-lg w-full flex items-center justify-center duration-300" disabled>
                                    เพิ่ม
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="mt-4">
                            <p>กรุณาเลือกบทบาท</p>
                        </div>
                    )}



                </Modal >
                <div className="col-span-1">
                </div>
            </div>
        </div>
    );
}
