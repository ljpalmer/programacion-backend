import { request } from "express";

export default class LoggerController{
    loggerTest = async (req = request, res) => {
        req.logger.debug('This is a Log of level debug');
        req.logger.http('This is a Log of level http');
        req.logger.info('This is a Log of level Info');
        req.logger.warning('This is a Log of level warning');
        req.logger.error('This is a Log of level error');
        req.logger.fatal('This is a Log of level fatal');

        res.send('Logger Test');
    }
}
//export default LoggerController