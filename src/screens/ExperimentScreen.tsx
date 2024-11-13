import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

// function names for better debugging experience!
const Button = ({
  title,
  onPress,
  style,
  testID,
}: {
  title: string;
  onPress: () => void;
  style?: object;
  testID?: string;
}) => (
  <TouchableOpacity
   // maybe memo style, this is a new render every time..
    style={[
      {
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      style,
    ]}
    testID={testID}
    onPress={onPress}>
    <Text style={{fontSize: 40, color: 'white'}}>{title}</Text>
  </TouchableOpacity>
);


// i mean... come on
// https://www.google.com/search?q=fibo+optimized+javascript&safe=active&sca_esv=1e8c9acc3ca5315c&rlz=1C5CHFA_en&sxsrf=ADLYWIJwceLfMRTMS06W5N8VP9rlDddw6g%3A1731529404600&ei=vAo1Z_auJIGEw8cPhr_BKA&ved=0ahUKEwj2_NDYkdqJAxUBwvACHYZfEAUQ4dUDCA8&uact=5&oq=fibo+optimized+javascript&gs_lp=Egxnd3Mtd2l6LXNlcnAiGWZpYm8gb3B0aW1pemVkIGphdmFzY3JpcHQyBRAhGKABMgUQIRigAUjPEFCjBFj6D3ABeAGQAQCYAaQDoAH_E6oBBzItNS4yLjG4AQPIAQD4AQGYAgigAqgRwgIKEAAYsAMY1gQYR8ICBhAAGBYYHsICCxAAGIAEGIYDGIoFwgIIEAAYgAQYogSYAwCIBgGQBgeSBwkxLjAuNC4yLjGgB7oe&sclient=gws-wiz-serp
const fibo = (n: number): number => {
  if (n <= 1) {
    return n;
  }
  return fibo(n - 1) + fibo(n - 2);
};

const useCalculate = () => {
  const [result, setResult] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  const calculate = async () => {
    setCalculating(true);
    // we use the setTimeout to make sure we display "Calculating..." before blocking the thread
    // in real code, we should never do something like that!
    setTimeout(() => {
      const fibResult = fibo(39);
      setResult(fibResult);
      setCalculating(false);
    });
  };

  return {result, calculating, calculate};
};

export const ExperimentScreen = () => {
  const {result, calculating, calculate} = useCalculate();

  const killUI = () => {
    runOnUI(() => {
      // fiobo above and comment!
      const fibo = (n: number): number => {
        if (n <= 1) {
          return n;
        }
        return fibo(n - 1) + fibo(n - 2);
      };
      // never good for performance
      console.log(fibo(39));
    })();
  };

  return (
    <View
      style={{
        padding: 16,
      }}>
      <Button
        title={'KILL JS ☠️'}
        onPress={calculate}
        style={{marginBottom: 40, backgroundColor: '#1565c0'}}
      />
      <Button
        title={'KILL UI ☠️'}
        onPress={killUI}
        style={{marginBottom: 40, backgroundColor: 'purple'}}
      />
      <Text style={styles.resultText}>
        {calculating ? 'Calculating...' : result ? 'Done 🥳' : '   '}
      </Text>
    </View>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text
        style={{
          fontSize: 40,
          marginBottom: 16,
        }}>
        {'Counter'}: {count}
      </Text>
      <Button
        title={'Increment'}
        onPress={() => setCount(prev => prev + 1)}
        style={{marginBottom: 40, backgroundColor: '#1565c0'}}
      />
    </View>
  );
};

const List = () => {
  return (
    <ScrollView>
      {Array.from({length: 100}).map((_, index) => (
        <Text key={index} style={{fontSize: 40}}>
          {index}
        </Text>
      ))}
    </ScrollView>
  );
};

const AnimatedSquare = () => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withRepeat(
        withSequence(
          withTiming(0, {duration: 1000}), // Fade out
          withTiming(1, {duration: 1000}), // Fade in
        ),
        Infinity,
        true,
      ),
    };
  });

  return <Animated.View style={[styles.fadingSquare, animatedStyles]} />;
};

const styles = StyleSheet.create({
  resultText: {
    fontSize: 40,
    color: 'black',
  },
  fadingSquare: {
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').width - 32,
    backgroundColor: 'blue',
  },
});
