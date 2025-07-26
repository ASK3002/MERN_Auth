// frontend/src/hooks/useExpenseTrends.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useExpenseTrends = (detailed = false) => {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const { data } = await axios.get('http://localhost:5000/api/ai/trends', {
          withCredentials: true,
        });

        if (detailed) {
          setTrends(data.trends || []);
        } else {
          setSuggestions(data.suggestions || []);
        }
      } catch (err) {
        console.error('Error fetching trends:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrends();
  }, [detailed]);

  return { loading, suggestions, trends };
};

export default useExpenseTrends;
