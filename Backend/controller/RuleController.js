const mongoose=require('mongoose');
const Rule=require('../model/Rule');
const ruleEngine = require('../Utils/RuleEngine');


const createRules= async (req, res) => {
    try {
      const { name, ruleString } = req.body;
      const ast = ruleEngine.createRule(ruleString);
      const rule = new Rule({ name, ruleString, ast });
      await rule.save();
      res.status(201).json(rule);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
const getRules=async (req, res) => {
    const rules = await Rule.find();
    res.json(rules);
  }

const combineRules=async(req,res)=>{
  const rules=req.body.rules;
  const combinedAST = ruleEngine.combineRules(rules);
  res.status(201).json(combinedAST);
}
  
const evaluateRules=async (req, res) => {
    try {
      const { ruleId, data } = req.body;
      const rule = await Rule.findById(ruleId);
      if (!rule) {
        return res.status(404).json({ error: 'Rule not found' });
      }
      const result = ruleEngine.evaluateRule(rule.ast, data);
      res.json({ result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

const deleteRule=async(req,res)=>{
  try {
    const {id}=req.params;
    if(!id) return res.status(404).json({error:'Rule not found'});

    const result=await Rule.findByIdAndDelete(id);
    res.json({result})
  } catch (error) {
    res.status(400).json({error:error.message});
  }
}

module.exports={createRules,getRules,evaluateRules,combineRules,deleteRule};