import { CoursesContext } from "../context/courseContext";
import { useContext } from "react";

export const useCoursesHook = () => {
    const context = useContext(CoursesContext)

    if(!context){
        throw Error('Invalid context provider used...')
    }

    return context
}