import React from 'react';
import Container from 'react-bootstrap/Container';

import MadPost from './MadPost.js';
const apikey = process.env.REACT_APP_BLOGGER_API;


class MadBlogger extends React.Component {
    constructor(){
      super();
      this.state = {
          posts: [],
          loadingMsg: "Loading..."
      };  
    }
    //ids associated with blogger.com accounts.
    bloggerids = ["1446067928327960043","197759443464035384"];
    tempPostList = [];
    
    
    componentDidMount(){
        
        //Get the posts for each account in an array.
        this.bloggerids.forEach(id => {
            fetch('https://www.googleapis.com/blogger/v3/blogs/'+id+'/posts?key='+apikey)
                    .then(resp => resp.json())
            //add posts which are labeled "2020 Roadtrip" to the array
            .then(posts => {
                posts.data.items.forEach( post => {
                   if(post.labels && post.labels.includes("2020 Roadtrip")){
                       this.tempPostList.push(post);
                   }
                });
            //resort the array based on the date
            }).then( () =>{
                this.tempPostList.sort(function(a,b){
                var dateA = new Date(a.published);
                var dateB = new Date(b.published);
                    return dateB - dateA;
                });
            }).then( () => {
                this.setState({posts: this.tempPostList});
            }).catch( (error) =>{
                console.log("Error retrieving blog: ", error.message);
                this.setState({loadingMsg: "Error retrieving blog.  Please contact admin."});
            });
        });
          
    }
    render() {
        const { posts } = this.state;
        const postList = posts.length ? 
            (
                posts.map( post => {
                    return(
                        <MadPost
                            key={post.id}
                            title={post.title}
                            author={post.author.displayName}
                            authorpic={post.author.image.url}
                            date={post.published}
                        >
                            {post.content}
                        </MadPost>);
                })
            ):(
                <div>{this.state.loadingMsg}</div>
            );
        return (
            <Container className="home">
                {postList}
            </Container>
        );
    }
};
export default MadBlogger;