import { images, offers } from "@/constants/index";

import cn from "clsx";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import CartButton from "@/components/CartButton";
import useAuthStore from "@/store/auth.store";
import "../globals.css";

export default function Index() {
  const { user } = useAuthStore();

  console.log("useAuthStore", JSON.stringify(user, null, 2));

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
        <FlatList
          data={offers}
          keyExtractor={(_item, index) => index.toString()}
          style={{ flex: 1, width: "100%" }}
          renderItem={({ item, index }) => {
            const isEven = index % 2 === 0;

            return (
              <View className="p-4 mb-4">
                <Pressable
                  className={cn(
                    "offer-card",
                    isEven ? "flex-row-reverse" : "flex-row"
                  )}
                  style={{ backgroundColor: item.color }}
                  android_ripple={{ color: "#fffff22" }}
                >
                  <View className="h-full w-1/2 items-center justify-center">
                    <Image
                      source={item.image}
                      className="h-full w-full scale-125  "
                      resizeMode="contain"
                    />
                  </View>

                  <View
                    className={cn(
                      "offer-card__info",
                      isEven ? "pl-10" : "pr-10"
                    )}
                  >
                    <Text className="text-white text-2xl font-bold">
                      {item.title}
                    </Text>
                    <Image
                      source={images.arrowRight}
                      className="siz-10"
                      resizeMode="contain"
                      tintColor="#ffffff"
                    />
                  </View>
                </Pressable>
              </View>
            );
          }}
          contentContainerClassName="pb-28 px-5"
          ListHeaderComponent={() => (
            <View className="flex-between flex-row w-full my-5 px-5">
              <View className="flex-start">
                <Text className="small-bold text-primary">DILIVER TO</Text>
                <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-bold text-dark-100">India</Text>
                  <Image
                    source={images.arrowDown}
                    className="size-3"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <CartButton />
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
