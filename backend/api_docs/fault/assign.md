# Assign

Technician assigns itself to not assigned fault. Function works as unassign as well.
If a technician is assigned to a fault that is assigned to him, he deletes the assignment to the fault and another technician can be assigned.

**URL** : `/auth/fault/assignment/:id`

**Method** : `PATCH`

**Auth required** : YES (TECHNICIAN, ADMIN)

**Params Constraints**

Parameter needs to be UUID of fault



## Success Response

**Code** : `200 OK`

**Content example** : *request query*
```code
localhost:3000/auth/fault/assign/b9ec9015-9edc-4e66-bc96-b1eca94d64ca
```

**Content example** : *response body*
```json
{
	"error": null,
	"data": {
		"id": "b9ec9015-9edc-4e66-bc96-b1eca94d64ca",
		"createdAt": "2014-03-05T12:45:03.000Z",
		"description": "Vymena turba",
		"mileage": 150000,
		"name": "Oprava",
		"technicianId": "72e4eda6-5bd0-466c-8c56-b5405cd12e2f",
		"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
		"resolvedAt": null,
		"workPrice": 0
	}
}
```
If you assign again to any of fault assigned to you, you will set *technicianId* to null

**Content example** : *request query again*
```code
localhost:3000/auth/fault/assign/b9ec9015-9edc-4e66-bc96-b1eca94d64ca
```
```json
{
	"error": null,
	"data": {
		"id": "b9ec9015-9edc-4e66-bc96-b1eca94d64ca",
		"createdAt": "2014-03-05T12:45:03.000Z",
		"description": "Vymena turba",
		"mileage": 150000,
		"name": "Oprava",
		"technicianId": null,
		"vehicleId": "2be2a276-60f5-4583-8dc1-3c2be9aae841",
		"resolvedAt": null,
		"workPrice": 0
	}
}
```


## Error responses



**Condition** : User is logged of thus unauthorized

**Code** : `401 UNAUTHORIZED`

**Content** :
```json
{
	"error": "Unauthorized",
	"data": null
}
```

**Condition** : When technician is not verified

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
	"error": "Forbidden",
	"data": null
}
```

**Condition** : When fault is assigned already to another technician

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
	"error": "Forbidden",
	"data": null
}
```

**Condition** : When user attempting to access this function have CLIENT ROLE

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
	"error": "Forbidden",
	"data": null
}
```


**Condition** : When UUID of fault does not exists

**Code** : `404 NOT FOUND`

**Content** :

```json
{
	"error": "The fault does not exist!",
	"data": null
}
```