import React, { useEffect, useRef, useState } from 'react';

const useElementVisiable = (initialVisiable:boolean) => {
    const [isVisiable,setIsVisiable] = useState(initialVisiable);
    const elementRef = useRef<HTMLDivElement>(null);

    const handleClickOutsideElement = (e:any) =>{
        if ( elementRef.current && !elementRef?.current?.contains(e.target as Node)) {
            setIsVisiable(false);
        }
    }
    const handleClickInSideElement = (e:any) =>{
            setIsVisiable(true);
        
    }

    useEffect(()=>{
        document.addEventListener("click",handleClickOutsideElement);
        return ()=>{
            document.removeEventListener("click",handleClickOutsideElement);
        }
    },[])

    return {elementRef,isVisiable,setIsVisiable,handleClickInSideElement}
};

export default useElementVisiable;