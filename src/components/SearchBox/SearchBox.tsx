import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (searchQuery: string) => void;
  query: string;
}

export default function SearchBox({ onSearch, query }: SearchBoxProps) {
  return (
    <input
      name="noteQuery"
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={query}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
