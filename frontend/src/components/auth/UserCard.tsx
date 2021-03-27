import { connect, ConnectedProps } from 'react-redux';
import { useState, Fragment } from 'react';
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from '@material-ui/icons/AccountCircle';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';


import { AppStore, AppDispatch } from '../../redux/action-types';
import Actions from '../../redux/actions';
import { getUserName, isUserLoggedIn } from '../../redux/selectors';
import LoginButton from './login/LoginButton';
import SignupButton from './signup/SignupButton';

function mapStoreToProps(store: AppStore) {
    return {
        isUserLoggedIn: isUserLoggedIn(store),
        getUserName: getUserName(store)
    }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        logout: () => {dispatch(Actions.userLogout())}
    }
}

const connectUserCard = connect(mapStoreToProps, mapDispatchToProps);

function UserCard(props: ConnectedProps<typeof connectUserCard>) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};

    if (props.isUserLoggedIn)
        return <Fragment>
            <IconButton color="inherit" onClick={handleMenu} style={{fontSize: "120%"}}>
                <AccountCircle style={{marginRight: 10}} /> {props.getUserName}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                getContentAnchorEl={null}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                transformOrigin={{vertical: "top", horizontal: "center"}}
                onClose={handleClose}>
                <MenuItem onClick={props.logout}><PowerSettingsNew style={{marginRight: 10}} /> Déconnexion</MenuItem>
            </Menu>
        </Fragment>;
    
    return <Fragment><LoginButton /><SignupButton /></Fragment>;
}

export default connectUserCard(UserCard);