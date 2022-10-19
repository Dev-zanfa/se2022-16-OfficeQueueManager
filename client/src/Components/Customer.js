import {Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import API from '../API';

function Customer(props) {
    const [service, setService] = useState("Choose service type");
    const [error, setError] = useState(false);

    return <>
    <Row className='justify-content-center align-items-center w-100 vh-100'>
        <Row className='justify-content-center'> 
            <Dropdown className='text-center'>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{width: "200px"}}>
                    <a style={{marginRight:'10px'}}>{service}</a>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setService('S1')}>S1</Dropdown.Item>
                    <Dropdown.Item onClick={() => setService('S2')}>S2</Dropdown.Item>
                    <Dropdown.Item onClick={() => setService('S3')}>S3</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> 

            {error ? <p className='text-center text-danger' >Select a type of service</p> : null}

            <Button style={{width: "200px", height: "100px", marginTop: "20px"}}
            onClick={() => {
                if(service != 'Choose service type'){
                    setError(false);
                    API.newTicket(service);
                } else 
                    setError(true);
            }}>
                <p>Get ticket</p>
            </Button>
        </Row>
    </Row>
    </>;
}

export { Customer };