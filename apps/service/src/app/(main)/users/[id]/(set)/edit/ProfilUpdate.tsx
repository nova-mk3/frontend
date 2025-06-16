import React from "react";
import Image from "next/image";
import { SimpleProfileQueryOptions } from "../../query/options";
import { useQuery } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import {
  useDeleteProfileMuation,
  useUserProfilePostMutation,
} from "../../query/mutation";

export default function ProfilUpdate({ memberId }: { memberId: string }) {
  const { data } = useQuery(SimpleProfileQueryOptions());
  const useMutation = useUserProfilePostMutation({ memberId });
  const useProfileDelteMutatuon = useDeleteProfileMuation({ memberId });

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formdata = new FormData();
      formdata.append("profilePhoto", file);
      useMutation.mutate({ formdata, memberId });
    }
  };

  const handleDeleteProfile = async (profileMemberId: string) => {
    useProfileDelteMutatuon.mutate(profileMemberId);
  };

  if (!data) return null;
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative items-center">
        <Image
          src={data.profilePhoto.imageUrl}
          alt={data.profilePhoto.originalFileName}
          width={86}
          height={86}
          className={`w-24 h-24 object-cover rounded-full`}
          unoptimized={true}
          priority={true}
        />
        <label
          htmlFor="profile"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black border-[3px] border-white absolute bottom-[-5px] right-[-5px] cursor-pointer"
        >
          <Camera size={16} className="text-white" />
        </label>
        <input
          id="profile"
          type="file"
          className="hidden"
          accept=".jpg, .jpeg, .png"
          onChange={handleFileOnChange}
        />
      </div>
      <div
        className="text-gray-400 text-base mt-5 cursor-pointer hover:underline"
        onClick={() => handleDeleteProfile(memberId)}
      >
        이미지 삭제
      </div>
    </div>
  );
}
