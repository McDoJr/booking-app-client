export const validate = ({formData}) => {

    const errors = {};
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    for(const key in formData) {
        const value = formData[key];
        if(!value && key === 'username') {
            errors.username = "Username is required!";
        }
        if(!value && key === 'firstname') {
            errors.firstname = "First Name is required!";
        }
        if(!value && key === 'lastname') {
            errors.lastname = "Last Name is required!";
        }
        if(!value && key === 'phone') {
            errors.phone = "Phone Number is required!";
        }
        if(!value && key === 'email') {
            errors.email = "Email is required!";
        }
        if(value === 'email' && !emailFormat.test(value)) {
            errors.email = "Invalid email format!";
        }
        if(!value && key === 'password') {
            errors.password = "Password is required!";
        }
        if(!value && key === 'confirm_password') {
            errors.confirm_password = "Confirm Password is required!";
        }
        if(value && key === 'confirm_password' && value !== formData['password']) {
            errors.confirm_password = "Password dont match!";
        }
        if(!value && key === 'persons') {
            errors.persons = "Persons is required!";
        }
        if(!value && key === 'tables') {
            errors.tables = "Tables is required!";
        }
    }

    return errors;
}
