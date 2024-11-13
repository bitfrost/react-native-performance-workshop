import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const expensiveCalculation = (times: number) => {
  const initialTime = new Date().getTime();
  while (new Date().getTime() - initialTime < times) {}
};

const functionA = () => {
  expensiveCalculation(1000);
};

const functionB = () => {
  functionA();
  functionA();
  functionA();
};

const functionC = () => {
  expensiveCalculation(3000);
};

const rootFunction = () => {
  functionA();
  functionB();
  expensiveCalculation(2000);
  functionC();
};

// look into this silly ness,  they can be done in parrallel, don't know what the author rants here since all no-ops

export const FlameChartScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "green" }}>
      <Button onPress={() => rootFunction()} title={"RUN FUNCTION"} />
    </SafeAreaView>
  );
};
