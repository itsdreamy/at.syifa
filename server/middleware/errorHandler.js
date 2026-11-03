export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found`
  });
}

export function globalErrorHandler(err, req, res, next) {
  console.error('[API Error]:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error'
  });
}
