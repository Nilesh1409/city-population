import React from "react";
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import "./addCity.css";


// create a component that should take country name in input from user and add it to the server

const AddCity = () => {
    const [allCountry, setAllCountry] = React.useState([]);
    const [city, setCity] = React.useState("");
    const [population, setPopulation] = React.useState(0);
    const [country, setCountry] = React.useState("");
    const toast = useToast();
    const editData =  JSON.parse(localStorage.getItem("editCity")) || [];
   

    

    

    // create a function to set country name in to server
    const handleAdd = () => {
        let payload = { 
            "city" : city,
            "country" : country,
            "population" : +population
         };
         editData.length ? 
            fetch(`http://localhost:3001/cities/${editData.id}`,{   
                method: 'PATCH',
                body: JSON.stringify(payload)   
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                setCity("");
                setPopulation(0);
                setCountry("");
                localStorage.removeItem('editCity');
                toast({
                    title: 'City Added',
                    description: 'City Added Successfully',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            }).catch(err=>{
                console.log(err)
                toast({
                    title: 'Something went wrong',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            })
          :  
        fetch('http://localhost:3001/cities', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then(data => {
                console.log("added city res",data)
                setCity("")
                setPopulation(0)
                toast({
                    title: `City addded successfully`,
                    status: 'success',
                    position: 'top',
                    isClosable: true,
                })

            }).catch(err => console.log(err))
    }

    // white a funcion in useeffect which fect country data from server and set it to state
    React.useEffect(() => {
        

        fetch('http://localhost:3001/countries')
            .then(res => res.json())
            .then(data => setAllCountry(data))
            .catch(err => console.log(err))

            if(editData){
                console.log(editData)
                setCity(editData.city);
                setPopulation(editData.population);
                setCountry(editData.country);
            }
    }, [])

    // if(edit.length){

    // }
    return (
        <div className="city-box">
            <Input placeholder='City Name' size='lg' value={city} onChange={(e) => setCity(e.target.value)} />
            <Input placeholder='Population' size='lg' value={population} onChange={(e) => setPopulation(e.target.value)} />
            {/* Create a select tag which has option of all country data */}
            <Select placeholder='Select option' value={country} onChange={(e) => setCountry(e.target.value)} >
                {
                    allCountry.length ? allCountry.map(item => <option key={item.id} value={item.name}>{item.name}</option> )
                    :
                    <option>Loading...</option>
                }
            </Select>
            <Button colorScheme='blue' onClick={handleAdd} >ADD</Button>

        </div>
    )
}

export default AddCity;
