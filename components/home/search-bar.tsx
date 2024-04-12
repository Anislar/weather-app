import { FC, useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  MagnifyingGlassIcon,
  NoSymbolIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { theme } from "@/constants/Colors";
import useFetch from "@/hooks/useFetch";
import useDebounce from "@/hooks/useDebounce";

interface SearchBarProps {
  handleLocation: (item: string) => void;
}
type Item = {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
};
export const SearchBar: FC<SearchBarProps> = ({ handleLocation }) => {
  const [isSearchBarActive, toggleSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<TextInput>(null);
  const debouncedSearchText = useDebounce(searchText, 700);
  const handleSearch = useCallback((text: string) => {
    if (text === "") {
      inputRef.current?.clear();
      inputRef.current?.blur();
    }
    setSearchText(text);
  }, []);

  const { status, data } = useFetch({
    q: searchText === "" ? "" : debouncedSearchText,
    type: "search",
  });
  return (
    <View
      className="mx-4 relative z-50 "
      style={{
        height: "7%",
      }}>
      <View
        style={{
          backgroundColor: isSearchBarActive
            ? theme.colors.bgWhite(0.2)
            : "transparent",
        }}
        className="flex-row justify-end items-center rounded-full">
        {isSearchBarActive && (
          <View className="   flex-1 transform delay-100 ">
            <TextInput
              ref={inputRef}
              onChangeText={handleSearch}
              keyboardType="web-search"
              placeholder="Search for city"
              placeholderTextColor="lightgray"
              className=" pl-6  h-11 pb-0.5 text-base flex-1 text-white"
            />
          </View>
        )}
        <TouchableOpacity
          disabled={status === "loading"}
          onPress={() => {
            if (searchText.length > 0) {
              handleSearch("");
            } else toggleSearchBar((p) => !p);
          }}
          style={{
            backgroundColor: theme.colors.bgWhite(0.5),
          }}
          className={`rounded-full justify-center items-center ${
            !isSearchBarActive ? "h-auto w-auto" : "h-10 w-10"
          }   p-2 m-1.5`}>
          {isSearchBarActive && searchText.length > 0 ? (
            status === "loading" ? (
              <ActivityIndicator
                size="small"
                color={theme.colors.bgWhite(0.7)}
              />
            ) : (
              <XMarkIcon size="25" color={theme.colors.bgWhite(0.7)} />
            )
          ) : (
            <MagnifyingGlassIcon size="25" color={theme.colors.bgWhite(0.7)} />
          )}
        </TouchableOpacity>
        {isSearchBarActive &&
          status === "success" &&
          (Array.isArray(data) && data.length > 0 ? (
            <View className=" absolute w-full divide-y-2  divide-gray-400  bg-gray-300 top-16 rounded-3xl">
              {data.map((item: Item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    handleLocation(item.name);
                    toggleSearchBar(false);
                  }}
                  className="flex-row items-center py-3  px-4   "
                  key={index}>
                  <MapPinIcon size="20" color="gray" />
                  <Text className="text-black text-base ml-0.5">
                    {item.name}, {item.country}{" "}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className=" absolute w-full  flex-row items-center justify-center  py-3  px-4    bg-gray-300 top-16 rounded-3xl">
              <NoSymbolIcon size="22" color="gray" />
              <Text className="text-gray-800 text-base ml-0.5">
                No results found
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};
