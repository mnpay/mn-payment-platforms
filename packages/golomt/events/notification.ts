import { RequestHandler } from 'express'
import { NotificationPayload } from '../types'

export const onNotification: (callback: (notification: NotificationPayload) => void) => RequestHandler = (callback) => {
  return (req, res) => {
    callback(req.body)
    res.sendStatus(200)
  }
}
