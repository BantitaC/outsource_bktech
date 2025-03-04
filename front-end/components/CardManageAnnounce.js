import Image from 'next/image';

export default function CardManageAnnounce({ id, img, date, title, description }) {
    // const formattedDate = date.split("T")[0];

    const deleteData = async () => {
        const res = await fetch(`http://localhost:5000/advert/${id}`, {
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

    return (
        <div className="bg-white w-full rounded-lg drop-shadow-l ">
            <div className="relative w-full h-[180px]">
                <Image
                    src={`http://localhost:5000/public/images/${img}`}
                    alt="Picture of the author"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                />
            </div>
            <p className="p-2 text-xs text-[#162456] text-left">{date}</p>
            <p className="px-2 pb-4 font-bold text-[#162456] text-left">    {(title || "").length > 60 ? title.slice(0, 60) + "..." : title}
            </p>
            <div className="flex justify-end m-2">


                <button onClick={deleteData} className=" bg-[#162456] text-[20px] text-white h-[46px] rounded-lg flex items-center justify-center hover:scale-105 duration-300 hover:bg-red-400 p-4">

                    ลบข้อมูล

                </button>
            </div>
        </div>

    );
}