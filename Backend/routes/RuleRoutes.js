const express=require('express');
const router=express.Router();
const {createRules,getRules,evaluateRules,combineRules,deleteRule}=require('../controller/RuleController');

router.post('/rules',createRules);
router.get('/rules',getRules);
router.post('/combine',combineRules);
router.post('/evaluate',evaluateRules);
router.delete('/rules/:id',deleteRule);

module.exports=router;