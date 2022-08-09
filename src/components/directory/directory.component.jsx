import DirectoryItem from '../directory-item/directory-item.component';

import {CategoriesMenuContainer} from './directory.styles.jsx';

const Directory = ({ categories }) => {
  return (
    <CategoriesMenuContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </CategoriesMenuContainer>
  );
};

export default Directory;
