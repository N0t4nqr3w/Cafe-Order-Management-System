    import express from "express";
    import Customer from "../models/customer.js";

    export const router = express.Router();
    
    router.get("/", async (req, res) => { // Get all customers
        try {
            let customers;
            if(req.query.sort !== undefined){
                if(req.query.sort === "name"){
                    customers = await Customer.find().sort("name");
                } else {
                    customers = await Customer.find();
                }
            } else {
                customers = await Customer.find();
            }

            let limit = -1;
        if(req.query.limit !== undefined) {
             limit = parseInt(req.query.limit);
             if (isNaN(limit) || limit < 1) {
                return result.status(400).json({error:"Limit must be a positive integer"});
            }
        }

        let page = -1;
        if(req.query.page !== undefined) {
             page = parseInt(req.query.page);
             if (isNaN(page) || page < 1) {
                return result.status(400).json({error:"Page must be a positive integer"});
            }
        }

            //if we have a limit and a page, we can take a range based on the two values
            if(limit > 0 && page > 0) customers = customers.slice(limit*(page-1),limit*page);

            //if we have only a limit, we can assume it starts at 0
            else if(limit > 0 && page <= 0) customers = customers.slice(0,limit);

            res.json(customers);
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    }); 

    router.get("/:id", async (req, res) => { // Get one customer by Id
        try {
            const customer = await Customer.findById(req.params.id).populate("orders");
            
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
            res.json(customer);
        }
        catch (err) {
            res.status(400).send(err.message);
        }
    });

    router.post("/", async (req,res) => { // Create a new customer
        try{
            const customer = new Customer(req.body);
            await customer.save();
            res.status(201).json(customer);
        }
        catch(err){
            res.status(400).json({
                error: err.message
            });
        }
    });

    router.put("/:id", async (req, res) => { // Update an existing customer
        try {
            const customer = await Customer.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
        );
            if (!customer) {
                return res.status(404).json({ error: "Customer not found" });
            }
            res.json(customer);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    router.delete("/:id", async (req, res) => { // Delete a customer
        try {
            const customer = await Customer.findByIdAndDelete(req.params.id);
            if (!customer) {
                return res.status(404).json({ error: "Customer not found" });
            }
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });