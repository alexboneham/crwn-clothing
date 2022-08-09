import { useNavigate } from 'react-router-dom';

import './directory-item.styles.scss';
import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  const navigate = useNavigate();

  const goToCategoryHandler = () => navigate(`/shop/${title}`);

  return (
    <DirectoryItemContainer onClick={goToCategoryHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
