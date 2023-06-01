# Read Fault

Read all faults of provided vehicle

**URL** : `/auth/fault/:id`

**Method** : `GET`

**Auth required** : YES (CLIENT, ADMIN)

**Params constraints**

Param need to be UUID of vehicle


## Success Response

**Code** : `200 OK`

**Content example** : *request query:*

```code
localhost:3000/auth/fault/2be2a276-60f5-4583-8dc1-3c2be9aae841
```

**Content example** : *response body :*

```json
{
	"error": null,
	"data": [
		{
			"id": "2653e9cd-ac59-4d85-bd88-4a6a2c5ae315",
			"createdAt": "2012-02-07T12:45:03.000Z",
			"description": "Vymena oleja",
			"mileage": 90000,
			"name": "Oprava c.1",
			"technicianId": "72e4eda6-5bd0-466c-8c56-b5405cd12e2f",
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": "2012-02-25T12:45:03.000Z",
			"workPrice": 30
		},
		{
			"id": "b9ec9015-9edc-4e66-bc96-b1eca94d64ca",
			"createdAt": "2014-03-05T12:45:03.000Z",
			"description": "Vymena turba",
			"mileage": 150000,
			"name": "Oprava c.2",
			"technicianId": null,
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": null,
			"workPrice": 0
		},
		{
			"id": "08cd4aa8-3482-4cc9-a542-806ee641eff4",
			"createdAt": "2012-03-07T12:45:03.000Z",
			"description": "vymena baterie",
			"mileage": 100000,
			"name": "Oprava c.3",
			"technicianId": "72e4eda6-5bd0-466c-8c56-b5405cd12e2f",
			"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
			"resolvedAt": "2012-03-25T12:45:03.000Z",
			"workPrice": 120
		}
	]
}
```

## Error Responses

**Condition** : If Invalid UUID is passed to function

**Code** : `400 BAD REQUEST`

**Content**:

```json
{
	"error": "Invalid params",
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

**Condition** : If user tries to read fault of vehicle, which don't belongs to him or user have role of TECHNICIAN

**Code** :  `403 FORBIDDEN`

**Content** :
```json
{
	"error": "Forbidden",
	"data": null
}
```

**Condition** : If user tries to read fault of already deleted vehicle or input UUID of nonexistent vehicle

**Code** : `404 NOT FOUND`

**Content** :
```json
{
	"error": "The specified vehicle has already been deleted!",
	"data": null
}
```