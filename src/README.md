 - routing will happen in root level

 Body - component
   - NavBar 
   - Route=/ => chatPeople
   - Route=/login => Login
   - Route=/signup => /SignUp

Redux 
  - store
  - provider for access the store any whery in the component (centralized)
  - slice -> state, reducer, action

**s3**

 - get the presigned url generated form the backend.
 - PUT request using the given presigned endpoint, where image is included.
 - Once the image is uploaded successfully.
 - After that, made the PATCH request where the modified fields and also update the new imageUrl to the database.

### WebSocket

- **Library Used**: Implemented the `socket.io` library.
- **Socket Connection**: 
  - When the chat component is loaded, a WebSocket connection is established.
  - The `joinChat` event is emitted to create a **room** for the chat participants.
- **Message Sending**:
  - When a message is sent, the `sendMessage` event is emitted.
  - The **room** ensures that the message is broadcasted to all participants connected to the room.

### Retrive messages from DB

- Once the component is loaded it make the **API** call search for the whether these two person have the past chat or not if exists it return the chats fo two persons, ortherwise don't have the chat then they gives the empty array


