import DirectoryItem from '../directory-item/directory-item.component';
import { categories } from '../../data/categories';

import { CategoriesMenuContainer } from './directory.styles.jsx';


const Directory = () => {
  return (
    <CategoriesMenuContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </CategoriesMenuContainer>
  );
};

export default Directory;
