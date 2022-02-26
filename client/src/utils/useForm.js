import { useState } from 'react';

const useForm = () => {

    const [state, setState] = useState({});

    function carChange(e) {
        setState((state) => ({ ...state, [e.target.name]: e.target.value }));
    }
    
    // const carChange = e => {
    //     e.persist();
    //     setState((state) => ({ ...state, [e.target.name]: e.target.value }));
    // }

    return [state, carChange];
}

export default useForm;