import { useState } from 'react';

const useForm = () => {

    const [state, setState] = useState({});

    const carChange = e => {
        e.persist();
        setState(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    return [state, carChange];
}

export default useForm;