import classes from './Article.module.css';

const Article = (props) => {
  const { img, text } = props.item;
  return (
    <div className={classes.article} style={{backgroundImage: `url('${img.url}')`}}>
      <div className={classes['grid-col-12']}>
        <h3 className={classes.title}>{text.title}</h3>
        <div className={classes.content}>
          <span>{text.subTitle}</span>
          <p>{text.paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default Article;
