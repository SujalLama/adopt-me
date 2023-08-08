import { useState } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";

const ANIMALS = ["", "bird", "cat", "dog", "rabbit", "reptile"];
const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location: '',
        animal: '',
        breed: ''
    })
    const [animal, setAnimal] = useState('');

    const [breeds] = useBreedList(animal);

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];

    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const obj = {
                    animal: formData.get('animal') ?? '',
                    location: formData.get('location') ?? '',
                    breed: formData.get('breed') ?? '',
                }
                setRequestParams(obj);
            }}>
                <label htmlFor="location">
                    location
                    <input id="location" 
                        name="location"
                        placeholder="Location" 
                        type="text" />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select 
                        name="animal" 
                        id="animal" 
                        value={animal} 
                        onChange={(e) => {
                            setAnimal(e.target.value)
                            
                        }}>
                        {
                            ANIMALS.map(item => (<option key={item} value={item}>{item}</option>))
                        }
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select 
                        name="breed" 
                        id="breed" 
                        disabled={breeds.length === 0} 
                    >
                        {
                            breeds.map(item => (<option key={item} value={item}>{item}</option>))
                        }
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    )
}

export default SearchParams;