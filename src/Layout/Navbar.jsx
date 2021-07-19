import React from 'react'
import ReactDOM from 'react-dom'
import './Navbar.css'

function Nav() {
    return (

        <div className="nav">
            <Navbar>

                <NavItem></NavItem>  
                <NavItem></NavItem>
                <NavItem></NavItem>
                <NavItem></NavItem>
                <NavItem></NavItem>
            
            </Navbar>
        </div>
    )
}

function Navbar(props) {
    return (
        <nav className="navbar container">
            <h1 className="brand">Algorithm Visualizer</h1>
            <ul className="navbar-nav">
                {props.children}
            </ul>
        </nav>
    )
}

function NavItem() {
    return (
        <li className="nav-item">
            <a href="#">Item</a>
        </li>
    )
}


export default Nav