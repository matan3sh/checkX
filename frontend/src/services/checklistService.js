import axios from 'axios';

export default {
  query
};

async function query() {
  return await axios.get('/api/checklist');
}
