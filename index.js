// TODO : CREATE SERVER 
const express = require("express")
const fs=require("fs")
const path=require("path")
const app=express()
const port = 4000
app.use(express.json())
// !TODO : ADD NEW USER (QUESTION 1)
app.post("/add/user",(request,response)=>{
const {userId,name,email,age}= request.body
const pathFile=path.join(__dirname,"users.json")
const data = fs.readFileSync(pathFile, "utf-8");
const users = JSON.parse(data);
const emailExists = users.some(user => user.email === email);
if (emailExists) {
    return response.status(400).json({ message: "Email already exists!" });
}
users.push({ userId, name, email, age });
fs.writeFile(pathFile, JSON.stringify(users, null, 2), "utf-8", (error)=>{
    if(error){
        console.log("ERROR :",error)
        response.status(500).json({message:"Failed to add to file !"})
    }
    else{
        response.status(200).json({message:"User added successfully !"})
    }
})
})
// TODO : UPDATE USER DATA  (QUESTION 2)
app.put("/update/user/:id",(request,response)=>{
    const userId = Number(request.params.id)
    const {name,email,age} = request.body
    const pathFile=path.join(__dirname,"users.json")
    const data =fs.readFileSync(pathFile,"utf-8")
    const users = JSON.parse(data)
    const userIndex=users.findIndex(user => user.userId === userId)
    users[userIndex] = {
      ...users[userIndex],
      name: name ,
      email: email,
      age: age 
    };
    fs.writeFile(pathFile, JSON.stringify(users, null, 2), "utf-8", (error)=>{
    if(error){
        console.log("ERROR :",error)
        response.status(500).json({message:"Failed to add to file !"})
    }
    else{
        response.status(200).json({message:"User updated successfully !",user:users[userIndex]})
    }
})
})
// TODO : DELETE USER (QUESTION 3)
app.delete("/delete/user/:id",(request,response)=>{
    const userId=Number(request.params.id)
    const pathFile = path.join(__dirname,"users.json")
    const data = fs.readFileSync(pathFile,"utf-8")
    const users = JSON.parse(data)
    const userIndex = users.findIndex(user=>user.userId === userId)
    users.splice(userIndex, 1);
    fs.writeFile(pathFile,JSON.stringify(users,null,2),"utf-8",(error)=>{
        if(error){
            console.log("ERROR :",error)
            response.status(500).json({message:"Failed to delete user!"})
        }
        else{
            response.status(200).json({message:"User deleted successfully!"})
        }
    })

})
// TODO : GET USER BY NAME  (QUESTION 4)
app.get("/get/user/getByName", (request, response) => {
    const { name } = request.query;
    const pathFile = path.join(__dirname, "users.json");
    const data = fs.readFileSync(pathFile, "utf-8");
    const users = JSON.parse(data);
    const user = users.find(user => user.name === name);
    if (!user) {
        return response.status(404).json({ message: "User not found!" });
    }
    response.status(200).json({ user });
});
// TODO : GET ALL USERS (QUESTION 5)
app.get("/get/user",(request,response)=>{
    const pathFile = path.join(__dirname,"users.json")
    const data = fs.readFileSync(pathFile,"utf-8")
    const users = JSON.parse(data)
    response.status(200).json({users})
})
// TODO : FILTERS ALL USERS BY MIN AGE (QUESTION 6)
app.get("/get/user/filterByAge",(request,response)=>{
    const {age} = request.query
    const pathFile = path.join(__dirname,"users.json")
    const data = fs.readFileSync(pathFile,"utf-8")
    const users = JSON.parse(data)
    const filteredUsers = users.filter(user => user.age >= Number(age))
    response.status(200).json({filteredUsers})
})
// TODO : GET USER BY ID ( QUESTION 7)
app.get("/get/user/:id", (request, response) => {
    const userId = Number(request.params.id);
    const pathFile = path.join(__dirname, "users.json");
    const data = fs.readFileSync(pathFile, "utf-8");
    const users = JSON.parse(data);
    const user = users.find(user => user.userId === userId);
    if (!user) {
        return response.status(404).json({ message: "User not found!" });
    }
    response.status(200).json({ user });
});
// TODO : LISTEN SERVER
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})