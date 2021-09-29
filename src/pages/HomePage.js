import { Fragment } from 'react';
import Banner from '../components/UI/Banner';
import skinCareImage from '../assets/kalos-skincare.jpg';
import bannerImage from '../assets/home-page-banner.jpg';
import ProductSection from '../components/Product/ProductSection';
import ArticleSection from '../components/Article/ArticleSection';

import articleBanner1 from '../assets/kalos-skincare-lwOmVsTuLdg-unsplash-1.jpg';
import articleBanner2 from '../assets/kalos-skincare-lwOmVsTuLdg-unsplash.jpg';
import ReviewSection from '../components/Reviews/ReviewSection';

import picture1 from '../assets/Mask Group-1.jpg';
import picture2 from '../assets/Mask Group-2.jpg';
import picture3 from '../assets/Mask Group-3.jpg';
import picture4 from '../assets/Mask Group-4.jpg';
const articleDatas = [
  {
    id: '1',
    img: {
      url: articleBanner1,
      alt: 'nature ingredients.',
    },
    text: {
      title: "It's simple, really.",
      paragraph:
        'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse sollicitudin ipsum cursus accumsan sollicitudin. Sed nec auctor ipsum. Phasellus interdum imperdiet.',
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
      paragraph:
        'Fusce vel lectus id eros varius cursus sed id purus. Proin sodales, dui eu pharetra eleifend, elit dui molestie velit, in suscipit elit velit in arcu. Morbi vitae tellus eget.',
    },
    link: 'article-02',
  },
];

const reviewDatas = [
  {
    id: '1',
    user: 'özlem A.',
    date: 'August 3, 2021',
    comment:
      'Proin tempor consequat massa a imperdiet. Nullam mattis sollicitudin orci, non sodales lacus suscipit non.',
  },
  {
    id: '2',
    user: 'özlem B.',
    date: 'August 3, 2021',
    comment:
      'I think the product is really good although the smell could be a little off putting. But the nozzle is really bad.',
  },
  {
    id: '3',
    user: 'özlem C.',
    date: 'August 3, 2021',
    comment:
      'Great texture, natural coverage. Only one minus is the drop which doesn’t dispose enough serum.',
  },
];
const productDatas = [
  {
    id: '1',
    url: picture1,
    name: 'Nam placerat nulla ut',
    price: 15.5,
  },
  {
    id: '2',
    url: picture2,
    name: 'Morbi suscipit nunc consequat odio',
    price: 20.0,
  },
  {
    id: '3',
    url: picture3,
    name: 'Nunc quis tortor et sem volutpat',
    price: 10.5,
  },
  {
    id: '4',
    url: picture4,
    name: 'Aenean sit amet tortor molestie',
    price: 15.5,
  },
];
const HomePage = (props) => {

  return (
    <Fragment>
      <Banner src={bannerImage} alt="The product picture." />
      <ProductSection
        textContent={{
          paragraph:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel pellentesque turpis, lacinia pretium mauris. Cras lacinia erat sed leo tristique condimentum nec id metus.',
          title: 'Go back to pure',
        }}
        productItems ={productDatas}
        status={props.status}
        title={props.title}
        message={props.message}
      />

      <Banner
        src={skinCareImage}
        alt="Girl smile with the product."
        title="Understand your skin and its complex needs."
        linkText="GET IT FOR FREE"
      />
      <ArticleSection articles={articleDatas} />
      <hr className="hr-middle" />
      <ReviewSection reviews={reviewDatas} title="Reviews" />
    </Fragment>
  );
};

export default HomePage;
