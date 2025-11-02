// Script to extract state and district codes from sample-res.json
const fs = require('fs');
const path = require('path');

// Read the sample response
const sampleData = JSON.parse(fs.readFileSync(path.join(__dirname, '../sample-res.json'), 'utf8'));

// Extract unique states and districts
const states = new Map();
const districts = new Map();

sampleData.records.forEach(record => {
  // Extract state info
  if (!states.has(record.state_code)) {
    states.set(record.state_code, {
      state_code: record.state_code,
      state_name: record.state_name
    });
  }

  // Extract district info
  const districtKey = `${record.state_code}-${record.district_code}`;
  if (!districts.has(districtKey)) {
    districts.set(districtKey, {
      state_code: record.state_code,
      state_name: record.state_name,
      district_code: record.district_code,
      district_name: record.district_name
    });
  }
});

// Generate TypeScript interfaces
const statesArray = Array.from(states.values());
const districtsArray = Array.from(districts.values());

console.log('// Generated from sample-res.json');
console.log('export const OFFICIAL_STATES = ', JSON.stringify(statesArray, null, 2));
console.log('export const OFFICIAL_DISTRICTS = ', JSON.stringify(districtsArray, null, 2));

// Save to file
const outputContent = `// Auto-generated from sample-res.json
export const OFFICIAL_STATES = ${JSON.stringify(statesArray, null, 2)};

export const OFFICIAL_DISTRICTS = ${JSON.stringify(districtsArray, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../services/api/officialCodes.ts'), outputContent);
console.log('✅ Codes extracted to services/api/officialCodes.ts');