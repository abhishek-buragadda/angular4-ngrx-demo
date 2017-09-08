export const HOUR = 'hour';
export const SECOND = 'second';
export const ADVANCE = 'advance';
export const RECALL = 'recall';


export const clock = (state = new Date(), {type, payload} = {type: '', payload: 0}) => {
  const date = new Date(state.getTime());
  switch (type) {
    case SECOND:
      date.setSeconds(date.getSeconds() + payload);
      return date;
    case HOUR :
      date.setHours(date.getHours() + payload);
      return date;
  }
  return state;
};


const defaultPeople = [
  {name: 'A', time: clock()},
  {name: 'B', time: clock()},
  {name: 'C', time: clock()}

];


export const people = (state = defaultPeople, {type, payload}) => {
  switch (type) {
    case ADVANCE:
      return state.map((person) => {
        if (person === payload) {
          return {
            name: payload.name,
            time: clock(payload.time, {type: HOUR, payload: 1})
          };
        }
        return person;
      });
    case RECALL:
      return state.map((person) => {
          return {
            name : person.name,
            time : payload
          };
      });
    default:
      return state;
  }
};
