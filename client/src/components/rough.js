import react from 'react';

export default class AnyComponent extends react.Component{
    constructor(props){
        super(props);
        this.state={
            name:[]
        }
    }
componentDidMount() {
    this.renderPosts();
  }
  
  renderPosts = async() => {
    try {
      const res = await axios.get('/posts');
      const posts = res.data;
  
      // this will re render the view with new data
      this.setState({
        Posts: posts
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  render() {
    const posts = this.state.Posts?.map((post, i) => (
      <li key={i} className="list-group-item">{post.text}</li>
    ));
  
    return (
      <div>
        <ul className="list-group list-group-flush">
          {posts}
        </ul>
      </div>
    );
  }
}