import React, {useState, useEffect} from 'react';
import parse from 'html-react-parser';

    //call nodescripts for each postID
    //create a const instaPosts which is array of elements
    //if the const is not null, then include it in a div.

function PostList(props){
    const [error, setError] = useState(null);
    const [postIds, setPostIds] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postHTMList, setPostList] = useState([]);
    //const [shortList] = useState([{url: "CFQSRf6Dxa2"}, {url: "CD2bgcXDiiY"}]);
    console.log("PostList rendered");
    
    //const shortList = [{url: "CFQSRf6Dxa2"}, {url: "CD2bgcXDiiY"}];
    
    useEffect(()=>{
        fetch('https://tdh-scripts.herokuapp.com/mad/')
            .then(resp => resp.json())
            .then(posts => {
                setPostIds(posts);
            })
            .catch( e => console.log(`Couldn't get posts: ${e}`));
    },[]);
    
    useEffect(()=>{       
        postIds.forEach( (post) =>{
            let url = `http://44.237.229.69:3000/embedinsta/?postid=${post.url}`;
            fetch(url, { mode: 'cors' })
                .then( (resp) => resp.json())
                .then( 
                    (data) => { 
                        setIsLoaded(true);
                        setPostList(previous => [...previous, data.html]);
                        //setPostList(data.html);
                    })
                .catch( e => {
                    setError(e);
                    console.log(`Error getting ${url}: `+e);
                 });
        })
        ;
    },[postIds]);
    
    // Run the code once when the Block is rendered with React's Effect Hook:
    useEffect(() => {
          // Load Instagram's embed.js, the external JavaScript file for Instagram:
          const instagramScript = document.createElement("script");
          instagramScript.setAttribute("src", "https://www.instagram.com/embed.js");
          instagramScript.setAttribute("async", true);
          const instaElement = document.getElementsByClassName("instagram-media")[0];
          // Only add the Instagram file if there is an Instagram Post to embed:
          if(instaElement){
              instaElement.appendChild(instagramScript);
          }else{
              console.log("none found");
          }
    }, [postHTMList]);
//    useEffect( ()=>{
//        console.log('triggered');
//        if(window.instgrm){
//            window.instgrm.Embeds.process();
//        }
//    },[postHTMList]);
    
    if(error){
        return <div>Error: {error.message}</div>;
    }else if (!isLoaded){
        return <div>Loading...</div>;
    }else{
        const postHTMLnoScript = postHTMList.join('').replace(/<script.*<\/script>/, "");
        return (
            <div>
                {parse(postHTMLnoScript)}
            </div>
        );
    }
    
}

export default PostList;