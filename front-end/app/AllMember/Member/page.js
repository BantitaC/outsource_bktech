"use client"
import CardMember from "@/components/CardMember";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

async function getData() {
  const res = await fetch("http://localhost:5000/student");
  return res.json();
}

export default function Member() {

  const [data1, setData1] = useState(null);

  useEffect(() => {
    getData().then(setData1);
  }, []);

  return (
    <div className="bg-[#F0F9FF] min-h-screen">
      <Navbar />

      <div className="grid grid-cols-12">
        <div className="col-span-1">
        </div>

        <div className="col-span-10 my-5 break-normal">
          <div className="flex flex-wrap gap-4">
            {data1?.map((item) => (
              <div key={item.id} className="w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)]">
                <CardMember id={item.id} image={item.image} name={item.name} nick={item.nick} created_at={item.created_at} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1">
        </div>
      </div>


    </div>
  );
}
