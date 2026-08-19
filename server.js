const express = require('express');
const cors = require('cors');
const schemes = require('./schemes.json');

const app = express();
app.use(cors());
app.use(express.json());

// Scheme Filtering Logic API
app.post('/api/match-schemes', (req, res) => {
  const { age, gender, occupation } = req.body;

  const matchedSchemes = schemes.filter(s => {
    const ageMatch = age >= s.min_age && age <= s.max_age;
    const genderMatch = s.gender === 'All' || s.gender === gender;
    
    // Updated Occupation Filter Logic
    const occMatch = s.occupation === 'All' || occupation === 'All' || s.occupation === occupation;
    
    return ageMatch && genderMatch && occMatch;
  });

  res.json({ success: true, data: matchedSchemes });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));