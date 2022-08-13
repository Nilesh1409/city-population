import React from "react";
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'


// create a component that should take country name in input from user and add it to the server

const AddCountry = () => {
    const [country, setCountry] = React.useState("");
    const toast = useToast();

    // create a function to set country name in to server
    const handleAdd = () => {
        let payload = {name : country};


        fetch('http://localhost:3001/countries', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then(data => {
                setCountry("")  
                toast({
                    title: `City addded successfully`,
                    status: 'success',
                    position: 'top',
                    isClosable: true,
                  })
                
            }).catch(err => console.log(err))
    }

    

    return (
        <>
        <Input placeholder='Enter country' size='lg' value={country} onChange={(e) => setCountry(e.target.value)}  />
        <Button colorScheme='blue' onClick={handleAdd} >ADD</Button>

        </>
    )
}

export default AddCountry;
