"use client";
import { useState } from "react";
import { Button } from "@nova/ui/components/ui/button";
import {
  Phone,
  IdCard,
  Cake,
  Mail,
  GraduationCap,
} from "lucide-react";
import { ProfileImage } from "@nova/ui/components/ui/profileImage";
import { Input } from "@nova/ui/components/ui/input";
import { cn } from "@nova/ui/lib/utils";
import { RadioGroup, RadioGroupItem } from "@nova/ui/components/ui/radio-group";
import { Textarea } from "@nova/ui/components/ui/textarea"; 
import {
  MamnageMemberCardModalContentProps,
} from "@/src/types/manageMember";

export default function ManageMemberCardModalContent({
  memberId,
  onClose,
}: MamnageMemberCardModalContentProps) {
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    profilePhoto: {
      imageUrl: "string",
    },
    name: "홍길동",
    phone: "010-1234-5678",
    studentNumber: "2012345678",
    email: "test@example.com",
    grade: "3",
    semester: "1",
    birth: "1999-01-01",
    introduction: "안녕하세요! (한 줄)",
    job: "백엔드 개발자",
    work: false,
    contact: false,
    contactInfo: "카카오톡 mykakao",
    contactDescription: "연락 부탁드립니다.",
    year: "2022",
    isGraduation: false,
    isAbadence: false,
  });

  const commonInputClass = cn(
    "mt-1",
    "md:text-2xl",
    !isEditMode && "border-none shadow-none outline-none focus:outline-none focus:ring-0"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function mapBooleansToRadioValue(isGraduation: boolean, isAbadence: boolean) {
    if (isGraduation) return "졸업";
    if (isAbadence) return "휴학중";
    return "재학중";
  }
  
  function mapRadioValueToBooleans(value: "재학중" | "휴학중" | "졸업") {
    switch (value) {
      case "졸업":
        return { isGraduation: true, isAbadence: false };
      case "휴학중":
        return { isGraduation: false, isAbadence: true };
      default:
        return { isGraduation: false, isAbadence: false };
    }
  }
  const radioValue = mapBooleansToRadioValue(
    formData.isGraduation,
    formData.isAbadence
  );
  const handleStatusChange = (value: string) => {
    const converted = mapRadioValueToBooleans(
      value as "재학중" | "휴학중" | "졸업"
    );
    setFormData((prev) => ({ ...prev, ...converted }));
  };

  function mapWorkToRadioValue(work: boolean) {
    return work ? "재직" : "구직";
  }
  function mapRadioValueToWork(value: "재직" | "구직") {
    return value === "재직";
  }

  function mapContactToRadioValue(contact: boolean) {
    return contact ? "취업정보 공개" : "취업정보 미공개";
  }
  function mapRadioValueToContact(value: "취업정보 공개" | "취업정보 미공개") {
    return value === "취업정보 공개";
  }

  const handleEditOrSave = () => {
    setIsEditMode((prev) => !prev);
    // 여기서 서버에 저장하는 로직 등 수행 가능
  };

  return (
    <>
      <div className="flex flex-col items-center w-[700px] space-y-8 py-20">
        <ProfileImage
          src={formData.profilePhoto.imageUrl}
          size={160}
        />
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          readOnly={!isEditMode}
          className={cn(
            "md:text-4xl font-bold text-center h-[50px] w-[400px]",
            !isEditMode && "border-none shadow-none outline-none focus:outline-none focus:ring-0"
          )}
        />
        <div className="flex items-center space-x-3">
          <Phone className="h-8 w-8 text-gray-600" />
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            readOnly={!isEditMode}
            className={commonInputClass}
          />
        </div>
        <div className="flex items-center space-x-3">
          <IdCard className="h-8 w-8 text-gray-600" />
          <Input
            name="studentNumber"
            value={formData.studentNumber}
            onChange={handleChange}
            readOnly={!isEditMode}
            className={commonInputClass}
          />
        </div>
        {formData.isGraduation ? (
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-gray-600" />
            <Input
              name="year"
              value={formData.year}
              onChange={handleChange}
              readOnly={!isEditMode}
              className={commonInputClass}
              placeholder="졸업 연도"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-gray-600" />
            <Input
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              readOnly={!isEditMode}
              className={cn(commonInputClass, "w-[170px]")}
              placeholder="학년"
            />
            <Input
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              readOnly={!isEditMode}
              className={cn(commonInputClass, "w-[170px]")}
              placeholder="학기"
            />
          </div>
        )}
        <div className="flex items-center space-x-3">
          <Cake className="h-8 w-8 text-gray-600" />
          <Input
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            readOnly={!isEditMode}
            className={commonInputClass}
          />
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="h-8 w-8 text-gray-600" />
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!isEditMode}
            className={commonInputClass}
          />
        </div>
        <div className="flex flex-col items-center mt-6">
          <div className="text-2xl font-bold mb-2">재학 상태</div>
          <RadioGroup
            value={radioValue}
            onValueChange={handleStatusChange}
            className="flex items-center space-x-6 text-2xl"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="재학중"
                id="radio-student"
                disabled={!isEditMode}
              />
              <label htmlFor="radio-student">재학</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="휴학중"
                id="radio-leave"
                disabled={!isEditMode}
              />
              <label htmlFor="radio-leave">휴학</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="졸업"
                id="radio-graduate"
                disabled={!isEditMode}
              />
              <label htmlFor="radio-graduate">졸업</label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="w-[2px] bg-gray-300 mx-6" />
      <div className="flex flex-col justify-between w-[700px] text-gray-700">
        <div>
          <div className="mb-4">
            <div className="text-2xl font-semibold">자기소개</div>
            <Textarea
              name="introduction"
              value={formData.introduction}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
              }}
              readOnly={!isEditMode}
              rows={10}
              maxLength={250}
              className="md:text-2xl"
              placeholder="자기소개를 최대 250자까지 입력 가능..."
            />
          </div>

          {formData.isGraduation && (
            <>
              <div className="flex mb-4 space-x-8">
                <div className="flex-1">
                  <div className="text-2xl font-semibold mb-2">근무 상태</div>
                  <RadioGroup
                    value={mapWorkToRadioValue(formData.work)}
                    onValueChange={(v) => {
                      setFormData((prev) => ({
                        ...prev,
                        work: mapRadioValueToWork(v as "재직" | "구직"),
                      }));
                    }}
                    className="flex items-center space-x-6 text-xl"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="구직" id="radio-work-false" disabled={!isEditMode} />
                      <label htmlFor="radio-work-false">구직</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="재직" id="radio-work-true" disabled={!isEditMode} />
                      <label htmlFor="radio-work-true">재직</label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-semibold mb-2">취업정보 공개 여부</div>
                  <RadioGroup
                    value={mapContactToRadioValue(formData.contact)}
                    onValueChange={(v) => {
                      setFormData((prev) => ({
                        ...prev,
                        contact: mapRadioValueToContact(v as "취업정보 공개" | "취업정보 미공개"),
                      }));
                    }}
                    className="flex items-center space-x-6 text-xl"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="취업정보 미공개"
                        id="radio-contact-false"
                        disabled={!isEditMode}
                      />
                      <label htmlFor="radio-contact-false">미공개</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="취업정보 공개"
                        id="radio-contact-true"
                        disabled={!isEditMode}
                      />
                      <label htmlFor="radio-contact-true">공개</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-2xl font-semibold">취업 정보</div>
                <Input
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                  className={commonInputClass}
                />
              </div>
              <div className="mb-4">
                <div className="text-2xl font-semibold">연락처 설명</div>
                <Input
                  name="contactDescription"
                  value={formData.contactDescription}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                  className={commonInputClass}
                />
              </div>
              <div className="mb-4">
                <div className="text-2xl font-semibold">연락처 정보</div>
                <Input
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                  className={commonInputClass}
                />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="default" onClick={onClose}>
            취소
          </Button>
          <Button variant="default" onClick={handleEditOrSave}>
            {isEditMode ? "저장" : "편집"}
          </Button>
          <Button variant="default" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </>
  );
}
