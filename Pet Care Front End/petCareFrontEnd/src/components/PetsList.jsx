import React from 'react'

export default function PetsList(props) {
    console.log(props.pets)
    return (
        <ul>
            {props.pets.map(pet => (
                <div key={pet.name}> {pet.breed.name}</div>
            ))}
        </ul>
    )
}
