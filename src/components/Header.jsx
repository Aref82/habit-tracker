import { Nav, Container } from 'react-bootstrap'
import React from "react";
import moment from "moment-jalaali";

const Header = () => {
  return (

    <Nav className='bg-primary p-2 background'>
      <Container className='d-flex justify-content-between align-items-center'>
        <h3 className='fw-bold'>نام برای برناممون </h3>
        <span>{moment().format("jYYYY/jM/jD")}</span>
      </Container>
    </Nav>
  )
}

export default Header
