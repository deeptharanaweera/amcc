import mongoose from 'mongoose' 

const connectionToDatabase = async () =>{
    try{
        await mongoose.connect(process.env.MongoURL);
        console.log("Connected to database");
    }catch(err){
        console.log(err);
    }
}

export default connectionToDatabase;

// import mongoose from 'mongoose';
    
// const connectionToDatabase = async () => {
//     if (mongoose.connections[0].readyState) {
//         return; // Use existing connection
//     }
//     await mongoose.connect(process.env.MongoURL);
// };

// export default connectionToDatabase;
