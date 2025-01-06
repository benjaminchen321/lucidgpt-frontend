// frontend/src/hooks/useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response?.data || []);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Token might be expired or invalid
          localStorage.removeItem("token"); // Remove invalid token
          navigate("/login");
        } else {
          console.error(err);
          setError("Failed to fetch data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, navigate]);

  return { data, loading, error };
};

export default useFetch;
