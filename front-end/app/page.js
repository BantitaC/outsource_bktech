import Image from "next/image";
import Navbar from "@/components/Navbar";
import CardLogin from "@/components/CardLogin";
import Map from "@/components/Map";
import Actvity from "@/components/Actvity";
import QnA from "@/components/QnA";
import Annoucement from "@/components/Annoucement";
import LoginAccordion from "@/components/LoginAccodain";
export default function Home() {
  return (
    <div className="bg-[#F0F9FF] min-h-screen overflow-x-hidden">
      <Navbar />

      <div className="grid grid-cols-12 gap-4">
        <div className=" col-span-12 mt-2 ms-2 lg:col-span-3">
          <CardLogin />
          <div className="mt-4">
            <Map />

          </div>
        </div>
        <div className="col-span-12 mt-2 ms-2 lg:col-span-6">
          <div>
            <Annoucement />
          </div>

          <div className="mt-6">
            <Actvity />
          </div>        </div>
        <div className="col-span-12 mt-2 ms-2 lg:col-span-3">
          <QnA /></div>

      </div>
    </div>
  );
}
