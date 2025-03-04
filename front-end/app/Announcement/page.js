"use client";
import CardAnnounce from "@/components/CardAnnounce";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

async function getData() {
  const res = await fetch("http://localhost:5000/advert");
  return res.json();
}


export default function Announcement() {

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
                <CardAnnounce id={item.id} img={item.image_path} date={item.created_at} title={item.title} description={item.description} />
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
