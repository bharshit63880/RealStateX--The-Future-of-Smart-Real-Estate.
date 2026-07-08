import { HTTP_STATUS } from '../../shared/constants/http-status.js';
import { successResponse } from '../../shared/utils/response.js';
import { getHealth } from './health.service.js';

export const healthCheck = (request, response) => {
  response.status(HTTP_STATUS.OK).json(
    successResponse({
      message: 'Service healthy',
      data: getHealth(),
      requestId: request.id,
    }),
  );
};
