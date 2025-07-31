import { useCallback, useState } from "react";

import debounce from "lodash.debounce";
import { useGetSuggestionsQuery } from "../../api";

interface Props {
  onSearch: (city: string) => void;
}

const useWeatherSearch = (props: Props) => {
  const { onSearch } = props;
  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const { data: suggestions } = useGetSuggestionsQuery(query, {
    skip: !query,
  });

  const debouncedSetQuery = useCallback(
    debounce((value: string) => setQuery(value), 400),
    []
  );

  const handleInput = useCallback(
    (val: string) => {
      setInput(val);
      debouncedSetQuery(val);
    },
    [debouncedSetQuery]
  );

  const handleSearch = useCallback(() => {
    onSearch(input);
  }, [onSearch, input]);

  const handleSuggestionClick = useCallback(
    (city: string) => {
      setInput(city);
      onSearch(city);
    },
    [onSearch]
  );

  return ({
    handleInput,
    handleSearch,
    handleSuggestionClick,
    suggestions,
    input,
  })
}

export default useWeatherSearch