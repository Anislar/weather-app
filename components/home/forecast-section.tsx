import { theme } from "@/constants/Colors";
import { weatherImages } from "@/constants/weather-api-utils";
import useFetch from "@/hooks/useFetch";
import { FC } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
import { ExclamationCircleIcon } from "react-native-heroicons/solid";

interface ForCastProps {
  location: string;
}

export const ForeCast: FC<ForCastProps> = ({ location }) => {
  const { data, status } = useFetch({
    q: location,
    type: "forecast",
  });

  if (status === "loading") {
    return (
      <View className="flex-1 justify-center items-center h-full w-full">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }
  if (status === "error") {
    return (
      <View className="h-full w-full flex-row space-x-1 justify-center items-center flex-1">
        <ExclamationCircleIcon size="32" color="red" />
        <Text className=" text-red-500 text-2xl font-bold">
          Somthing went wrong!
        </Text>
      </View>
    );
  }
  return (
    <View className=" mx-4 flex  justify-around flex-1 mb-2">
      {/* Location */}
      <Text className="text-white  text-center text-2xl font-bold">
        {data?.location?.name},{" "}
        <Text className=" text-lg  font-semibold text-gray-300">
          {data?.location?.country}
        </Text>
      </Text>
      {/* Weather image */}
      <View className=" flex-row justify-center">
        <Image
          source={weatherImages[data?.current?.condition?.text?.toLowerCase()]}
          className="h-52 w-52"
        />
      </View>
      {/* degree section */}
      <View className="flex-column space-y-2">
        <Text className="text-center font-bold text-white text-6xl ml-5">
          {data?.current?.temp_c} °
        </Text>
        <Text className="text-center  text-white text-xl tracking-widest">
          {data?.current?.condition?.text}
        </Text>
      </View>
      {/* Other stats */}
      <View className="flex-row justify-between mx-4">
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require("../../assets/icons/wind.png")}
            className="h-6 w-6 object-contain"
          />
          <Text className="text-white  font-semibold text-base">
            {" "}
            {data?.current?.wind_kph} KM/H
          </Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require("../../assets/icons/drop.png")}
            className="h-6 w-6 object-contain"
          />
          <Text className="text-white  font-semibold text-base">
            {" "}
            {data?.current?.humidity}%
          </Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require("../../assets/icons/sun.png")}
            className="h-6 w-6 object-contain"
          />
          <Text className="text-white  font-semibold text-base">
            {" "}
            {data?.forecast?.forecastday[0]?.astro?.sunrise}
          </Text>
        </View>
      </View>
      {/* forcast other day */}
      <View className="mb-2 space-y-3">
        <View className="flex-row items-center mx-5 space-x-2">
          <CalendarDaysIcon size="22" color="white" />
          <Text className="text-white text-base">Daily Forcast</Text>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={{ flexGrow: 1, padding: 15 }}
          showsHorizontalScrollIndicator={false}>
          {data?.forecast?.forecastday?.map((item: any, index: number) => {
            const dayName = new Date(item.date).toLocaleDateString("en-US", {
              weekday: "long",
            });
            return (
              <View
                key={index}
                style={{
                  backgroundColor: theme.colors.bgWhite(0.15),
                }}
                className=" justify-center items-center w-24  rounded-3xl py-3 space-y-1 mr-4 ">
                <Image
                  source={
                    weatherImages[
                      item?.day?.condition?.text.trim().toLowerCase()
                    ]
                  }
                  className=" h-11 w-11 object-contain"
                />
                <Text className="text-white">{dayName} </Text>
                <Text className="text-white font-semibold text-xl">
                  {item?.day?.avgtemp_c} °
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
