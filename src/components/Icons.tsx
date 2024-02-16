import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

type IconProps=PropsWithChildren<{
    name:string;
}>

const Icons=({name}:IconProps)=> {
 switch(name){
    case 'circle':
        return <Icon name={'circle-thin'} size={30} color="#F7CD2c"/>
    break;
    case 'cross':
        return <Icon name={'times'} size={30} color="#38cc77"/>
    break;
    default:
        return <Icon name={'pencil'} size={30} color="#D0D0D0"/>
    break;
 }
}

const styles = StyleSheet.create({})

export default Icons;