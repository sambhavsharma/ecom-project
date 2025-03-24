import { StatusBar } from 'expo-status-bar';
import "@/global.css";

export default function App() {
  return (
    <GluestackUIProvider mode="light"><View style={styles.container}>
        <Text> Hello World!</Text>
        <StatusBar style="auto" />
      </View></GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
