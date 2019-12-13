import { showAlert } from './alert'

export const signUp = async(firstname, lastname, username, phone, email, address, password, repassword) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/user/signup',
            data: {
                "name": [{
                    "firstname": firstname,
                    "lastname": lastname,
                    "username": username
                }],
                "email": email,
                "password": password,
                "address": address,
                "phone": phone
            }
        });
        if (res.data.status === 'success') {
            window.setTimeout(() => {
                location.assign('/login');
            }, 1500);
        }
    } catch (error) {
        showAlert('danger', 'Sign up fail!');
    }
}

export const logOut = () => {
    try {
        const res = axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/user/logout'
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Logged out');
            window.setTimeout(() => {
                location.reload(true);
            }, 1500);
        }
        console.log(res);
    } catch (error) {
        showAlert('danger', 'Logged out fail!');
    }
}