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
 - 
 - get the presigned url generated form the backend.
 - PUT request using the given presigned endpoint, where image is included.
 - Once the image is uploaded successfully.
 - After that, made the PATCH request where the modified fields and also update the new imageUrl to the database.