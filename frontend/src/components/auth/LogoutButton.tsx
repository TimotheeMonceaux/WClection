import { Button } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';

import Actions from '../../redux/actions';
import { AppDispatch } from '../../redux/action-types';

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        logout: () => {dispatch(Actions.userLogout())}
    }
}

const connectLogoutButton = connect(null, mapDispatchToProps);

function LogoutButton(props: ConnectedProps<typeof connectLogoutButton>) {
    return <Button variant="contained" color="secondary" onClick={() => props.logout()}>Logout</Button>;
}

export default connectLogoutButton(LogoutButton);