import { cn } from "@nova/ui/lib/utils";

interface EmojiCirCleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

export function EmojiCirCleButton({
  children,
  className,
  ...props
}: EmojiCirCleProps) {
  return (
    <button
      className={cn(
        `border-line01 border-[1px] bg-white w-[48px] h-[48px] flex justify-center items-center text-[#868E96] rounded-[32px] hover:border-black hover:border-[1.8px] cursor-pointer hover:text-black`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
