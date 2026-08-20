import { NotFoundError } from '../../shared/errors/not-found-error.js';
import { demoProperties } from './property.data.js';

const includes = (value, query) => value.toLocaleLowerCase().includes(query.toLocaleLowerCase());

export const searchProperties = (filters = {}) => {
  const page = Math.max(1, Number(filters.page) || 1);
  const limit = Math.min(24, Math.max(1, Number(filters.limit) || 12));
  const results = demoProperties.filter((property) => {
    if (filters.q && ![property.title, property.city, property.locality].some((value) => includes(value, filters.q))) return false;
    if (filters.city && !includes(property.city, filters.city)) return false;
    if (filters.listingType && property.listingType !== filters.listingType) return false;
    if (filters.propertyType && property.propertyType !== filters.propertyType) return false;
    if (filters.bedrooms && property.bedrooms !== Number(filters.bedrooms)) return false;
    if (filters.maxPrice && property.price > Number(filters.maxPrice)) return false;
    if (filters.verified === 'true' && !property.verified) return false;
    return true;
  });
  const start = (page - 1) * limit;
  return { items: results.slice(start, start + limit), meta: { page, limit, total: results.length, pages: Math.ceil(results.length / limit), source: 'DEMO_SEED' } };
};

export const getPropertyBySlug = (slug) => {
  const property = demoProperties.find((item) => item.slug === slug);
  if (!property) throw new NotFoundError('Property not found');
  return property;
};
