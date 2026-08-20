import { HTTP_STATUS } from '../../shared/constants/http-status.js';
import { successResponse } from '../../shared/utils/response.js';
import { getPropertyBySlug, searchProperties } from './property.service.js';

export const listProperties = (request, response) => { const result = searchProperties(request.query); response.status(HTTP_STATUS.OK).json(successResponse({ message: 'Properties retrieved', data: result.items, meta: result.meta, requestId: request.id })); };
export const showProperty = (request, response) => response.status(HTTP_STATUS.OK).json(successResponse({ message: 'Property retrieved', data: getPropertyBySlug(request.params.slug), requestId: request.id }));
