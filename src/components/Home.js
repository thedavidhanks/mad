import React from 'react';
import Container from 'react-bootstrap/Container';
import InstagramEmbed from 'react-instagram-embed';

class Home extends React.Component {
    render() {
        return (
            <Container className="home">
                <InstagramEmbed
                    url='https://www.instagram.com/p/B64n-rcJopb/'
                    maxWidth={800}
                    hideCaption={false}
                />
                <InstagramEmbed
                    url='https://www.instagram.com/p/BaJ-5o3By9u/'
                    maxWidth={800}
                    hideCaption={false}
                />
            </Container>
        );
    }
};
export default Home;