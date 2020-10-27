const products_controller = require("./products_controller")

require(`dotenv`).config()
const express = require(`express`),
      massive =require(`massive`),
      app =express(),
      {SERVER_PORT} = process.env
app.use(express.json())
app.listen(SERVER_PORT, () =>{
    console.log(`Server is running on ${SERVER_PORT}.`)
})

const { SERVER_PORT, CONNECTION_STRING } = process.env
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(dbInstance =>{
    app.set(`db`, dbInstance)
}).catch(err => console.log(err))


app.post(`/api/products`, products_controller.create);
app.get(`/api/products`,products_controller.getAll);
app.get(`/api/products/:id`,products_controller.getOne);
app.put(`/api/products/:id`,products_controller.update);
app.delete(`/api/products/:id`,products_controller.delete)