const required = (key, fallback) => {
  const value = import.meta.env[key] ?? fallback;

  if (value === undefined || value === '') {
    throw new Error(`Missing required frontend environment variable: ${key}`);
  }

  return value;
};

export const env = {
  appName: required('VITE_APP_NAME', 'RealStateX'),
  apiBaseUrl: required('VITE_API_BASE_URL', 'http://localhost:5000/api/v1'),
};
