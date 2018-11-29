import { set } from 'dot-prop-immutable'
import { toggle, checkAvailability } from '../services'
import { TOGGLE_COURSE } from '../actions'

export default function (state, action) {
  switch (action.type) {
    case TOGGLE_COURSE:
      const { id } = action;

      if (!checkAvailability(state, id)) {
        return state;
      }

      return set(state, `courses.byId.${id}.status`, (currentStatus) => (
        toggle(['todo', 'doing', 'done'], currentStatus)
      ));
    default:
      return state;
  }
}

