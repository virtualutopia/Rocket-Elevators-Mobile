# W13 - Mobile Application

# Rocket-Elevators-Mobile

This Applicaiton is developed using React Native platform and is functional on both Android and ios systems.
With EXPO Client one may run the app on both OSs.
Application link: https://expo.io/@anoosheh/Rocket-Elevators-Mobile
to login you need one of the registered Emails. you may use this email to enter the app:
             admin@hotmail.com
you may get a list of all employee from the API given in next section.
# REST API 
some new features are added to the API such as retriving list of employees and changing status of a single elevator to ACTIVE.
REST API is on Microsoft AZURE server.
GET list of all elevators: https://restapirocketelevator.azurewebsites.net/api/elevator
GET details of a single elevator by its ID: https://restapirocketelevator.azurewebsites.net/api/elevator/{id}
GET list of Non-Opretational elevators: https://restapirocketelevator.azurewebsites.net/api/elevatorNonoperational
GET lsit of employees: https://restapirocketelevator.azurewebsites.net/api/employee

PUT - change status of a single elevtor to ACTIVE using its ID: 
   https://restapirocketelevator.azurewebsites.net/api/elevatorNonoperational/{id}

here is the GitHub URL for the API: https://github.com/virtualutopia/Rocket-Elevator-Foundation-RESTapi

