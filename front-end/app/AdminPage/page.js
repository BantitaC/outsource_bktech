"use client";
import { useEffect, useState } from "react";
import NavbarAdmin from "@/components/NavbarAdmin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';


export default function AdminPage() {
    const [storedUsername, setStoredUsername] = useState("");
    const [logoutData, setLogoutData] = useState(null); // ตั้งชื่อ state ให้ไม่ชนกับฟังก์ชัน
    const [dataLocal, setDataLocal] = useState(null); // ✅ เริ่มต้นเป็น `null` กัน Hydration Error
    const [myData, setMyData] = useState(null); // ✅ เริ่มต้นเป็น `null` กัน Hydration Error
    const [email, setEmail] = useState(''); // ✅ เริ่มต้นเป็น `null` กัน Hydration Error
    const [password, setPassword] = useState(''); // ✅ เริ่มต้นเป็น `null` กัน Hydration Error

    const [emailUser, setEmailUser] = useState(''); // ✅ เริ่มต้นเป็น `null` กัน Hydration Error
    const [passwordUser, setPasswordUser] = useState(''); // ✅ เริ่มต้นเป็น `null` กัน Hydration Error

    const router = useRouter();

    useEffect(() => {
        // ตรวจสอบว่าเรากำลังอยู่ใน client-side
        if (typeof window !== "undefined") {
            // ตอนนี้สามารถใช้ localStorage ได้แล้ว
            const data = localStorage.getItem('userInfo');
            setMyData(data); // หรือแปลงค่าให้เป็น JSON ตามที่ต้องการ
        }
    }, []);


    const logoutUser = async () => {
        const res = await fetch('http://localhost:5000/admin/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        setLogoutData(data); // ✅ บันทึกผลการล็อกเอาท์
        localStorage.removeItem("userInfo");
        localStorage.removeItem("loginAdmin");


        router.replace("/");
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


    const addAdmin = async (email, password) => {
        const response = await fetch('http://localhost:5000/admin/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        const data = await response.json();

        if (data.message === 'Registered') {
            Swal.fire({
                title: 'สมัครสมาชิกสำเร็จ',
                icon: 'success',
                showConfirmButton: false,
            });
        } else {
            Swal.fire({
                title: 'อีเมลถูกใช้แล้ว',
                icon: 'error',
                confirmButtonText: 'รับทราบ!',
            });
        }
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    };

    const addUser = async (emailUser, passwordUser) => {
        const response = await fetch('http://localhost:5000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailUser, password: passwordUser }),
            credentials: 'include',
        });

        const data = await response.json();

        if (data.message === 'Registered') {
            Swal.fire({
                title: 'สมัครสมาชิกสำเร็จ',
                icon: 'success',
                showConfirmButton: false,
            });
        } else {
            Swal.fire({
                title: 'อีเมลถูกใช้แล้ว',
                icon: 'error',
                confirmButtonText: 'รับทราบ!',
            });
        }
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    };


    return (
        <div className="bg-[#F0F9FF] min-h-screen">

            <div>
                <NavbarAdmin />
                <div className="flex justify-center mt-20 flex-wrap ">
                    <div className="bg-white px-8 text-[#162456] m-4 text-2xl pt-8 rounded-lg w-[500px] h-[300px] shadow-lg ">
                        Username:{myData.slice(1, -1)}<br />
                        <div className="flex justify-center mt-32 text-xl">
                            <Link href="/">
                                <button className=" w-[152px] bg-[#BEDBFF] text-white h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]" onClick={logoutUser}>
                                    ออกจากระบบ
                                </button>
                            </Link>

                        </div>
                    </div>
                    <div className="bg-white px-8 text-[#162456] m-4 text-2xl pt-8 rounded-lg w-[500px] h-[300px] shadow-lg ">
                        <div>เพิ่ม Admin</div>

                        <p className="mt-4 text-lg">Email :</p>
                        <div className="flex justify-center text-xl">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                id="message"
                                type="email"
                                className=" mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="email"
                                required
                            />

                        </div>
                        <p className=" text-lg">password :</p>
                        <div className="flex justify-center text-xl">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                id="message"
                                type="password"
                                className=" block p-2.5 mb-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="password"
                            />

                        </div>
                        <div className="flex justify-center text-xl">
                            {email.length >= 1 && password.length >= 1 ?
                                <button className=" w-[152px] bg-[#BEDBFF] text-white h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]" onClick={() => addAdmin(email, password)}>
                                    เพิ่ม
                                </button> :
                                <button className=" w-[152px] bg-[#8f9499] text-white h-[46px] rounded-lg flex items-center justify-center" disabled>
                                    เพิ่ม
                                </button>}

                        </div>
                    </div>
                    <div className="bg-white px-8 text-[#162456] m-4 text-2xl pt-8 rounded-lg w-[500px] h-[300px] shadow-lg ">
                        เพิ่ม User

                        <p className="mt-4 text-lg">Email :</p>
                        <div className="flex justify-center text-xl">
                            <input
                                onChange={(e) => setEmailUser(e.target.value)}
                                value={emailUser}
                                id="message"
                                type="text"
                                className=" mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="email"
                            />

                        </div>
                        <p className=" text-lg">password :</p>
                        <div className="flex justify-center text-xl">
                            <input
                                onChange={(e) => setPasswordUser(e.target.value)}
                                value={passwordUser}
                                id="password"
                                type="password"
                                className=" block p-2.5 mb-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                placeholder="password"
                            />

                        </div>
                        <div className="flex justify-center text-xl">
                            {emailUser.length >= 1 && passwordUser.length >= 1 ?
                                <button className=" w-[152px] bg-[#BEDBFF] text-white h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]" onClick={() => addUser(emailUser, passwordUser)}>
                                    เพิ่ม
                                </button> :
                                <button className=" w-[152px] bg-[#8f9499] text-white h-[46px] rounded-lg flex items-center justify-center" disabled>
                                    เพิ่ม
                                </button>}
                        </div>
                    </div>
                    <div className="col-span-4"></div>

                </div>


            </div>



        </div>
    );
}
