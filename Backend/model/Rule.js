const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
    name: String,
    ruleString: String,
    ast: Object
  });

const Rule=mongoose.model('Rule',RuleSchema);

module.exports=Rule;