import express from 'express'
import path from 'path'
import fs from 'fs'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { renderToString } from 'react-dom/server'
import bodyParser from 'body-parser'
import api from './api'
import App from '../components/App'
import storeFactory from '../store/storeFactory'
import initialState from '../../data/initialState.json'

const defaultStyles = fs.readFileSync(path.join(__dirname, '../../dist/assets/bundle.css'))

const fileAssets = express.static(
    path.join(__dirname, '../../dist/assets')
)

const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`)
    next()
}

const serverStore = storeFactory(true, initialState);
serverStore.subscribe(() => 
    fs.writeFile(
        path.join(__dirname, '../../data/initialState.json'),
        JSON.stringify(serverStore.getState()),
        error => (error) ? 
        console.log("Error saving state!", error) : 
        null
    )
)

const addStoreToRequestPipeline = (req, res, next) => {
    req.store = serverStore
    next()
}

const makeClientStoreFrom = store => url =>
    ({
        store: storeFactory(false, store.getState()),
        url
    })

const renderComponentsToHTML = ({url, store}) =>
    ({
        state: store.getState(),
        css: defaultStyles,
        html: renderToString(
            <Provider store={store}>
                <App />
            </Provider>
        )
    })

    const buildHTMLPage = ({html, state, css}) => `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Universal Color Organizer</title>
            <style>${css}</style>
        </head>
        <body>
            <div id="react-container">${html}</div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(state)}
            </script>
            <script src="/bundle.js"></script>
        </body>
    </html>
    `
    
    const htmlResponse = compose(
        buildHTMLPage,
        renderComponentsToHTML,
        makeClientStoreFrom(serverStore)
    )
    
    const respond = (req, res) =>
        res.status(200).send(htmlResponse(req.url))

export default express()
    .use(logger)
    .use(fileAssets)
    .use(bodyParser.json())
    .use(addStoreToRequestPipeline)
    .use('/api', api)
    .use(respond)