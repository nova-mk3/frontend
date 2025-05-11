import Logo from "@/public/image/Logo.svg";
import Link from "next/link";

export function Background() {
  return (
    <div className="w-[45%] mobile:hidden">
      <Link href={"/"}>
        <Logo
          width={220}
          fill={"#FFFFFFF5"}
          className="absolute top-[-121px] left-[248px]"
        />
      </Link>

      <Logo
        width={140}
        fill={"#FFFFFF95"}
        className="absolute top-[-341px] left-[52px] rotate-[14deg] blur-[2px]"
      />
      <Logo
        width={160}
        fill={"#FFFFFFD5"}
        className="absolute top-[301px] left-[78px] rotate-[36deg] blur-[1.5px]"
      />
      <Logo
        width={160}
        fill={"#FFFFFFB5"}
        className="absolute top-[101px] left-[580px] rotate-[45deg] blur-[1.5px]"
      />
      <div className="absolute top-[55%] left-[15%] text-center ">
        <p className="text-background01 d-m">Welcome</p>
        <p className="text-background01 h-l">to Club Nova</p>
      </div>
    </div>
  );
}
