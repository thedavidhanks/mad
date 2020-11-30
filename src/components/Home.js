import React from 'react';
import Container from 'react-bootstrap/Container';
import PostList from './PostList.js';

function Home(){
    
    return (
        <Container className="home">
            <PostList />
        </Container>
    );   
}
export default Home;