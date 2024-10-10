import { useEffect, useState } from 'react';
import { useContentStore } from '../store/content';
import axios from 'axios';

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const contentType = useContentStore((state) => state.contentType); // Acceso correcto a contentType

  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContent(res.data.content);
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;




// /api/v1/${contentType}/trending