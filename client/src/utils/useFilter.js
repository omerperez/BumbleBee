import useLocalStorage  from './useLocalStorage';

export default function useFilterDuplicate({property}) {

    const [state, setState] = useLocalStorage({});

    function carChange(e) {
      
      setState((state) => ({ ...state, [property]: e.target.value }));
      
    }

    return [state, carChange];
}

