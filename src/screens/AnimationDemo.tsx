import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

// again bad
// https://www.google.com/search?q=fibo+optimized+javascript&safe=active&sca_esv=1e8c9acc3ca5315c&rlz=1C5CHFA_en&sxsrf=ADLYWIJwceLfMRTMS06W5N8VP9rlDddw6g%3A1731529404600&ei=vAo1Z_auJIGEw8cPhr_BKA&ved=0ahUKEwj2_NDYkdqJAxUBwvACHYZfEAUQ4dUDCA8&uact=5&oq=fibo+optimized+javascript&gs_lp=Egxnd3Mtd2l6LXNlcnAiGWZpYm8gb3B0aW1pemVkIGphdmFzY3JpcHQyBRAhGKABMgUQIRigAUjPEFCjBFj6D3ABeAGQAQCYAaQDoAH_E6oBBzItNS4yLjG4AQPIAQD4AQGYAgigAqgRwgIKEAAYsAMY1gQYR8ICBhAAGBYYHsICCxAAGIAEGIYDGIoFwgIIEAAYgAQYogSYAwCIBgGQBgeSBwkxLjAuNC4yLjGgB7oe&sclient=gws-wiz-serp
const fibonacci = (num: number): number => {
  if (num <= 1) return num;
  return fibonacci(num - 1) + fibonacci(num - 2);
};

const expensiveCalculation = () => fibonacci(38);

export const AnimationDemo: React.FC = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [counter, setCounter] = useState(0);

  const y = useSharedValue(0);

  useEffect(() => {
    y.value = withRepeat(
      withTiming((Dimensions.get("window").height * 2) / 3 - 100, {
        duration: 1000,
        easing: Easing.linear,
      }),
      Infinity,
      true
    );
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: y.value }],
    };
  });

  const calculate = async () => {
    setIsCalculating(true);
    // Just a quick hack to make sure we show "Calculating first"
    await new Promise((resolve) => setTimeout(resolve, 20));

    const start = new Date().getTime();
    const result = expensiveCalculation();
    const end = new Date().getTime();
    console.log(`Time taken: ${end - start}ms`);
    console.log(result);
    setIsCalculating(false);
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView
      edges={["top"]}
      style={[
        styles.container,
        { backgroundColor: isCalculating ? "#feae00" : "#d41876" },
      ]}
    >
      <View style={styles.logoContainer}>
        <Animated.View style={[styles.logo, animatedStyles]}>
          <Text style={styles.logoText}>🐹</Text>
        </Animated.View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { width: "80%" }]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>NAVIGATE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { width: "80%" }]}
          onPress={calculate}
        >
          <Text style={styles.buttonText}>
            {isCalculating ? "CALCULATING..." : "CALCULATE"}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              {
                backgroundColor: "#4990ff",
                width: 60,
                height: 60,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              },
            ]}
            onPress={() => setCounter((prev) => prev + 1)}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>+</Text>
          </TouchableOpacity>
          <Text style={[styles.buttonText, { color: "white" }]}>{counter}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 2,
    alignItems: "center",
  },
  logo: {
    // position: "absolute",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 50,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4990ff",
    textAlign: "center",
  },
});
