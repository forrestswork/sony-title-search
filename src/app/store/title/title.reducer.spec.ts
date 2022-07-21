import * as fromReducer from './title.reducer';
import * as fromActions from './title.actions';

const titles = [
  {
    id: "94212",
    name: "WHEEL OF FATE",
    level_1_title: null,
    full_name: "WHEEL OF FATE",
    external_id: 804567,
    season_number: null,
    episode_number: null,
    title_level: null
  }
]

describe('Store / Title / Reducer', () => {
  afterEach(() => {
    fromReducer.initialState.titles = [];
  });
  it('Should return initial state', () => {
    const {initialState} = fromReducer;
    const action = {} as any;
    const state = fromReducer.titleReducer(initialState, action);
    expect(state).toBe(initialState);
  });
  it('Should set titles', () => {
    const {initialState} = fromReducer;
    const payload: any = {
      titles
    }
    const action = fromActions.setTitles(payload);
    const state = fromReducer.titleReducer(initialState, action);
    expect(state.titles).toBe(payload.titles);
  });
  it('Should set the filter', () => {
    const {initialState} = fromReducer;
    const payload: any = {
      filter: 'test'
    };
    const action = fromActions.setFilter(payload);
    const state = fromReducer.titleReducer(initialState, action);
    expect(state.filter).toBe(payload.filter);
  });
  it('Should not set the filter if the filter is less than 3 characters', () => {
    const {initialState} = fromReducer;
    const payload: any = {
      filter: 'te'
    };
    const action = fromActions.setFilter(payload);
    const state = fromReducer.titleReducer(initialState, action);
    expect(state.filter).toBe(null);
  });
  it('Should set my titles', () => {
    const {initialState} = fromReducer;
    const payload: any = {
      titles
    };
    const action = fromActions.setMyTitles(payload);
    const state = fromReducer.titleReducer(initialState, action);
    expect(state.myTitles).toEqual(payload.titles);
  });
  it('Should add a title', () => {
    const {initialState} = fromReducer;
    const payload: any = {
      id: "94212"
    };
    const action = fromActions.addTitle(payload);
    const state = fromReducer.titleReducer({...initialState, titles}, action);
    expect(state.myTitles).toContain(titles[0]);
  });
  it('Should set the status to dirty after adding a title', () => {
    const {initialState} = fromReducer;
    const payload: any = {
      id: "94212"
    };
    const action = fromActions.addTitle(payload);
    const state = fromReducer.titleReducer({...initialState, titles}, action);
    expect(state.dirty).toBeTrue();
  });
  it('Should remove a title', () => {
    const {initialState} = fromReducer;
    const payload: any = {
      id: "94212"
    };
    const action = fromActions.removeTitle(payload);
    const state = fromReducer.titleReducer({...initialState, myTitles: [...titles]}, action);
    expect(state.myTitles).not.toContain(titles[0]);
  });
  it('Should set the status to dirty after removing a title', () => {
    const {initialState} = fromReducer;
    const payload: any = {
      id: "94212"
    };
    const action = fromActions.removeTitle(payload);
    const state = fromReducer.titleReducer({...initialState, myTitles: [...titles]}, action);
    expect(state.dirty).toBeTrue();
  });
  it('Should mark the status as pristine', () => {
    const {initialState} = fromReducer;
    const action = fromActions.markAsPristine();
    const state = fromReducer.titleReducer({...initialState, dirty: true}, action);
    expect(state.dirty).toBeFalse();
  });
});
