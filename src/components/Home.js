import React from 'react';
import Container from 'react-bootstrap/Container';

import PostList from './PostList.js';

class Home extends React.Component {
    constructor(){
      super();
      this.state = {
          posts: [
              { "url": "B64n-rcJopb", "date": "1-3-2020", "user" : "magpie88", "key": 1},
              { "url": "BaJ-5o3By9u", "date": "12-5-2019", "user" : "thedavidhanks", "key": 2}
          ]
      };  
    }
    
    render() {
        return (
            <Container className="home">
                {this.state.posts !== [] ? <PostList posts={this.state.posts} /> : null}
            </Container>
        );
    }
};
export default Home;