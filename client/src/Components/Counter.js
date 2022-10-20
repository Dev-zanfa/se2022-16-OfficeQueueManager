import { Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Header } from './Header';
import API from '../API';

function Counter(props) {

    return <>
    <Header></Header>
    <Row className='justify-content-center align-items-center w-100 vh-100'>
        <Row className='justify-content-center'> 
            <Button style={{width: "200px", height: "100px", marginTop: "20px"}} onClick={() => {props.nextCustomer();}}>
                    <div>Next customer</div>
            </Button>
        </Row>
    </Row>
    </>;
}

export { Counter };