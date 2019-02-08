import EventEmitter from 'events'
const io = jest.genMockFromModule('socket.io-client')

const mock_socket = Object.assign({}, EventEmitter.prototype, {foo: `bar`})

io.connect = () => {
	setTimeout(() => {
		mock_socket.emit(`connected`)
	}, 100)

	return mock_socket
}

export default io
