import React from 'react'
import { styled } from 'styled-components'
import Affliction from './Affliction'

const List = styled.div`
display: flex;
gap: 1rem;
flex-wrap: wrap;
justify-content:center;
align-items: center;
`

const AfflictionList = (props) => {

  return (
    <List>{props.monster.afflictions.map(affliction => {
        if(affliction){
        return <Affliction key={affliction._id} monster={props.monster} affliction={[affliction]}/>
    }else{
        return ''
    }
    })}</List>
  )
}

export default AfflictionList