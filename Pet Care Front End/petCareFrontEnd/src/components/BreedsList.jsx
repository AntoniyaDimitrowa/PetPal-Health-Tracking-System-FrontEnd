import React from 'react'

export default function BreedsList(props) {
    console.log(props.breeds)
    return (
        <ul>
            {props.breeds.map(breed => (
                <div key={breed.name}>{breed.description} {breed.name}</div>
            ))}
        </ul>
    )
}
