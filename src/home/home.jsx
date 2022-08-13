import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Spinner
} from '@chakra-ui/react';

const Home = () => {
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    // fetch data from api
    React.useEffect(() => {
        fetch('http://localhost:3001/cities')
            .then(res => res.json())
            .catch(err => {
                setError(true);
                setLoading(false);
            })
            .then(data => {
                setData(data)
                console.log("intialData",data)
                setLoading(false)
                // setError(false)
            })
            .catch(err => {
                console.log(err)
                setError(true)
            })
    } , [])

    const handleFillter = (value)=>{
    console.log("target",value)
        // if(e.target.value === ""){
        //     setData(data)
        // }
        // else 
        if(value === "ascpopulation"){
            console.log('mainDatajklfdkljkljfljk',data)
            let updatedData = [...data]
            updatedData.sort((a,b)=>{
                return a.population - b.population
            })
            setData(updatedData)
            console.log('updatedData',updatedData)


        }
        // else if(e.target.value === "descpopulation"){
        //     setData(data.sort((a,b)=>b.population-a.population))
        // }else if(e.target.value === "country"){
        //     // setData(data.sort((a,b)=>a.country.localeCompare(b.country)))
        // };
    }
    const handleDelete = (id)=>{
        setLoading(true)
        
        fetch(`http://localhost:3001/cities/${id}`,{
            method: 'DELETE'
        }).then(res=>res.json())
        .then(data=>{
            // setData(data)
            setLoading(false); 
        }).catch(err=>setError(true))
    }


    if(loading){ 
    return ( <Spinner color='red.500' />)
    }else if(error){
    return ( 
    <div>  Error </div>
    
    )}

    return (<>

        {/* Create a select tag for shorting data */}
        <select onChange={ (e) => handleFillter(e.target.value)} >
            <option value="">FILLTER</option>
            <option value="country">COUNTRY</option>
            <option value="ascpopulation">Asc Population</option>
            <option value="descpopulation">Desc Population</option>
            </select>
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>World population</TableCaption>
                <Thead>
                    <Tr>
                        <Th isNumeric >ID</Th>
                        <Th>Country</Th>
                        <Th>City</Th>
                        <Th isNumeric>Population</Th>
                        <Th>Edit</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.length ? data.map(city => (
                        <Tr key={`${city.id}`}>
                            <Td isNumeric>{city.id}</Td>
                            <Td>{city.country}</Td>
                            <Td>{city.city}</Td>
                            <Td isNumeric>{city.population}</Td>
                            <Td onClick={() =>{
                                localStorage.setItem("editCity",JSON.stringify(city))
                                window.location.href = "/add-city"
                            }} >Edit</Td>
                            <Td onClick={() => handleDelete(city.id)} >Delete</Td>
                        </Tr>
                    )) :
                        null
                    }
                    
                </Tbody>

            </Table>
        </TableContainer>
    </>)
}
export default Home;