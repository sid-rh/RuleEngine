import React, { useState } from 'react';

const EvaluationForm = ({ selectedRule, onEvaluate }) => {
    const [data, setData] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        const parsedData = JSON.parse(data);
        onEvaluate(selectedRule._id, parsedData);
      } catch (error) {
        alert('Invalid JSON data');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter JSON data to evaluate"
          className="w-full p-2 border rounded"
          rows="4"
        />
        <button type="submit" className="mt-2 p-2 bg-green-500 text-white rounded">Evaluate Rule</button>
      </form>
    );
}

export default EvaluationForm;