export default class Responder {
    constructor() {
        this.statusCode = null;
        this.type = null;
        this.data = null;
        this.message = null;
    }

    responseSuccess(res, message = 'Success', data) {
        return res.status(200).json({
            status: 'Success',
            message,
            data
        })
    }

    responseUpdated(res, message = 'Succesfully updated', data) {
        return res.status(201).json({
            status: 'Success',
            message,
            data
        })
    }

    responseCreated(res, message, data) {
        return res.status(201).json({
            status: 'Success',
            message,
            data
        })
    }

    responseDeleted(res) {
        return res.status(200).json({
            status: 'Success',
            message: 'Succesfully deleted'
        })
    }

    responseUnauthorized(res) {
        return res.status(401).json({
            status: 'Error',
            message: 'Unauthoirized'
        })
    }

    responseNotFound(res, errors = []) {
        return res.status(404).json({
            status: 'Error',
            message: 'Not found',
            errors
        })
    }
    resourceNotFound(res, message) {
        return res.status(204).json({
            status: 'Success',
            message
        })
    }
    responseServerError(res, errors = []) {
        return res.status(500).json({
            status: 'Error',
            message: 'Internal Server Errors',
            errors
        })
    }
}