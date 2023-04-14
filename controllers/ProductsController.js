module.exports = {

    getAllProducts: (req, res) => {
        res.json({text: "Get all products"});
    },
    getProduct: (req, res) => {
        res.send(`Get product with id: ${req.params.id}`);
    },
    setProduct: (req, res) =>{
        res.send('Create a new product');
    },
    updateProduct: (req, res) =>{
        res.send(`Update product with id: ${req.params.id}`);
    },
    deleteProduct: (req, res) =>{
        res.send(`Delete product with id: ${req.params.id}`);
    }
}