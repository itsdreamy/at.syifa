const API_BASE = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '') 
  : '';

async function fetchFromApi(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `HTTP error ${res.status}`);
    }

    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (error) {
    console.warn(`[API] Fallback triggered for ${endpoint}:`, error.message);
    throw error;
  }
}

export const portfolioApi = {
  getHealth: () => fetchFromApi('/api/health'),
  getProjects: () => fetchFromApi('/api/projects'),
  getProjectBySlug: (slug) => fetchFromApi(`/api/projects/${slug}`),
  getExperiences: () => fetchFromApi('/api/experiences'),
  getAchievements: () => fetchFromApi('/api/achievements'),
  getVolunteer: () => fetchFromApi('/api/volunteer'),
  getArticles: () => fetchFromApi('/api/articles'),
  getArticleBySlug: (slug) => fetchFromApi(`/api/articles/${slug}`),
};
