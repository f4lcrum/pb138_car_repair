# Create Fault

User creates a fault

**URL** : `/auth/fault/:id`

**Method** : `POST`

**Auth required** : YES (CLIENT, ADMIN)

**Params constraints**

Parameter needs to be UUID of vehicle

**Data constraints**

```json
{
	"description": "[Any string]"
}
```

## Success Response

**Code** : `201 CREATED`

**Content example** : *request body*
```json
{
	"description": "Auto mi netaha ani na vysokych otackach, strata vykonu.."
}
```

**Content example** : *response body*

```json
{
	"error": null,
	"data": {
		"id": "42721e54-5fc2-4489-8869-5d4cf35238ab",
		"createdAt": "2023-06-01T16:36:11.501Z",
		"description": "Auto mi netaha ani na vysokych otackach, strata vykonu..",
		"mileage": null,
		"name": null,
		"technicianId": null,
		"vehicleId": "fc986e3f-f341-417b-b180-a52aef37e049",
		"resolvedAt": null,
		"workPrice": 0
	}
}
```


## Error Responses

**Condition** : Invalid UUID is passed to function

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
	"error": "Invalid Params",
	"data": null
}
```

**Condition** : Invalid body is sent to endpoint

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
	"error": "Invalid Body",
	"data": null
}
```

**Condition** : User is logged of thus unauthorized

**Code** : `401 UNAUTHORIZED`

**Content** :
```json
{
	"error": "Unauthorized",
	"data": null
}
```

**Condition** : If user tries to create fault of vehicle, which don't belongs to him or user have role of TECHNICIAN

**Code** :  `403 FORBIDDEN`

**Content** :
```json
{
	"error": "Forbidden",
	"data": null
}
```

**Condition** : If user tries to create fault of already deleted vehicle or input UUID of nonexistent vehicle

**Code** : `404 NOT FOUND`

**Content** :
```json
{
	"error": "The vehicle does not exists!",
	"data": null
}
```