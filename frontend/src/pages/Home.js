import { useEffect } from "react"
import { useCoursesHook } from "../hooks/useCoursesHook"

import CourseDetails from "../components/courseDetails"
import Form from "../components/form"

const Home = () => {
  const { courses, dispatch } = useCoursesHook()

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch('/api/courses')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_COURSES', payload: json})
      }
    }

    fetchCourses()
  }, [dispatch])

  return (
    <div className="home">
      <section className="section-left">
        <Form />
      </section>
      <section className="section-right">
        <div className="courses">
          {courses && courses.map((course) => (
            <CourseDetails key={course._id} course={course} />
          ))}
        </div>
      </section>
      
    </div>
  )
}

export default Home