import { Button } from "@nova/ui/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@nova/ui/components/ui/form";
import { Input } from "@nova/ui/components/ui/input";
import { cn } from "@nova/ui/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import { JSX, useState } from "react";
import { ControllerRenderProps, Path, UseFormReturn } from "react-hook-form";
import { formatPhoneNumber } from "@/src/shared/utils/formatPhoneNumber";
import { useInputFocus } from "../../hooks/useInputFocus";
import EmailAutoComplete from "./EmailAutoComplete";
import { EmailList, isEmail, isNonEmptyArray } from "../../utils/email";

// StringKeys 타입 정의: T에서 string 또는 number 타입의 키만 추출
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

export function InputFormField<T extends Record<string, any>>({
  form,
  name,
  label,
  placeHolder,
  type = "text",
  inputMode,
  pattern,
  leftIcon,
  hasToggleIcon,
  disabled = false,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeHolder: string;
  type?: string;
  inputMode?: "numeric";
  pattern?: string;
  leftIcon?: JSX.Element;
  hasToggleIcon?: boolean;
  disabled?: boolean;
}) {
  const { isFocused, inputRef } = useInputFocus();
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [focusIdx, setFocusIdx] = useState<number>(-1);

  const atIndex = emailInput.indexOf("@");
  let domainSearch = atIndex === -1 ? "" : emailInput.slice(atIndex + 1);
  // 골뱅이가 여러개일 때 체크
  if (domainSearch.includes("@")) {
    let splitAt = domainSearch.split("@");
    if (isNonEmptyArray(splitAt)) {
      domainSearch = splitAt[0];
    }
  }

  const filteredEmailList =
    atIndex === -1
      ? EmailList
      : EmailList.filter((list) => list.domain.startsWith(domainSearch));

  // 이메일을 keyDown 형태로 추가하고싶어서 진행했는데 리스트 위치를 알아야해서 리스트를 input이 있는곳에서 관리해줘야함 아래에서 위 함수를 정의하는 방식은 위험하다.
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, any>
  ) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusIdx((prev) => (prev + 1) % filteredEmailList.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusIdx((prev) =>
          prev <= 0 ? filteredEmailList.length - 1 : prev - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (focusIdx >= 0 && focusIdx < filteredEmailList.length) {
          const selected = filteredEmailList[focusIdx]!;
          const base = emailInput.split("@")[0];
          const newEmail = `${base}@${selected.domain}`;
          setEmailInput(newEmail);
          field.onChange(newEmail);
          setFocusIdx(-1);
        }
        break;
      case "Escape":
        setFocusIdx(-1);
        break;
    }
  };

  return (
    <FormField
      control={form.control}
      // TODO : any가 사라졌으면 좋겠다....
      name={name as any}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="space-y-1 relative">
          <div className="flex gap-2 items-center">
            <FormLabel
              className={cn(
                "t-m !font-bold ml-1 text-text01 transition-colors peer-focus:text-primary",
                error
                  ? "text-danger"
                  : isFocused
                    ? "text-primary"
                    : "text-text01"
              )}
            >
              {label}
            </FormLabel>
            <FormMessage className="b-s text-danger transition-colors" />
          </div>
          {leftIcon && (
            <div
              className={cn(
                "absolute left-2 top-[43px] -translate-y-1/2 pointer-events-none",
                error
                  ? "text-danger"
                  : isFocused
                    ? "text-primary"
                    : "text-line01"
              )}
            >
              {leftIcon}
            </div>
          )}
          <FormControl ref={inputRef}>
            <Input
              className={cn(
                "peer b-m h-10 transition-colors rounded-sm border-line01 w-full",
                error
                  ? "text-danger border-danger placeholder:text-danger"
                  : "focus:border-primary focus:text-primary focus:placeholder-primary",
                leftIcon ? "pl-10" : ""
              )}
              autoComplete="off"
              type={hasToggleIcon && !showPassword ? type : "text"}
              placeholder={placeHolder}
              disabled={disabled}
              {...(inputMode ? { inputMode } : {})}
              {...(pattern ? { pattern } : {})}
              {...field}
              value={
                type === "tel" && typeof field.value === "string"
                  ? formatPhoneNumber(field.value)
                  : field.value
              }
              onChange={(e) => {
                const newValue = e.target.value;
                setEmailInput(newValue);
                const formatted =
                  type === "tel" ? formatPhoneNumber(newValue) : newValue;
                field.onChange(formatted);
              }}
              onKeyDown={
                type === "email" ? (e) => handleKeyDown(e, field) : undefined
              }
            />
          </FormControl>
          {hasToggleIcon && (
            <Button
              type="button"
              variant={"transparent"}
              className={cn(
                "absolute right-1 top-[44px] -translate-y-1/2 text-line01",
                error
                  ? "text-danger"
                  : isFocused
                    ? "text-primary"
                    : "text-line01"
              )}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClosed size={22} /> : <Eye size={22} />}
            </Button>
          )}
          {/* TODO: onMouseDown 말고 onClick으로 따로 변수 만들어서 on/off 하는게 더 부드러워 보일것 같음! */}
          {type === "email" &&
            isFocused &&
            emailInput.includes("@") &&
            !isEmail(emailInput) && (
              <EmailAutoComplete
                items={filteredEmailList}
                focusIdx={focusIdx}
                text={emailInput}
                onSelect={(newEmail) => {
                  setEmailInput(newEmail); // 내부 상태 업데이트
                  field.onChange(newEmail); // react-hook-form 필드 업데이트
                }}
              />
            )}
        </FormItem>
      )}
    />
  );
}
