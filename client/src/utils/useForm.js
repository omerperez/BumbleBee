import { useState } from 'react';

const useForm = () => {

    const [state, setState] = useState({});
    const [file, setFile] = useState([]);
    function carChange(e) {
      if (e.target.files && e.target.files.length > 0) {

        setState((state) => ({ ...state, [e.target.name]: e.target.files }));
        console.log(state);
        
      } else {
        setState((state) => ({ ...state, [e.target.name]: e.target.value }));
        console.log(e.target.value);
      }
    }
    
    return [state, carChange];
}

export default useForm;