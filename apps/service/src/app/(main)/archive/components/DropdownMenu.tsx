"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface DropdownContextProps {
  isOpen: boolean;
  toggle: (e: React.MouseEvent<HTMLDivElement>) => void;
}

//컨텍스트를 생성
const DropdownContext = createContext<DropdownContextProps>({
  isOpen: false,
  toggle: () => {},
});

interface DropdownMenuProps {
  children?: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  const close = () => setIsOpen(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.body.addEventListener("mousedown", handleClickOutside);

    // Cleanup 함수: 컴포넌트 언마운트 시 또는 isOpen이 변경될 때 이벤트 리스너 제거
    return () => {
      console.log("handleClickOutside remove");
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle }}>
      <div className="relative flex flex-col gap-5 t-s" ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

interface DropdownMenuTriggerProps {
  children?: React.ReactNode;
}

export const DropdownMenuTrigger = ({ children }: DropdownMenuTriggerProps) => {
  const { toggle } = useContext(DropdownContext);

  return (
    <div
      className="flex items-center justify-center cursor-pointer p-1"
      onClick={toggle}
    >
      {children}
    </div>
  );
};

interface DropdownMenuItemProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const DropdownMenuItem = ({
  children,
  onClick,
}: DropdownMenuItemProps) => {
  return (
    <div
      className="w-full p-1 flex justify-center items-center hover:bg-line01/50 rounded-md cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface DropdownMenuGroupProps {
  children?: React.ReactNode;
}

export const DropdownMenuGroup = ({ children }: DropdownMenuGroupProps) => {
  const { isOpen } = useContext(DropdownContext);

  return (
    <div
      className={`absolute top-full right-0 mt-[4px] w-[200px] py-[10px] px-[5px] flex flex-col gap-[5px] border-line01 border rounded-lg bg-background01 z-50 transition ease-in-out duration-300
        ${isOpen ? "opacity-100 scale-100 block" : "opacity-0 scale-100 pointer-events-none"}
      `}
    >
      {children}
    </div>
  );
};

export const DropdownMenuSeparator = () => {
  return <div className="w-full h-[1px] bg-line01"></div>;
};

interface DropdownMenuCloseProps {
  children?: React.ReactNode;
}

export const DropdownMenuClose = ({ children }: DropdownMenuCloseProps) => {
  const { toggle } = useContext(DropdownContext);

  return (
    <div
      className="w-full p-1 cursor-pointer flex items-center justify-center hover:bg-danger rounded-md hover:text-background01"
      onClick={toggle}
    >
      {children}
    </div>
  );
};
