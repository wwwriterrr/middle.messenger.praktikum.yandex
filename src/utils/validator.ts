const Validator = (value: string, name='login') => {

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

    const nameValidate = () => {
        const pattern = /^[А-ЯЁ|A-Z][а-яё|a-z]+$/
        if(!pattern.test(value)) throw new Error(`The field must contain Latin or Russian alphabet characters, starting with a capital letter`);
    }

    const loginValidate = () => {
        if(value.length < 3) throw new Error(`Login cannot be shorter than 3 characters`);
        const numPattern = /^[0-9]+$/;
        if(numPattern.test(value)) throw new Error(`The login cannot consist only of numbers`);
        const pattern = /^[a-z|0-9|\-|_]+$/i;
        if(!pattern.test(value)) throw new Error(`The login may consist of letters of the Latin alphabet and numbers, may contain a hyphen or an underscore`);
    }

    validateErrorText();
    lengthValidate();
    if(name === 'phone'){
        phoneValidate();
    }
    if(name === 'email'){
        emailValidate();
    }
    if(name === 'first_name' || name === 'second_name'){
        nameValidate();
    }
    if(name === 'login'){
        loginValidate();
    }
}

export default Validator