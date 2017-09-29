import { Router } from 'express'
import { v4 } from 'uuid'
import constants from '../actions/constants'

const dispatchAndRespond = (req, res, action) => {
    req.store.dispatch(action)
    res.status(200).json(action)
}

const router = Router()

router.get("/colors", (req, res) =>
    res.status(200).json(req.store.getState().colors)
)

router.post("/colors", (req, res) =>
    dispatchAndRespond(req, res, {
        type: constants.ADD_COLOR,
        id: v4(),
        title: req.body.title,
        color: req.body.color,
        timestamp: new Date().toString()
    })
)

router.post("/sort/:way", (req, res) =>
    dispatchAndRespond(req, res, {
        type: constants.SORT_COLORS,
        sortBy: req.params.way,
    })
)

router.put("/color/:id", (req, res) =>
    dispatchAndRespond(req, res, {
        type: constants.RATE_COLOR,
        id: req.params.id,
        rating: parseInt(req.body.rating)
    })
)

router.delete("/color/:id", (req, res) =>
    dispatchAndRespond(req, res, {
        type: constants.REMOVE_COLOR,
        id: req.params.id
    })
)

export default router