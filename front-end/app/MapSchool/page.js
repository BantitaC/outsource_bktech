import Navbar from "@/components/Navbar";


export default function Map() {
    return (
        <div className="bg-[#F0F9FF] min-h-screen">
            <Navbar />

            <div className="grid grid-cols-12">
                <div className="col-span-1">
                </div>

                <div className="col-span-10 mt-5 ">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.3154299256753!2d101.21710955735539!3d12.822882232821858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102e43749dc9fa3%3A0xac48aad048f7a72d!2z4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4LmA4LiX4LiE4LiZ4Li04LiE4Lia4LmJ4Liy4LiZ4LiE4LmI4Liy4Lii!5e0!3m2!1sth!2sth!4v1739421394617!5m2!1sth!2sth" className="w-full" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    <div className="mt-5">
                        11 ตำบล หนองละลอก อำเภอบ้านค่าย ระยอง 21120 <br></br>
                        https://www.facebook.com/bktechdve <br></br>
                        038017941
                        R6F8+6R ตำบล หนองละลอก อำเภอบ้านค่าย ระยอง <br></br>
                    </div>
                </div>
                <div className="col-span-1">
                </div>
            </div>


        </div>
    );
}
