const Validator = (value) => {
    if(value === 'error') throw new Error('Field not to be ERROR');
}

export default Validator