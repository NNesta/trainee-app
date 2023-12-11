import React, { KeyboardEventHandler, useRef, useState } from "react";
import Button from "./Button";

const SearchInput = ({ setSearchQuery }: { setSearchQuery: any }) => {
  const [searchString, setSearchString] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const onSubmitSearch = () => {
    setSearchQuery(searchString);
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      setSearchQuery(searchString);
    }
  };

  return (
    <div className="flex w-full  items-center max-w-xl px-1 py-1 h-[58px] border border-[#DBD5E0] rounded-xl">
      <input
        className="px-2 flex-1 outline-none border-none h-full"
        placeholder="Enter name"
        name="search"
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
        ref={searchRef}
        onKeyDown={handleKeyPress}
      />
      <Button clickHandler={onSubmitSearch} variant="small">
        Search
      </Button>
    </div>
  );
};

export default SearchInput;
