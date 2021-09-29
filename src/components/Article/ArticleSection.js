import Container from '../UI/Container';
import classes from './ArticleSection.module.css';
import HeadLine from './Headline';

const ArticleSection = (props) => {
  const content = <ul >{props.articles.map((article) => (
    <li key={article.id} className={classes['article-item']} >
      <img src={article.img.url} alt={article.img.alt} />
      <HeadLine
        title={article.text.title}
        paragraph={article.text.paragraph}
        link={article.link}
      />
    </li>
  ))}</ul>;

  return <Container>{content}</Container>;
};

export default ArticleSection;
