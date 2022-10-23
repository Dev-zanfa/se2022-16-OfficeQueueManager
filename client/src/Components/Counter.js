import { Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Header } from './Header';
import API from '../API';

function Counter(props) {

    return <>
    <Header></Header>
    <Row className='justify-content-center' style={{marginTop:"30px"}}> 
    
        <Row className='justify-content-center' style={{marginTop:"30px"}}> 
                            <div  style={{width: "200px", height: "100px", border: 'solid black', marginTop: "20px", marginRight:"10px"}}>
                                <p>service:</p>
                                <h2>{props.service? props.service : "-" }</h2>
                            </div>

                            <div  style={{width: "200px", height: "100px", border: 'solid black', marginTop: "20px"}}>
                                <p>ticket number:</p>
                                <h2 className='center'>{props.ticketNo? props.ticketNo : "-"}</h2>
                            </div>
                    </Row>
     
    
    </Row>
    <Row className='justify-content-md-center p-5'>
        <Row className='justify-content-center'> 
            <Button style={{width: "200px", height: "100px"}} onClick={() => {props.nextCustomer();}}>
                    <div>Next customer</div>
            </Button>
        </Row>
    </Row>

    </>;
}

export { Counter };