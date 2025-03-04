"use client";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function Login() {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [storedLogin, setStoredLogin] = useState(false);
    const [storedUsername, setStoredUsername] = useState("");
    const [isOpen, setIsOpen] = useState(false); // ควบคุมการเปิด/ปิด Accordion

    // ฟังก์ชันออกจากระบบ
    const logoutUser = async () => {
        try {
            const res = await fetch('http://localhost:5000/user/logout', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error("เกิดข้อผิดพลาดขณะออกจากระบบ");
            }

            const data = await res.json();

            localStorage.removeItem("userInfo");
            localStorage.removeItem("login");

            Swal.fire({
                title: "ออกจากระบบสำเร็จ!",
                text: "กำลังเปลี่ยนเส้นทาง...",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });

            setTimeout(() => window.location.reload(), 2000);
        } catch (error) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: error.message,
                icon: "error",
            });
        }
    };

    // ฟังก์ชันเข้าสู่ระบบ
    const postData = async () => {
        setLoading(true);

        try {
            const data = { email: Username, password: Password };
            const response = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: 'include',

            });

            if (!response.ok) {
                throw new Error("เกิดข้อผิดพลาดในการเชื่อมต่อกับ API");
            }

            const result = await response.json();

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
                    timer: 2000,
                });

                localStorage.setItem("userInfo", JSON.stringify(Username));
                localStorage.setItem("login", JSON.stringify(true));

                setTimeout(() => window.location.reload(), 2000);
            }
        } catch (error) {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: error.message,
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    // โหลดค่าจาก localStorage
    useEffect(() => {
        const storedLoginValue = localStorage.getItem("login") === "true";
        const storedUsernameValue = JSON.parse(localStorage.getItem("userInfo") || '""');

        setStoredLogin(storedLoginValue);
        setStoredUsername(storedUsernameValue);
    }, []);

    return (
        <div className="w-full  mx-auto mt-10">
            {/* Header Accordion */}
            <button
                className="w-full bg-[#BEDBFF] text-[#162456] font-bold text-2xl py-3 px-4 rounded-t-lg flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                Login
                <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* Accordion Content */}
            {isOpen && (
                <div className="bg-white shadow-lg rounded-b-lg p-4">
                    {storedLogin ? (
                        <div className="text-[#162456] text-xl">
                            <p>Username: {storedUsername}</p>
                            <div className="flex justify-center mt-6">
                                <button
                                    className="w-[152px] bg-[#BEDBFF] text-white h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]"
                                    onClick={logoutUser}
                                >
                                    ออกจากระบบ
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-[#162456] text-xl">
                            <p>Username</p>
                            <input
                                className="w-full rounded-lg ps-4 h-[40px] mt-2 bg-[#EFF6FF]"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <p className="mt-4">Password</p>
                            <input
                                className="w-full rounded-lg ps-4 h-[40px] mt-2 bg-[#EFF6FF]"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex justify-center mt-4">
                                {Username.length > 0 && Password.length > 0 ? (
                                    <button
                                        className="w-[152px] bg-[#BEDBFF] text-white h-[46px] rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#50A2FF]"
                                        onClick={postData}
                                        disabled={loading}
                                    >
                                        {loading ? "กำลังโหลด..." : "เข้าสู่ระบบ"}
                                    </button>
                                ) : (
                                    <button
                                        className="w-[152px] bg-gray-400 text-white h-[46px] rounded-lg flex items-center justify-center"
                                        disabled
                                    >
                                        เข้าสู่ระบบ
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
