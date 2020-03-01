import React from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import PostList from './PostList.js';

class Home extends React.Component {
    constructor(){
      super();
      this.state = {
          posts: []
      };  
    }
    componentDidMount(){
        axios.get('https://tdh-scripts.herokuapp.com/mad/')
            .then(posts => {
                console.log(posts);
                this.setState({
                    posts: posts.data
                });
            });
    }
    render() {
        return (
            <Container className="home">
                {this.state.posts !== [] ? <PostList posts={this.state.posts} /> : "Loading..."}
            </Container>
        );
    }
};
export default Home;