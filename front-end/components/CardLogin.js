"use client"; // ใช้ใน Client-side only
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import LoginAccordion from "@/components/LoginAccodain";

export default function Login() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [storedLogin, setStoredLogin] = useState(null);
    const [storedUsername, setStoredUsername] = useState(null);
    const [logoutData, setLogoutData] = useState(null); // ตั้งชื่อ state ให้ไม่ชนกับฟังก์ชัน
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        // อัปเดตขนาดหน้าจอเมื่อโหลดหน้า
        setScreenWidth(window.innerWidth);

        // Event listener สำหรับตรวจจับการเปลี่ยนขนาดหน้าจอ
        const handleResize = () => setScreenWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const logoutUser = async () => {


        const res = await fetch('http://localhost:5000/user/logout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        setLogoutData(data);
        localStorage.removeItem("userInfo");
        localStorage.removeItem("login");
        localStorage.removeItem("loginAdmin");

        setTimeout(() => {
            window.location.reload();
        }, 1000);

    };




    const postData = async () => {
        setLoading(true); // ตั้งค่า loading ให้เป็น true ขณะส่งข้อมูล

        const data = { email: Username, password: Password };
        const response = await fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include',

        });
        

        if (!response.ok) {
            throw new Error("เกิดข้อผิดพลาดในการเชื่อมต่อกับ API");
        }

        const result = await response.json();
        setResponseData(result); // เก็บข้อมูลที่ได้จาก API

        // ตรวจสอบข้อความจาก API
        if (result.message === 'email หรือ Password ไม่ถูกต้อง') {
            Swal.fire({
                title: 'ผิด!',
                text: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
                icon: 'error',
                confirmButtonText: 'รับทราบ!',
            });
        } else {
            Swal.fire({
                title: 'เข้าสู่ระบบสำเร็จ!',
                text: 'ยินดีต้อนรับกลับสู่ระบบ',
                icon: 'success',
                showConfirmButton: false,
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);

            // เก็บข้อมูลใน localStorage
            if (typeof window !== "undefined") {
                // ตรวจสอบว่าโค้ดทำงานใน Client-side
                localStorage.setItem("userInfo", JSON.stringify(Username));
                localStorage.setItem("login", JSON.stringify(true));
            }
        }
    };


    // ตรวจสอบข้อมูลใน localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedLoginValue = localStorage.getItem("login");
            const storedUsernameValue = localStorage.getItem("userInfo");

            setStoredLogin(storedLoginValue === "true"); // แปลงค่าจาก string เป็น boolean
            setStoredUsername(storedUsernameValue);

        }
    }, []); // ทำงานแค่ครั้งเดียวเมื่อคอมโพเนนต์โหลดใน Client



    return (
        <div>

            {screenWidth > 1023 ? (
                <div className="w-full h-[320px] rounded-lg shadow-lg break-words">
                    <div className="h-1/6 bg-[#BEDBFF] rounded-t-lg flex items-center px-4 font-bold text-[#162456] text-[30px]">
                        Login
                    </div>
                    {storedLogin === true ?
                        <div className="h-5/6 bg-white  px-4 text-[#162456] text-xl pt-4 rounded-b-lg">
                            Username:<br />
                            {storedUsername.slice(1, -1)}
                            <div className="flex justify-center mt-28 ">
                                <button className=" w-[152px] bg-[#BEDBFF] text-white h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]" onClick={logoutUser}>
                                    ออกจากระบบ
                                </button>
                            </div>
                        </div>
                        :

                        <div className="h-5/6 bg-white  px-4 text-[#162456] text-xl pt-4 rounded-b-lg">
                            Username
                            <input className="w-full rounded-lg ps-4 h-[40px] mt-2 bg-[#EFF6FF]" type="text" onChange={(e) => setUsername(e.target.value)} />
                            <p className="mt-4">Password</p>
                            <input className="w-full rounded-lg ps-4 h-[40px] mt-2 bg-[#EFF6FF]" type="password" onChange={(e) => setPassword(e.target.value)} />
                            <div className="flex justify-center mt-4 ">
                                {Password.length >= 1 && Username.length >= 1 ?
                                    <button className=" w-[152px] bg-[#BEDBFF] text-white h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]" onClick={postData}>
                                        เข้าสู่ระบบ
                                    </button>
                                    :
                                    <button className=" w-[152px] bg-[#BEDBFF] text-white h-[46px] rounded-lg flex items-center justify-center duration-300" disabled>
                                        เข้าสู่ระบบ
                                    </button>
                                }

                            </div>
                        </div>

                    }
                </div>
            ) : screenWidth <= 1023 ? (
                <LoginAccordion />


            ) : (
                <p>Data loaded!</p>
            )}



        </div>
    );
}
