import { useNavigate } from 'react-router-dom';

import './directory-item.styles.scss';
import {BackgroundImage} from './directory-item.styles.jsx';

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  const navigate = useNavigate();

  const goToCategoryHandler = () => navigate(`/shop/${title}`);

  return (
    <div className="directory-item-container" onClick={goToCategoryHandler}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
