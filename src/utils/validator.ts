const Validator = (value, name='login') => {

    const validateErrorText = () => {
        if(value === 'error') throw new Error('Field not to be ERROR');
    }

    const lengthValidate = () => {
        const minLength = 3;
        if(value.length < minLength) throw new Error(`The field value cannot be shorter than ${minLength} characters`);
    }

    const phoneValidate = () => {
        const pattern = /^\+[\d]{1}\ \([\d]{2,3}\)\ [\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/;
        const patternStr = '+7 (999) 999-99-99';
        if(!pattern.test(value)) throw new Error(`The phone number must be specified in the format ${patternStr}`);
    }

    const emailValidate = () => {
        const pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        if(!pattern.test(value)) throw new Error(`Invalid email format`);
    }

    validateErrorText();
    lengthValidate();
    if(name === 'phone'){
        phoneValidate();
    }
    if(name === 'email'){
        emailValidate();
    }
}

export default Validator