import React from 'react'
import { useDispatch } from 'react-redux'
import { passDoom } from '../slices/monstersSlice'
import { styled } from 'styled-components'

const Afflic = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 0.25rem;

.name {
   color: ${props => props.color};
}
`
const Form = styled.form``

const Affliction = (props) => {
    const dispatch = useDispatch()
    const [affliction] = props.affliction
    console.log(props.monster)
    const onPass = (e) => {
        e.preventDefault()
        dispatch(passDoom(props.monster))
    } 

  return (
    <Afflic color={affliction.color}>
        {affliction.name ?
            <>
            <h3 className="name">{affliction.name}</h3>
            {affliction.duration === -1 ? '': <p>dur. {affliction.cur_duration}</p>}
            {affliction.name === 'Doom' ? '': <p>x{affliction.stacks}</p>}
            {affliction.name ==='Doom' ? <Form><button onClick={onPass}>✓</button></Form>: ''}
            </>
    : ''}
    </Afflic>
  )
}

export default Affliction