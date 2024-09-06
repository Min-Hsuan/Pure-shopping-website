import './Container.css';

const Container = (props) => {
  return (
    <section className={`container ${props.className ? props.className : ''}`}>
      {props.children}
    </section>
  );
};

export default Container;
