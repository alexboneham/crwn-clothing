import CategoriesMenu from './components/categories-menu/categories-menu.component';
import categories from './data/categories.json';

const App = () => {
  return (
    <CategoriesMenu categories={categories} />
  )
};

export default App;
