import { useDebouncedCallback } from "use-debounce";
import css from "./SearchBox.module.css";
import { useEffect, useState } from "react";

interface SearchBoxProps {
  onSearch: (searchQuery: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    300,
  );

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  return (
    //without "controlled element" to keep it simple
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleInputChange}
    />
  );
}
