import Image from "next/image";
import { FaGithubSquare } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function ProfileCard() {
  return (
    <div className="font-noto flex items-center gap-6 p-6 select-none">
      {/* 프로필 이미지 */}
      <div className="flex-shrink-0">
        <Image
          src="/profile.webp"
          alt="프로필 이미지"
          width={128}
          height={128}
          sizes="(max-width: 640px) 79px, 128px"
          className="aspect-square object-cover rounded-full border sm:w-[128px] sm:h-[128px] w-[79px] h-[79px]"
        />
      </div>

      {/* 소개 텍스트 */}
      <div>
        <h2 className="sm:text-2xl text-xl font-bold">BieNew22</h2>
        <p className="sm:text-base text-xs text-gray-600 dark:text-gray-100">코드에 땀 묻히는 중...💦</p>

        {/* 소셜 아이콘 링크 */}
        <div className="mt-2 flex gap-3 text-gray-500">
          <a
            href="https://github.com/BieNew22"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white"
          >
            <FaGithubSquare size={20} />
          </a>
          <a
            href="mailto:newbie11004@gmail.com"
            className="hover:text-black dark:hover:text-white"
          >
            <IoMdMail size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
