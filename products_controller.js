// A controller file is where the sql files are brought in to functions and stored to manage the functionality of your webpage. The sql are treated like parts of a function/method and then exported from here to be used in the endpoint functions.

// ex. To use the create method you would just have to reference a create() with all the required variables from the create_product.sql file passed in as parameters. This controller handles requests from the client side as well as errors from the server side.

module.exports = {
    create: (req,res,next)=>{
        const dbInstance =req.app.get(`db`);
        const { name, description, price, image_url } =req.body;

        dbInstance.create_product([name, description, price, image_url])
        .then( () => res.sendStatus(200) )
        .catch(err =>{
            res.sendStatus(500).send({errorMessage: `Something is wrong on our end, we are working on a fix.`});
            console.log(err)
        })
    },
    getOne: (req,res,next)=>{
        const dbInstance =req.app.get(`db`);
        const{ id } = req.params;

        dbInstance.read_product( id )
        .then( product => res.status(200). send( product ))
        .catch( err =>{
            res.status(500).send({errorMessage: `Something is wrong on our end, we are working on a fix.`})
            console.log(err)
        })
    },
    getAll: (req,res,next) =>{
        const dbInstance =req.app.get(`db`);

        dbInstance.read_products()
        .then( products=> res.status(200).send( products ) )
        .catch( err =>{res.status(500).send({errorMessage: `Something is wrong on our end, we are working on a fix`})
        console.log(err)
    })
    },
    update: (req,res,next)=>{
        const dbInstance =req.app.get(`db`);
        

        dbInstance.update_product()
        .then( () => res.sendStatus(200) )
        .catch( err =>{
            res.status(500).send({errorMessage: `Something went wrong and we are working on a fix.`})
            console.log(err)
        })
    },
    delete: (req, res,next)=>{
        const dbInstance = req.app.get(`db`)
        const { id } =req.params

        dbInstance.delete_product( id )
        .then( () =>
            res.sendStatus(200) )
        .catch(err =>{
            res.status(500).send({errorMessage:`something went wrong however we are working on a fix.`})
        })
    }
}