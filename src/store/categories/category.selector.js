import { createSelector } from 'reselect';

// Create variable for the desired reducer
const selectCategoryReducer = (state) => state.categories;

// Create memoized selector for getting the categories
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// Create memoized selector for the mapping of categories
export const selectCategoriesMap = createSelector([selectCategories], (categories) =>
  categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);
