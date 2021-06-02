const getCourses = async () => {
  try {
    const response = await axios.get('http://localhost:3000/courses');
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const coursesPostRequest = async (course) => {
  try {
    const resp = await axios.post('http://localhost:3000/courses', course);
    console.log(resp.data);
  } catch (err) {
    console.error(err);
  }
};

const coursePutRequest = async (selectedCourse) => {
  try {
    const resp = await axios.put(
      `http://localhost:3000/courses/${selectedCourse.id}`,
      selectedCourse
    );
    console.log(resp.data);
  } catch (err) {
    console.error(err);
  }
};

const getStudents = async () => {
  try {
    const response = await axios.get('http://localhost:3000/students');
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const studentsPostRequest = async (student) => {
  try {
    const resp = await axios.post('http://localhost:3000/students', student);
    console.log(resp.data);
  } catch (err) {
    console.error(err);
  }
};

export { getCourses, coursesPostRequest, coursePutRequest, getStudents, studentsPostRequest };