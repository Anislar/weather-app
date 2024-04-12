export const EXPO_PUBLIC_WEATHER_API_KEY = process.env.EXPO_PUBLIC_API_KEY; //"d7f181313d564a3398d191659241204";
type WeatherImages = { [key: string]: any };

export const weatherImages: WeatherImages = {
  "partly cloudy": require("../assets/images/partlycloudy.png"),
  "moderate rain": require("../assets/images/moderaterain.png"),
  "patchy rain possible": require("../assets/images/moderaterain.png"),
  "patchy rain nearby": require("../assets/images/moderaterain.png"),
  sunny: require("../assets/images/sun.png"),
  clear: require("../assets/images/sun.png"),
  overcast: require("../assets/images/cloud.png"),
  cloudy: require("../assets/images/cloud.png"),
  "light rain": require("../assets/images/moderaterain.png"),
  "moderate rain at time": require("../assets/images/moderaterain.png"),
  "heavy rain": require("../assets/images/heavyrain.png"),
  "heavy rain at times": require("../assets/images/heavyrain.png"),
  "moderate or Heavy freezing rain": require("../assets/images/heavyrain.png"),
  "moderate or Heavy freezing shower": require("../assets/images/heavyrain.png"),
  "moderate or Heavy freezing with thunder": require("../assets/images/heavyrain.png"),
  other: require("../assets/images/moderaterain.png"),
};
