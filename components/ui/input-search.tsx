import * as React from "react";

import { SearchIcon } from "lucide-react";
import { Input } from "./input";

function InputSearch({ ...props }: React.ComponentProps<"input">) {
  return (
    <div className="flex w-full max-w-sm items-center relative px-2.5 py-1.5">
      <SearchIcon className="absolute h-4 w-4 ml-2.5" />
      <Input
        type="search"
        placeholder="Buscar..."
        className="w-full border-0 pl-10"
        {...props}
      />
    </div>
  );
}

export { InputSearch };
