"use click";
import { useState, useEffect, useRef, Dispatch, SetStateAction, MutableRefObject } from 'react';

type TType = [
    string | number | boolean | null,
    Dispatch<SetStateAction<string | number | boolean | null>>,
    () => void,
    MutableRefObject<HTMLElement|null>,
]
const useOutsideClick = (initialState = false):TType => {
  const [isOpen, setIsOpen] = useState<string|null|number|boolean>(initialState);
  const containerRef = useRef<HTMLElement | null>(null);


  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsOpen(null);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return [isOpen,setIsOpen, toggleDropdown, containerRef];
};

export default useOutsideClick;
