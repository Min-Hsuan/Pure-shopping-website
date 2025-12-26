import { useParams } from 'react-router-dom';

import Article from '../components/Article/Article.jsx';
import articleBanner1 from '../../public/images/kalos-skincare-unsplash-1.jpg';
import articleBanner2 from '../../public/images/kalos-skincare-unsplash.jpg';
const articleDatas = [
  {
    id: '1',
    img: {
      url: articleBanner1,
      alt: 'nature ingredients.',
    },
    text: {
      title: "It's simple, really.",
      subTitle:
        'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse sollicitudin ipsum cursus accumsan sollicitudin. Sed nec auctor ipsum. Phasellus interdum imperdiet.',
      paragraph:
        'Fusce id diam auctor, consectetur libero in, auctor libero. In sit amet eleifend nisl. Cras tortor libero, placerat nec feugiat aliquam, auctor non diam. Sed eget augue non metus maximus volutpat. Suspendisse cursus ligula eu est scelerisque, quis ultrices est posuere. Morbi ornare odio nunc, in pulvinar ipsum euismod sed. Pellentesque volutpat metus et dolor tincidunt pulvinar. Etiam sed nibh et augue dapibus lacinia eget non sapien.',
    },
    link: 'article-01',
  },
  {
    id: '2',
    img: {
      url: articleBanner2,
      alt: 'skin care procedure.',
    },
    text: {
      title: 'Better way to feel better',
      subTitle:
        'Fusce vel lectus id eros varius cursus sed id purus. Proin sodales, dui eu pharetra eleifend, elit dui molestie velit, in suscipit elit velit in arcu. Morbi vitae tellus eget.',
      paragraph:
        'Fusce id diam auctor, consectetur libero in, auctor libero. In sit amet eleifend nisl. Cras tortor libero, placerat nec feugiat aliquam, auctor non diam. Sed eget augue non metus maximus volutpat. Suspendisse cursus ligula eu est scelerisque, quis ultrices est posuere. Morbi ornare odio nunc, in pulvinar ipsum euismod sed. Pellentesque volutpat metus et dolor tincidunt pulvinar. Etiam sed nibh et augue dapibus lacinia eget non sapien.',
    },
    link: 'article-02',
  },
];

const Blog = (props) => {
  const params = useParams();
  const { articleId } = params;

  const articleItem = articleDatas.find(
    (article) => article.link === articleId
  );

  return <Article item={articleItem} />;
};

export default Blog;
