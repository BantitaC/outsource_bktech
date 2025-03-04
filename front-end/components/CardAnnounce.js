import Link from "next/link";
import Image from 'next/image';

export default function CardAnnounce({ id, img, date, title, description }) {
    const formattedDate = date.split("T")[0];
    return (
        <div className="">
            <Link
                href={{
                    pathname: "/AnnouncePage",
                    query: { id: id, image: img, date: formattedDate, title: title, description: description}
                }}
                className="text-blue-500"
            >
                <button className="bg-white w-full rounded-lg drop-shadow-l hover:scale-105 duration-300">
                    <div className="relative w-full h-[180px]">
                        <Image
                            src={`http://localhost:5000/public/images/${img}`}
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                        />
                    </div>
                    <p className="p-2 text-xs text-[#162456] text-left">{formattedDate}</p>
                    <p className="px-2 pb-4 font-bold text-[#162456] text-left">{title.length > 60 ? title.slice(0, 60) + "..." : title}</p>
                </button>
            </Link>
        </div>
    );
}