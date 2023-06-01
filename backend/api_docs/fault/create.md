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

**Content example**

```json
{
	"data": {
		"id": "8650aee8-297f-4378-8a6c-59e33534be1a",
		"createdAt": "2023-05-30T21:53:21.444Z",
		"description": "Auto mi netaha ani na vysokych otackach, strata vykonu..",
		"mileage": null,
		"name": null,
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

**Content**:

```json
{
	"status": "failure",
	"error": "Invalid params"
}
```

**Condition** : Invalid body is sent to endpoint

**Code** : `400 BAD REQUEST`

**Content**:

```json
{
	"status": "failure",
	"error": "Invalid Body"
}
```

**Condition** : If Prisma or Postgresql endures a fatal error.

**Code**: `500 INTERNAL SERVER ERROR`

**Content** :
```json
{
    "status": "Internal error"
}
```


**Condition** : If user tries to create fault of vehicle, which don't belongs to him.

**Code** :  `403 FORBIDDEN`

**Content** :
```json
{
	"status": "Forbidden",
	"error": "Forbidden"
}
```

**Condition** : If user tries to create fault of already deleted vehicle or input UUID of nonexistent vehicle

**Code** : `404 NOT FOUND`

**Content** :
```json
{
	"status": "Not found",
	"error": "NotFound"
}
```