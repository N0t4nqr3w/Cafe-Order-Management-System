import express from "express";
import Baristas from "../models/baristas.js";

export const router = express.Router();

router.get("/", async(req, res) => {
    try{
        let baristas;
        if(req.query.sort !== undefined){
            if(req.query.sort === "name"){
                baristas = await Baristas.find().sort("name");
            }
            else if(req.query.sort === "date") {
                baristas = await Baristas.find().sort("hiredDate");
            } else {
                baristas = await Baristas.find();
            }
        } else {
            baristas = await Baristas.find();
        }
        
        if(req.query.active !== undefined){
            const isActive = req.query.active === "true";
            baristas = baristas.filter(b => b.active === isActive);
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
        if(limit > 0 && page > 0) baristas = baristas.slice(limit*(page-1),limit*page);

        //if we have only a limit, we can assume it starts at 0
        else if(limit > 0 && page <= 0) baristas = baristas.slice(0,limit);
        
        res.json(baristas);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post("/", async(req, res) => {
    try{
        const barista = new Baristas(req.body);
        await barista.save();
        res.status(201).json(barista);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
});

router.put("/:id", async(req, res) => {
    try{
        const barista = await Baristas.findById(req.params.id);
        if(!barista){
            res.status(404).json({error: err.message});
        }

        if(req.body.name !== undefined){
            barista.name = req.body.name;
        }
        if(req.body.email !== undefined){
            barista.email = req.body.email;
        }
        if(req.body.phone !== undefined){
            barista.phone = req.body.phone;
        }
        if(req.body.active !== undefined){
            barista.active = req.body.active;
        }
        if(req.body.hiredDate !== undefined){
            barista.hiredDate = req.body.hiredDate;
        }
        await barista.save();
        res.json(barista);
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
});

router.delete("/:id", async(req, res) => {
    try{
        await Baristas.findByIdAndDelete(req.params.id);
        res.status(204).send();
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});