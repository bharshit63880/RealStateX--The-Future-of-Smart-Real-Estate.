import { HTTP_STATUS } from '../../shared/constants/http-status.js';
import { successResponse } from '../../shared/utils/response.js';
import { getHealth, getReadiness } from './health.service.js';

export const healthCheck = (request, response) => {
  response.status(HTTP_STATUS.OK).json(
    successResponse({
      message: 'Service healthy',
      data: getHealth(),
      requestId: request.id,
    }),
  );
};

export const readinessCheck = (request, response) => {
  const data = getReadiness();
  const ready = data.status === 'ready';
  response.status(ready ? HTTP_STATUS.OK : HTTP_STATUS.SERVICE_UNAVAILABLE).json(
    successResponse({
      message: ready ? 'Service ready' : 'Service not ready',
      data,
      requestId: request.id,
    }),
  );
};
