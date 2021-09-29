import HeadLine from '../Article/Headline';
import Container from '../UI/Container';
import ReviewItem from './ReviewItem';

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
