import {
  ADD_TITLE,
  addTitle,
  LOAD_MY_TITLES,
  LOAD_TITLES,
  loadMyTitles,
  loadTitles,
  MARK_AS_PRISTINE,
  markAsPristine,
  REMOVE_TITLE,
  removeTitle, RESET_FILTER, resetFilter,
  SET_FILTER,
  SET_MY_TITLES,
  SET_TITLES,
  setFilter,
  setMyTitles,
  setTitles
} from './title.actions';

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

describe('Store / Title / Actions', () => {
  describe('loadTitles', () => {
    it('Should create an action', () => {
      const action = loadTitles();
      expect(action.type).toEqual(LOAD_TITLES);
    });
  });

  describe('setTitles', () => {
    it('Should create an action', () => {
      const action = setTitles({titles});
      expect(action.type).toEqual(SET_TITLES);
    });
    it('Should set the titles', () => {
      const action = setTitles({titles});
      expect(action.titles).toEqual(titles);
    });
  });

  describe('loadMyTitles', () => {
    it('Should create an action', () => {
      const action = loadMyTitles();
      expect(action.type).toEqual(LOAD_MY_TITLES);
    });
  });

  describe('setMyTitles', () => {
    it('Should create an action', () => {
      const action = setMyTitles({titles});
      expect(action.type).toEqual(SET_MY_TITLES);
    });
    it('Should set the titles', () => {
      const action = setMyTitles({titles});;
      expect(action.titles).toEqual(titles);
    });
  });

  describe('markAsPristine', () => {
    it('Should create an action', () => {
      const action = markAsPristine();
      expect(action.type).toEqual(MARK_AS_PRISTINE);
    });
  });

  describe('addTitle', () => {
    it('Should create an action', () => {
      const action = addTitle({id: 'test'});
      expect(action.type).toEqual(ADD_TITLE);
    });
    it('Should set the id', () => {
      const action = addTitle({id: 'test'});
      expect(action.id).toEqual('test');
    });
  });

  describe('removeTitle', () => {
    it('Should create an action', () => {
      const action = removeTitle({id: 'test'});
      expect(action.type).toEqual(REMOVE_TITLE);
    });
    it('Should set the id', () => {
      const action = removeTitle({id: 'test'});
      expect(action.id).toEqual('test');
    });
  });

  describe('setFilter', () => {
    it('Should create an action', () => {
      const action = setFilter({filter: 'test'});
      expect(action.type).toEqual(SET_FILTER);
    });
    it('Should set the filter', () => {
      const action = setFilter({filter: 'test'});
      expect(action.filter).toEqual('test');
    });
  });

  describe('resetFilter', () => {
    it('Should create an action', () => {
      const action = resetFilter();
      expect(action.type).toEqual(RESET_FILTER);
    });
  });
});
