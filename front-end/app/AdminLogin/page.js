"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ ใช้สำหรับเปลี่ยนหน้า

export default function AdminLogin() {
  const router = useRouter(); // ✅ ใช้งาน router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      setResponse(data);


      if (data.message === "ล็อคอิน สำเร็จ") {
        alert("Login สำเร็จ!");
        localStorage.setItem("userInfo", JSON.stringify(email));
        localStorage.setItem("loginAdmin", JSON.stringify(true));
        router.push("/AdminPage");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        alert(`Login ล้มเหลว: ${data.message}`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };





  useEffect(() => {
    localStorage.clear();
  }, []);


  return (

    <div className="bg-[#F0F9FF] min-h-screen grid grid-cols-12 place-items-center ">
      <div className="col-span-2"></div>
      <div className="bg-[#DBEAFE] col-span-4 flex justify-center items-center rounded-l-lg w-full h-[650px] sm:w-">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRGNVxWsAQ7OBkqeOzjm_N7V4mP7BhYATk_Q&s" className="rounded-full w-[250px] h-auto" />
      </div>
      <div className="bg-[#BEDBFF] col-span-4 rounded-r-lg w-full h-[650px] flex flex-col justify-center">
        <h1 className="text-[50px] font-bold text[#162456] text-center">Admin Login</h1>
        <div className="flex justify-center mt-8">
          <input type="email" placeholder="Email" className="border border-gray-300 rounded-md p-2 w-[320px] h-auto" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex justify-center mt-4">
          <input type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2 w-[320px] h-auto" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={handleSubmit} className="w-[320px] h-[40px] bg-[#162456] text-white rounded-lg flex items-center justify-center duration-300 hover:scale-105 hover:bg-[#1C398E] shadow-lg">เข้าสู่ระบบ</button>

        </div>
        <div className="flex justify-center mt-1">
          <button className="w-[320px] h-[40px] bg-[#a9b1cc] text-white rounded-lg flex items-center justify-center duration-300 hover:scale-105 shadow-lg">หน้าแรก</button>
        </div>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}
