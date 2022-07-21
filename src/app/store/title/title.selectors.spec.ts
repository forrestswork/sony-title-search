import * as fromTitle from './title.reducer';
import {
  selectFilteredTitles,
  selectMyTitles,
  selectMyTitlesDirty,
  selectTitleState
} from './title.selectors';
import {titles} from '../../data/titles';

const initialState = {
  title: {
    titles,
    myTitles: [],
    filter: null,
    dirty: false
  }
};

describe('Title Selectors', () => {
  describe('selectTitles', () => {
    it('should select the feature state', () => {
      const result = selectTitleState(initialState);
      expect(result).toEqual(initialState.title);
    });
  })
  describe('selectFilteredTitles', () => {
    it('should return all titles if there is no filter', () => {
      const result = selectFilteredTitles(initialState);
      expect(result.length).toEqual(50);
    });
    it('should return a title if it matches the filter', () => {
      const state = {
        title: {
          ...initialState.title,
          filter: 'fate'
        }
      }
      const result = selectFilteredTitles(state);
      expect(result.length).toEqual(1);
    });
    it('should not return a title if its in myTitles', () => {
      const state = {
        title: {
          ...initialState.title,
          filter: 'fate',
          myTitles: [
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
        }
      }
      const result = selectFilteredTitles(state);
      expect(result.length).toEqual(0);
    });
  })
  describe('selectMyTitles', () => {
    it('Should return my titles', () => {
      const state = {
        title: {
          ...initialState.title,
          myTitles: [
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
        }
      }
      const result = selectMyTitles(state);
      expect(result.length).toEqual(1);
    })
  })
  describe('selectMyTitlesDirty', () => {
    it('Should return if myTitles is dirty', () => {
      const state = {
        title: {
          ...initialState.title,
          dirty: true
        }
      }
      const result = selectMyTitlesDirty(state);
      expect(result).toBeTrue();
    })
  })
});
