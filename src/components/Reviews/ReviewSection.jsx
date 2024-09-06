import HeadLine from '../Article/Headline.jsx';
import Container from '../UI/Container.jsx';
import ReviewItem from './ReviewItem.jsx';

const ReviewSection = (props) => {
  const content = (
    <ul>
      {props.reviews.map((review) => (
        <ReviewItem
          key={review.id}
          id={review.id}
          user={review.user}
          date={review.date}
          comment={review.comment}
        />
      ))}
    </ul>
  );

  return (
    <Container className="grid-col-1-2">
      <HeadLine
        title={props.title}
        paragraph={props.paragraph}
        link={props.link}
      />
      {content}
    </Container>
  );
};

export default ReviewSection;
