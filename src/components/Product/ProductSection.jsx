import HeadLine from "../Article/Headline.jsx";
import Container from "../UI/Container.jsx";
import ProductList from "./ProductList.jsx";

const ProductSection = (props)=>{
  const {title, paragraph , link } = props.textContent;
  const {productItems} = props;

  return <Container className='grid-col-2' >
    <HeadLine title={title} paragraph={paragraph} link={link} />
    <ProductList className='grid-col-2 gap-4' productItems={productItems} status={props.status}
        title={props.title}
        message={props.message}/>
  </Container>
};

export default ProductSection;