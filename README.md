# TalkersAPI

An application was built in Node-JS to register speakers in a .Json file in which it will be possible to register, view, search, edit and delete information.

Developed an API of a CRUD (Create, Read, Update and Delete) of speakers (talkers) and;
    1. Developed some endpoints that will read and write to a file using the fs module.
    
## With Docker
Run the node service with the command docker-compose up -d.
    • This service will initialize a container called talker_manager.
    • From here you can run the container via CLI or open it in VS Code.
Use the command docker exec -it talker_manager bash.
    • It will give you access to the interactive terminal of the container created by compose, which is running in the background.
Install dependencies [If any] with npm install

## Without Docker
Install dependencies with npm install

### Once running on your machine, use the software of your preference (postman, insonia, thuderbolt…) to interact with it’s endpoints.

## Endpoint GET /talker

The request returns status 200 and an array with all registered speakers. Example:

[ { "name": "Henrique Albuquerque", "age": 62, "id": 1, "talk": { "watchedAt": "23/10/2020", "rate": 5 } }, { "name": "Heloísa Albuquerque", "age": 67, "id": 2, "talk": { "watchedAt": "23/10/2020", "rate": 5 } }, { "name": "Ricardo Xavier Filho", "age": 33, "id": 3, "talk": { "watchedAt": "23/10/2020", "rate": 5 } }, { "name": "Marcos Costa", "age": 24, "id": 4, "talk": { "watchedAt": "23/10/2020", "rate": 5 } } ]

If there is no registered speaker, the request must return status 200 and an empty array.

## Endpoint GET /talker/:id

The request returns status 200 and a speaker based on the route id. For example, when making a request /talker/1, the response should be:

{ "name": "Henrique Albuquerque", "age": 62, "id": 1, "talk": { "watchedAt": "2020/10/23", "rate": 5 } }

If a speaker is not found based on the route id, the request must return the status 404 with the following body:
{ "message": "Speaker not found" }

## Endpoint POST /login

The endpoint must receive the fields email and password in the body of the request and return a random 16-character token. This token will be used by requests for the next project requirements.
The request body must have the following format:

{ "email": "email@email.com", "password": "123456" }

## Validations 

The fields received by the request must be validated and, if the values ​​are invalid, the endpoint must return the status code 400 with the respective error message instead of the token.
The validation rules are:

    • the email field is mandatory;
    • the email field must have a valid email address;
    • the password field is mandatory;
    • the password field must be at least 6 characters long.

If the field email is not passed or is empty, return a status code 400 with the following body:
    
{
 "message": "O campo \"email\" é obrigatório"
}

If the email passed is not valid, return a status code 400 with the following body:

{
 "message": "O \"email\" deve ter o formato \"email@email.com\""
}

If the password field is not informed or is empty, return a status code 400 with the following body:

{
  "message": "O campo \"password\" é obrigatório"
}

If the password does not have at least 6 characters, return a status code 400 with the following body:

{
  "message": "O \"password\" deve ter pelo menos 6 caracteres"
}

## Endpoint POST /talker

The endpoint is able to add a new speaker to its file; The request body should have the following format:

      {
        "name": "Danielle Santos",
        "age": 56,
        "talk": {
          "watchedAt": "22/10/2019",
          "rate": 5
        }
      }

The request must have the authentication token in the headers, in the authorization field.
If the token is not found, return a status code 401, with the following body:

          {
            "message": "Token não encontrado"
          }


If the token is invalid, return a status code 401, with the following body:

          {
            "message": "Token inválido"
          }
          
The name field must be at least 3 characters long. It is mandatory.
If the field is not passed or is empty, return a status code of 400, with the following body:

          {
            "message": "O campo \"name\" é obrigatório"
          }
          
If the name does not have at least 3 characters, return a status code 400, with the following body:

          {
            "message": "O \"name\" deve ter pelo menos 3 caracteres"
          }
       
age field must be an integer and only people of legal age (at least 18 years old) can be registered. It is mandatory.
If the field is not passed or is empty, return a status code of 400, with the following body:

          {
            "message": "O campo \"age\" é obrigatório"
          }

If the speaker is not at least 18 years old, return status 400, with the following body:

          {
            "message": "A pessoa palestrante deve ser maior de idade"
          }
          
The talk field must be an object with the watchedAt and rate keys:
The talk field is required.
If the field is not informed, return status 400, with the following body:

              {
                "message": "O campo \"talk\" é obrigatório"
              }
       
The watchedAt key is mandatory.
If the key is not informed or is empty, return status 400, with the following body:

              {
                "message": "O campo \"watchedAt\" é obrigatório"
              }
              
The watched At key must be a date in the format dd/mm/yyyy.
If the date does not respect the format dd/mm/yyyy return status 400, with the following body:

              {
                "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
              }
              

The rate field is mandatory.
If the field is not informed or is empty, return status 400, with the following body:

              {
                "message": "O campo \"rate\" é obrigatório"
              }
              
The rate key must be an integer from 1 to 5.
If the grade is not an integer from 1 to 5, return status 400, with the following body:

              {
                "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
              }
              
If everything is ok, return the status 201 and the person registered.
The endpoint must return the status 201 and the speaker who was registered, as follows:

      {
        "id": 1,
        "name": "Danielle Santos",
        "age": 56,
        "talk": {
          "watchedAt": "22/10/2019",
          "rate": 5
        }
      }
      
## Endpoint PUT /talker/:id

The endpoint must be able to edit a speaker based on the route id, without changing the registered id.

The request body should have the following format:

      {
        "name": "Danielle Santos",
        "age": 56,
        "talk": {
          "watchedAt": "22/10/2019",
          "rate": 5
        }
      }
   

If everything is ok, return the status 200 and the edited person.
The endpoint must return the status 200 and the speaker that was edited, as follows:

      {
        "id": 1,
        "name": "Danielle Santos",
        "age": 56,
        "talk": {
          "watchedAt": "22/10/2019",
          "rate": 4
        }
      }
      
 ## Endpoint DELETE /talker/:id
 
The request must have the authentication token in the headers, in the authorization field.
If the token is not found, return a status code 401, with the following body:

          {
            "message": "Token não encontrado"
          }
         
 
If the token is invalid, return a status code 401, with the following body:

          {
            "message": "Token inválido"
          }
          

The endpoint must delete a speaking person based on the route id. Should return status 204, with no content in the response.


  
