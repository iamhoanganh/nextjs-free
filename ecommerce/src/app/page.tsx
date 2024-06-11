import Header from "@/app/header";
import {Button} from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
        <div className="w-[700px] h-[700px] bg-red-300">
            <Image src={'https://images.pexels.com/photos/20434627/pexels-photo-20434627/free-photo-of-g-d-ng-phong-c-nh-n-c.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} alt={"screenshort"} width={500} height={500} quality={100} className={"w-[100%]"}/>
        </div>
        <Button variant="default">Button</Button>
    </main>
  );
}