export const TOGGLE_COURSE = 'TOGGLE_COURSE'

export function toggleCourse(id) {
  return {
    type: TOGGLE_COURSE,
    id,
  }
}
