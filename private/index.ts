import { Server } from './Server'

console.log('Successfully set up logging')

const server = new Server()

console.log('Starting server ...')
server
  .start()
  .then((port) => console.log('Listening on port', port))
  .catch((error) => console.error({ exception: error }, 'Could not start server'))
