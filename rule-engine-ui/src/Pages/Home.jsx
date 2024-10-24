import React, { useState, useEffect } from 'react';
import RuleForm from '../Components/RuleForm';
import RuleList from '../Components/RuleList';
import EvaluationForm from '../Components/EvaluationForm';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.REACT_APP_BASE_URL;

const Home = () => {
    const [rules, setRules] = useState([]);
    const [selectedRule, setSelectedRule] = useState(null);
    const [evaluationResult, setEvaluationResult] = useState(null);
  
    useEffect(() => {
      fetchRules();
    }, []);
  
    const fetchRules = async () => {
      try {
        const response = await axios.get(`${API_URL}/rules`);
        setRules(response.data);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };
  
    const createRule = async (rule) => {
      try {
        await axios.post(`${API_URL}/rules`, rule);
        fetchRules();
      } catch (error) {
        console.error('Error creating rule:', error);
      }
    };
  
    const evaluateRule = async (ruleId, data) => {
      try {
        const response = await axios.post(`${API_URL}/evaluate`, { ruleId, data });
        setEvaluationResult(response.data.result);
      } catch (error) {
        console.error('Error evaluating rule:', error);
        setEvaluationResult(null);
      }
    };

    const deleteRule = async (ruleId) => {
      try {
        await axios.delete(`${API_URL}/rules/${ruleId}`);
        fetchRules();
        if (selectedRule?._id === ruleId) {
          setSelectedRule(null);
          setEvaluationResult(null);
        }
      } catch (error) {
        console.error('Error deleting rule:', error);
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Rule Engine UI</h1>
        <RuleForm onSubmit={createRule} />
        <h2 className="text-xl font-semibold mb-2">Existing Rules</h2>
        <RuleList rules={rules} onSelect={setSelectedRule} onDelete={deleteRule}/>
        {selectedRule && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Evaluate Rule: {selectedRule.name}</h2>
            <EvaluationForm selectedRule={selectedRule} onEvaluate={evaluateRule} />
          </div>
        )}
        {evaluationResult !== null && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Evaluation Result</h2>
            <p className={evaluationResult ? 'text-green-600' : 'text-red-600'}>
              {evaluationResult ? 'Rule satisfied' : 'Rule not satisfied'}
            </p>
          </div>
        )}
      </div>
    );
}

export default Home