import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data'

export class Navbar extends Component {

    logout = () => {
        Meteor.logout()
    }

    render() {
        const { admin, user } = this.props
        const custom_classes = admin && "white-item"

        return (
            <Menu secondary borderless style={{ backgroundColor: admin && "#6582c5" }}>
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
                {user &&
                    <Link to="/admin/pages">
                        <Menu.Item className={custom_classes}>
                            Admin pages
                        </Menu.Item>
                    </Link>
                }


                {user ?
                    <Menu.Menu position='right'>
                        <Menu.Item className={custom_classes}>
                            <Icon name="user" size="big" /> {user.username}
                        </Menu.Item>
                        <Menu.Item onClick={this.logout} className={custom_classes}>
                            Déconnexion
                        </Menu.Item>
                    </Menu.Menu>
                    :
                    <Menu.Menu position='right'>
                        <Menu.Item position="right" className={custom_classes}>
                            <Link to="/sign_in" >
                                Connexion / Inscription
                        </Link>
                        </Menu.Item>
                    </Menu.Menu>
                }


            </Menu>
        )
    }
}

export default NavbarContainer = withTracker(() => {
    const user = Meteor.user()
    return {
        user
    }
})(Navbar)