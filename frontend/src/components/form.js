import { useState } from "react"
import { useCoursesHook } from "../hooks/useCoursesHook"


const Form = () => {
    const { dispatch } = useCoursesHook()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFeilds] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const course = { title, description, price }
        const response = await fetch('/api/courses', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.err)
            setEmptyFeilds(json.emptyFields)

        }
        if (response.ok) {
            setTitle('')
            setDescription('')
            setPrice('')
            setError(null)
            setEmptyFeilds([])
            console.log("New workout added!!!", json)
            dispatch({type:'CREATE_COURSES', payload: json})
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h4>Add a new course</h4>

            <label>Course Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                // className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Course description:</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                // className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Price:</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                // className={emptyFields.includes('price') ? 'error' : ''}
            />

            <button>Add Course</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Form;