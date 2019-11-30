const express = require('express');
const cors = require('cors');
const app = express();

//middleware
app.use(request.json());
app.use(cors({
    origin:'http://localhost:3000'
}));

//db
const db = {
    posts: [
        {
            id: 1,
            title: "post 1",
            body: "intellectual stuff"
        },
        {
            id: 2,
            title: "post 2",
            body: "intellectual stuff"
        }
    ]
};
//READ
app.get("/api/posts", (request, response)=>{
    // response.json({
    //     text: "test"
    // });
    response.json(db.posts);
});

app.get("/api/posts/:id", (request, response)=>{
    const id = Number(request.params.id);

    const post = db.posts.find((post) => {
        return post.id === id;
    });

    if (post){
        response.json(post);
    } else {
        response.status(404).send();
    }

});

//CREATE
app.post("/api/posts", (response, request) =>{

    const post = request.body;

    post.id = db.posts.length + 1;

    db.posts.push(post);

    response.json(post);
});

//DELETE
app.delete('/api/posts/:id', (request,response)=>{
    const id = Number(request.params.id);

    const post = db.posts.find((post) => {
        return post.id === id;
    });

    if (post){
        //delete
        db.posts = db.posts.filter((post)=>{
            return post.id !== id;
        });
        response.status(204).send();
        
    } else {
        response.status(404).send();
    }
});

//UPDATE
app.put("/api/posts/:id", (request,response)=>{
    const id = Number(request.params.id);
    const post = db.posts.find((post) => {
        return post.id === id;
    });

    if (post){
        //update
        Object.assign(post,request.body);
        response.json(post);
    } else {
        response.status(404).send();
    }
});


app.listen(process.env.PORT || 8000);