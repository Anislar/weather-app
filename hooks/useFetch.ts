import { EXPO_PUBLIC_WEATHER_API_KEY } from "@/constants/weather-api-utils";
import { getCity, storeCity } from "@/helpers/store-data";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

enum Status {
  idle = "idle",
  loading = "loading",
  success = "success",
  error = "error",
}
interface useFetchProps {
  q: string;
  type: "search" | "forecast" | "";
}

const useFetch = ({ q, type }: useFetchProps) => {
  const [data, setData] = useState<any>([]);
  const [status, setStatus] = useState(Status.idle);
  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;
    const getData = async () => {
      let city = await getCity("city");
      const myCity = city || "Tunis";
      if (!q && type === "forecast") {
        q = myCity;
      }
      const baseUrl = `https://api.weatherapi.com/?key=${EXPO_PUBLIC_WEATHER_API_KEY}`;

      if (q.length <= 2 || !type) {
        if (q.length === 0) {
          setStatus(Status.idle);
          if (type === "search") setData([]);
          else setData(null);
        }

        return;
      }
      const url = new URL(baseUrl);

      if (type === "forecast") {
        url.searchParams.append("days", "7");
        url.searchParams.append("api", "no");
        url.searchParams.append("alerts", "no");
      }
      url.pathname =
        type === "search" ? "/v1/search.json" : "/v1/forecast.json";

      url.searchParams.append("q", q);
      try {
        setStatus(Status.loading);
        const response = await axios.get(url.toString(), {
          signal: abortController.signal,
        });

        setData(() => {
          if (type === "search") {
            return response.data;
          } else if (type === "forecast") {
            return {
              location: response.data.location,
              current: response.data.current,
              forecast: response.data.forecast,
            };
          }
        });
        storeCity("city", q);
        setStatus(Status.success);
      } catch (error: Error | any) {
        if (error.name === "AbortError") return;
        Alert.alert("Error", error.message);
        setStatus(Status.error);
      }
    };
    if (isMounted) getData();
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [q, type]);

  return { data, status };
};

export default useFetch;
