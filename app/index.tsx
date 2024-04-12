import { ForeCast, SearchBar } from "@/components";
import { StatusBar } from "expo-status-bar";
import { FC, useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HomeScreenProps {}

const HomeScreen: FC<HomeScreenProps> = ({}) => {
  const [location, setLocation] = useState<string>("");
  const handleLocation = (item: string) => setLocation(item);

  return (
    <View className="flex-1 relative ">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex mt-1 flex-1">
        {/* header */}
        <SearchBar handleLocation={handleLocation} />
        {/* body */}

        <ForeCast location={location} />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
