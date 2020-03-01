import React from 'react';
import InstagramEmbed from 'react-instagram-embed';


const PostList = props =>{
    //props.markers will be an array of marker objects
    
    //cycle through each element of the array.
    const postlist = props.posts.map((post, index) => {
        
        //const dateAdded = (marker.addedOn) ? marker.addedOn.toDate() : null ;
        
        return(
            <InstagramEmbed
                    url={"https://www.instagram.com/p/".concat(post.url,"/")}
                    maxWidth={800}
                    hideCaption={false}
                    key={post.id}
            />
        );}
    );
    return postlist;
};

export default PostList;