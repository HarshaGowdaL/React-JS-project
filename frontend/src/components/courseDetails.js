import { useCoursesHook } from "../hooks/useCoursesHook"
import { MdDelete, MdOutlineEdit  } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { formatDistance, formatRelative, subDays } from 'date-fns'


const CourseDetails = ({ course }) => {
    const { dispatch } = useCoursesHook()

    const handleDelete = async () => {
        const response = await fetch('/api/courses/' + course._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_COURSE', payload: json })
        }
    }
    return (
        <div className="courseDetails">
            <h4> {course.title} </h4>
            <p><strong>Details: &nbsp;&nbsp;
            </strong>
                {course.description}
            </p>
            <p><strong>price: &nbsp;&nbsp;</strong>
                {course.price}
            </p>
            <p style={{ padding: '20px 0px 0px 0px' }}>
                {formatRelative(subDays(new Date(course.createdAt), 0), new Date())}&nbsp;|&nbsp;
                {formatDistance(subDays(new Date(course.createdAt), 0), new Date(), { addSuffix: true })}
                </p>
            <span className="delete" onClick={handleDelete}>
                <MdDelete style={{ color: "black", fontSize: "1.5em" }} />
            </span>
            <span style={{right:"80px"}} onClick={null}>
                <MdOutlineEdit  style={{ color: "black", fontSize: "1.5em" }} />
            </span>
            <span style={{right:"140px"}} onClick={null}>
                <IoMdInformationCircleOutline   style={{ color: "black", fontSize: "1.5em" }} />
            </span>
        </div>
    )
}

export default CourseDetails;