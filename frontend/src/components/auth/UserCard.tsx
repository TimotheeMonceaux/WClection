import { connect, ConnectedProps } from 'react-redux';

import { AppStore } from '../../redux/action-types';
import { getUserName, isUserLoggedIn } from '../../redux/selectors';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import LogoutButton from './LogoutButton';

function mapStoreToProps(store: AppStore) {
    return {
        isUserLoggedIn: isUserLoggedIn(store),
        getUserName: getUserName(store)
    }
}

const connectUserCard = connect(mapStoreToProps);

function UserCard(props: ConnectedProps<typeof connectUserCard>) {
    if (props.isUserLoggedIn)
        return <div>Hello, {props.getUserName} <LogoutButton /></div>;
    
    return <div><LoginButton /><SignupButton /></div>;
}

export default connectUserCard(UserCard);