
import Image from 'next/image';

export default function CardMember({ id, image, nick, name, created_at }) {
    const formattedDate = created_at.split("T")[0];
    return (
        <div className="">
            <button className="bg-white w-full rounded-lg drop-shadow-l">
                <div className="relative w-auto h-[300px]">
                    <Image
                        src={`http://localhost:5000/public/images/${image}`}
                        alt="Picture of the author"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg "
                    />
                </div>
                <p className='px-4 pt-2 font-bold text-[#162456] text-left text-xl'>{id}</p>
                <p className='px-4 pt-2 text-[#162456] text-left text-xl'>{nick}</p>
                <p className='px-4 pt-2 pb-4 text-[#162456] text-left text-xl'>{name}</p>
                <p className='p-4 text-xs text-[#162456] text-left'>{formattedDate}</p>
            </button>
        </div>
    );
}