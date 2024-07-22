import { MoveRight } from "lucide-react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

function Home() {
  return (
    <div className="container mx-auto">
      <section className="text-center flex flex-col items-center gap-3 mt-28">
        <h1 className=" text-5xl font-bold">
          THE BEST SHORT <br />{" "}
          <span className="text-4xl text-blue-400">LINK MANAGER</span>
        </h1>
        <p className="">
          Corto is the open source link management <br /> tool for modern
          marketing teams.
        </p>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
            Start Free
            <MoveRight className="size-5" />
          </button>
        </div>
      </section>
      <section>
        <h2 className="text-center my-9">Enterprises that suport corto</h2>
        <div className="border sm:border-red-500 md:border-blue-400 lg:border-green-400 xl:border-yellow-400"></div>
        <div className="flex lg:flex-col justify-around">
          <div className="flex flex-col gap-y-2 gap-x-8 justify-center lg:flex-row  ">
            {new Array(7).fill(0).map((_, index) => (
              <div className="flex gap-3 items-center" key={index}>
                <img
                  src="src\assets\icons\prisma.png"
                  className="w-8"
                  alt="prisma"
                />
                <span className="font-bold">PRISMA</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-2 gap-x-8 lg:flex-row justify-center">
            {new Array(7).fill(0).map((_, index) => (
              <div className="flex gap-3 items-center" key={index}>
                <img
                  src="src\assets\icons\prisma.png"
                  className="w-8"
                  alt="prisma"
                />
                <span className="font-bold">PRISMA</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col md:flex-row gap-y-3 justify-around items-center bg-gray-300 text-6xl py-8">
        <div className="flex flex-col items-center flex-1">
          <span className="font-bold">8,500</span>
          <span className="text-lg font-bold text-gray-500">
            ACTIVE COMPANIES
          </span>
        </div>
        <div className="flex flex-col items-center md:border-x border-gray-400 flex-1">
          <span className="font-bold">387,1k</span>
          <span className="text-lg font-bold text-gray-500">LINK CREATED</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="font-bold">45.3M</span>
          <span className="text-lg font-bold text-gray-500">CLIKS TRACKED</span>
        </div>
      </section>
      //questions
      <section>
        <div className="flex flex-col bg-gray-300 rounded-lg p-4 gap-y-4">
          <Disclosure>
            <DisclosureButton className="border">
              <span className="">hola</span>
            </DisclosureButton>
            <DisclosurePanel>
              <p className="text-gray-500">bro wtf</p>
            </DisclosurePanel>
          </Disclosure>
          <Disclosure>
            <DisclosureButton>
              <span className="border">hola</span>
            </DisclosureButton>
            <DisclosurePanel>
              <p className="text-gray-500">bro wtf</p>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </section>
      <section>reviews</section>
      <section>path</section>
      <section>github</section>
      <div>call to action</div>
    </div>
  );
}
export default Home;
