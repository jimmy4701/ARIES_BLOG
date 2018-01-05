import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        const {admin} = this.props
        const custom_classes = admin && "white-item" 
        
        return (
            <Menu secondary borderless style={{backgroundColor: admin && "#6582c5"}}>
                {admin &&
                    <Menu.Item className={custom_classes} >
                        ADMIN
                    </Menu.Item>
                }
                <Link to="/">
                    <Menu.Item className={custom_classes}>
                        Accueil
                    </Menu.Item>
                </Link>
                <Link to="/admin/pages">
                    <Menu.Item className={custom_classes}>
                        Admin pages
                    </Menu.Item>
                </Link>
            </Menu>
        )
    }
}