import { connect } from 'react-redux'
import { checkAvailability } from '../services'
import { toggleCourse } from '../actions'
import SemesterList from '../components/SemesterList'

const mapStateToProps = (state) => {
  const semesters = [...state.semesters].map(semester => (
    {
      courses: semester.courses.map(id => (
        Object.assign({}, state.courses.byId[id], {
          available: checkAvailability(state, id),
        })
      )),
    }
  ));

  return {
    semesters,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCourseClick: (id) => {
      dispatch(toggleCourse(id));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SemesterList);
