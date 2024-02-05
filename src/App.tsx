import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';


function App(): React.JSX.Element {

  const [isCross, setIsCross]=useState<boolean>(false);
  const [gameWinner, setGameWinner]=useState<string>('');
  const [gameState, setGameState]=useState(new Array(9).fill("empty", 0, 9));
  const [isGameActive, setIsGameActive]=useState<boolean>(false);


  useEffect(()=>{
    const isGameStateEmpty=gameState.every(step=> step==="empty");
    console.log("isGameStateEmpty",isGameStateEmpty);
    
    if(isGameStateEmpty){
      setIsGameActive(false)
    }else{
      setIsGameActive(true)
    }
  },[gameState])

  const reloadGame=()=>{
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
    setIsGameActive(false)
  }

  const CheckIsWinner=()=>{
    if(gameState[0]===gameState[1] && gameState[0]=== gameState[2] && gameState[0]!=="empty"){
      setGameWinner(`${gameState[0]} won the game! `);
    }else if(gameState[3]===gameState[4] && gameState[3]===gameState[5] && gameState[3]!== "empty"){
      setGameWinner(`${gameState[3]} won the game`);
    }else if(gameState[6]===gameState[7] && gameState[6] === gameState[8] && gameState[6]!=="empty"){
      setGameWinner(`${gameState[6]} won the game!`);
    }else if(gameState[0] === gameState[3] && gameState[0]===gameState[6] && gameState[0]!=="empty"){
      setGameWinner(`${gameState[0]} won the game!`);
    }else if(gameState[1]=== gameState[4] && gameState[1]==gameState[7] && gameState[1] !=="empty"){
      setGameWinner(`${gameState[1]} won the game!`);
    }else if( gameState[2] !== 'empty' && gameState[2] === gameState[5] && gameState[5] === gameState[8]){
      setGameWinner(`${gameState[2]} won the game!`);
    }else if( gameState[0] !== 'empty' && gameState[0] === gameState[4] && gameState[4] === gameState[8]){
      setGameWinner(`${gameState[0]} won the game!`);
    }else if(gameState[2] !== 'empty' && gameState[2] === gameState[4] && gameState[4] === gameState[6]){
      setGameWinner(`${gameState[2]} won the game!`);
    }else if(!gameState.includes("empty", 0)){
      setGameWinner("Game Draw!")
    }
  }

const onChangeItem=(itemNumber:number)=>{
  setIsGameActive(true)
  if(gameWinner){
    return Snackbar.show({
      text:gameWinner,
      backgroundColor:'#000000',
      textColor:'#FFFFFF'
    })
  }
  if(gameState[itemNumber]=== "empty"){
    gameState[itemNumber]= isCross ? "cross": "circle"
    setIsCross(!isCross)
  }else{
    return Snackbar.show({
      text:"Position is already filled",
      backgroundColor:'red',
      textColor:'#FFFFFF'
    })
  }
  CheckIsWinner();
}

  return (
    <SafeAreaView >
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ): (
        <View style={[styles.playerInfo, isCross? styles.playerX : styles.playerO]}>
          <Text style={styles.gameTurnTxt}>Player {isCross? "X": "O"}'s turn</Text>
        </View>
      )}
      <FlatList
      numColumns={3}
      data={gameState}
      style={styles.grid}
      renderItem={({item, index}) => (
        <Pressable
        key={index}
        style={styles.card}
        onPress={() => onChangeItem(index)}
        >
          <Icons name={item} />
        </Pressable>
      )}
      />
      {isGameActive ? (
        <Pressable style={styles.gameBtn} onPress={reloadGame}>
        <Text style={styles.gameBtnText}>
          {gameWinner ? "Start new game!" :"Reload the game!"}
        </Text>
      </Pressable>
      ):(<View></View>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;
