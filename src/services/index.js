// goes to the next option until reach the end
//  so it resets to the beginning
export function toggle(options, currently) {
  let currentIndex = options.indexOf(currently);
  if (currentIndex == -1) {
    currentIndex = 0;
  }

  const nextIndex = currentIndex + 1;
  return nextIndex >= options.length ? options[0] : options[nextIndex];
}

// check if all requirements are completed
export function checkAvailability(state, courseId) {
  const { requirements = [] } = state.courses.byId[courseId];

  return requirements.every(requiredCourseId => {
    const course = state.courses.byId[requiredCourseId];

    if (!course) {
      console.error("Course does not exists: " + requiredCourseId);
      return false;
    }

    return course.status == "done"
  });
}
