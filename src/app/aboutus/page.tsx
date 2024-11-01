import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

const values = [
  {
    text: "To provide excellence in education and also to provide teaching of the highest quality.",
  },
  {
    text: "To introduce pupils to a variety of recreational and co-curricular activities to develop physical fitness combined with health-consciousness and to foster team spirit and magnanimity.",
  },
  {
    text: "To prepare pupils to study at Colleges and Universities that accept internationally recognized entrance qualifications.",
  },
  {
    text: "To promote community services, reaching out into society and to create a better understanding of social problems.",
  },
  {
    text: "To develop in every pupil; self-discipline, responsibility, spiritual and moral values, consideration for others, and pride in one’s self and one’s achievements, leading to the highest possible standards of behavior.",
  },
  {
    text: "To develop in every pupil; self-discipline, responsibility, spiritual and moral values, consideration for others, and pride in one’s self and one’s achievements, leading to the highest possible standards of behavior.",
  },
];

const team = [
  {
    image: 'image/images.jfif',
    position: 'Principal',
    name: 'Mr.A.M.Ranasinghe',
  },
  {
    image: 'image/images (8).jpeg',
    position: 'Vice Principal',
    name: 'Mr.R.M.Yasarathna',
  },
  {
    image: 'image/images.jfif',
    position: 'Principal',
    name: 'Mr.A.M.Ranasinghe',
  },
  {
    image: 'image/images (8).jpeg',
    position: 'Vice Principal',
    name: 'Mr.R.M.Yasarathna',
  },
  
]

export default function page() {
  
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col items-center">
        <div className="relative w-screen">
          <img
            src="/image/hq720.jpg"
            alt=""
            className="w-screen lg:h-screen h-[50vh] object-cover opacity-50"
          />

          {/* Overlay text */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center ">
            <h1 className="text-[#3A0F09] text-6xl lg:text-[153px] font-bold ">
              ABOUT US
            </h1>
          </div>
        </div>
        <div className="lg:w-4/5 w-screen  flex flex-col items-start lg:py-10 py-5 px-3 ">
          <h1 className="lg:text-5xl text-2xl text-[#3A0F09] font-semibold lg:mb-5 mb-1">
            About AMCC
          </h1>
          <p className="lg:text-2xl text-[#3A0F09]">
            Children are the world's most valuable resource and its best hope
            for the futureChildren are the world's most valuable resource and
            its best hope for the.Children are the world's most valuable
            resource and its best hope for the futureChildren are the world's
            most valuable resource and its best hope for the.Children are the
            world's most valuable resource and its best hope for the
            futureChildren are the world's most valuable resource and its best
            hope for the.
          </p>
        </div>
        <div className="lg:flex w-screen lg:h-96">
          <div className="lg:w-2/3  h-2/3 bg-[#691411] text-white lg:h-full lg:p-10 p-5">
            <h1 className="text-2xl  font-semibold lg:mb-5 mb-3">
              OUR MISSION
            </h1>
            <p className="lg:text-5xl text-xl">
              Children are the world's most valuable resource and its best hope
              for the futureChildren are the world's most valuable resource and
              its best hope for the.
            </p>
          </div>
          <div className="flex flex-col lg:w-1/3 h-1/3 bg-[#3A0F09] text-white lg:h-full lg:p-10 p-5">
            <h1 className="text-2xl  font-semibold lg:mb-5 mb-3">
              OUR VISSION
            </h1>
            <p className="lg:text-5xl text-xl">
              Children are the world's most valuable resource and its best hope
              for the future.
            </p>
          </div>
        </div>

        <div className="lg:flex w-screen lg:h-auto  lg:py-20 py-10">
          <div className="relative lg:flex justify-center lg:w-1/2 h-1/2 lg:h-auto">
            <div className="lg:w-4/5 h-4/5 lg:h-auto w-full bg-white relative lg:flex justify-center  z-10">
              <h1 className="text-4xl text-center font-bold opacity-50 text-[#3A0F09]">
                OUR VALUES
              </h1>
            </div>
            <div className="lg:w-1/5 h-1/5 lg:h-auto bg-[#F8F4F4] relative z-10"></div>
            <img
              src="image/about_us.png"
              alt=""
              className="absolute lg:block hidden lg:w-full w-4/5 lg:h-4/5 mt-20  object-cover z-20"
            />
          </div>

          <div className="lg:w-1/2 h-1/2 lg:h-auto bg-[#F8F4F4] flex flex-col items-center justify-center lg:pr-10 lg:py-10 py-5">
            {values.map((item, index) => (
              <div className="flex justify-center items-start mb-3 lg:px-10 px-5">
                {/* <FaRegDotCircle className="text-xl"/> */}
                <p className="lg:text-2xl">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-screen h-auto py-20 bg-[#691411] flex items-center justify-center">
          <div className="h-full w-4/5">
            <h1 className="text-white text-4xl font-bold mb-2">OUR TEAM</h1>
            <p className="text-white text-xl opacity-85 mb-8">
              Excepturi repudiandae alias ut. Totam aut facilis. Praesentium in
              neque vel omnis. Eos error odio. Qui fugit voluptatibus eum culpa.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10">
              {team.map((item,index)=>(
                <div className="max-w-sm bg-white border-none rounded-lg shadow">
                <a href="#">
                  <img
                    className="rounded-t-lg w-full h-80 object-cover"
                    src={item.image}
                    alt=""
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700">
                      {item.position}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-600">
                  {item.name}
                  </p>
                  
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
