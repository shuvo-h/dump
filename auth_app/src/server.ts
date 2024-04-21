import mongoose, { ConnectOptions } from 'mongoose'
import { app } from './app'
import { Server } from 'http'
import { envInfo } from './app/config/config'

let server: Server

async function main() {
  try {
    // connect DB
    if (envInfo.db.DB_URL && envInfo.PORT) {
      await mongoose.connect(envInfo.db.DB_URL, {
        dbName: envInfo.db.DB_NAME,
      } as ConnectOptions)
      // listen server
      server = app.listen(envInfo.PORT, () => {
        console.log(`app listening on port ${envInfo.PORT}`)
      })
    } else {
      console.error('DB url not found')
    }
  } catch (error) {
    console.log(error)
  }
}

main()

// listen event for unhandle exception error or unhandle rejection error, then shutdown the server
// handle unhandleRejection error
process.on('unhandledRejection', () => {
  // console.log(`😈 UnhandleRejection is detected, shutting down....`);
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})
// handle uncaughtException error
process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected, shutting down....`)
  process.exit(1)
})
