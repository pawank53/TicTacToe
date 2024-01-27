import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';


function App(): React.JSX.Element {

  const [isCross, setIsCross]=useState<boolean>(false);
  const [gameWinner, setGameWinner]=useState<string>('');
  const [gameState, setGameState]=useState(new Array(9).fill("empty", 0, 9));

  const reloadGame=()=>{
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  }

  return (
    <SafeAreaView >
      <Text>hi</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
