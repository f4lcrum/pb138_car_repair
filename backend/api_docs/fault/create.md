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
	"description": "[Any string]",
	"mileage": "[Alphanumeric string]",
	"name": "[Any string]"
}
```

## Success Response

**Code** : `201 CREATED`

**Content example** : *request body*
```json
{
	"description": "Auto mi netaha ani na vysokych otackach, strata vykonu..",
	"name": "stock",
	"mileage": "300"
}
```

**Content example** : *response body*

```json
{
	"error": null,
	"data": {
		"id": "b4558b1c-a7c7-400e-8207-cba6fb19ff20",
		"createdAt": "2023-06-03T19:28:20.040Z",
		"description": "Auto mi netaha ani na vysokych otackach, strata vykonu..",
		"mileage": 300,
		"name": "stock",
		"technicianId": null,
		"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
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