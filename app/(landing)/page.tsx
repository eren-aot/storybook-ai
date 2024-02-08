"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div className="relative" id="hero">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="relative pt-80 sm:pt-24 ml-auto flex justify-between items-center h-screen">
          <Image
            src={"/Hero.png"}
            alt="Hero"
            width={400}
            height={400}
          />

          <div className="lg:w-2/3 flex flex-col gap-4 items-center mx-auto">
            <p className='text-primary font-semibold mt-8 md:mt-0 text-xl md:text-2xl xl:text-3xl text-center w-2/3'>
              Empowering children and adults to be their own creator. Create a hyperpersonalized story in 30 seconds now for free!
            </p>
            <Button size="lg" onClick={() => router.push("/create-story")}>Create your story</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
