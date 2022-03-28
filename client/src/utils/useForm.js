import useLocalStorage  from './useLocalStorage';

const useForm = () => {

    const [state, setState] = useLocalStorage('valuse', {});

    function carChange(e) {
      if (e.target.files && e.target.files.length > 0) { 
        setState((state) => ({ ...state, [e.target.name]: e.target.files })); 
      } else {
        setState((state) => ({ ...state, [e.target.name]: e.target.value }));
      }
    }
    
    return [state, carChange];
}

export default useForm;