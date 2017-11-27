# Stop Sign Service

### Problem
The intent is to design web services that receives road sign observation from multiple vehicles. 
The web service should adhere to the following requirements:

- Receive one road sign observation at a time and store it
- Multiple reports of the same sign and location should only return one entry when requested.
- Ability to provide all the road sings within a search radius given latitude and longitude
- Ability to provide the stored/reported distinct road signs types
- Persistence  storage of the observed road signs [Extension Goal]

### Solution:
##### Back-end
The solution is a web service that uses the REST paradigm and Node.js.

When multiple vehicles report road signs based on their geographic location, we need to validate incoming data  (e.g. valid longitude and latitude) then store it. When a vehicle requests road signs within certain radius the service will search for signs within the radius and return it.

The REST API is designed to have the following endpoints:
- List all signs: GET: /geostore
- Create a sign: POST /geostore
- Find signs within a radius: GET /geostore/find
- Get distinct sign types: GET /geostore/find/distincttype

###### Storage and Query by radius:
The web service's storage is powered by MongoDB. 
We utilize MongoDB's Geospatial Queries, which allows us to index our signs based on longitude and latitude. It also provides us to run a query on our signs based on the longitude and latitude values. Thus find all signs within a radius is powered by the Geospatial query. 

###### Handling multiple reports of signs:
When a vehicle reports a sign, we check if there is already an existing record in the storage (based on longitude and latitude). If the sign exists, we simply update the stored sign with the new type of sign. This allows us to only store one instance of the sign and allows us to keep the road sign record up to date. E.g. If a speed limit sign is updated to have a new speed limit, our web-service would be able to update the sign record. Note: We can enable versioning for the signs to keep track of historical changes, but that's not part of the scope.

###### Query for distinct stored sign types:
The request will use MongoDB's interface to obtain distinct values for the type field in the sign storage collection.

###### Service Layout:
Please refer to the folder structure for the service layout.
The data models, routes and the logic that powers the REST API's are separated out to allow up ease of development and scaling.

##### Front-end:
The front-end is written in HTML and javascript. The user interface is built via Vue.js. The front-end allows you to do the following:
-  Submit a road sign to the web service 
- Query for road signs within a certain radius, given longitude and latitude 
- Query for all distinct types of road sign types.


*Note: You must press the query by radius and fetch distinct type button to retrieve the latest data.

##### Deployment:
The web service is deployed in the Azure Cloud.

##### Live Link: 
You can access the service via http://bmwtestapp.azurewebsites.net/
