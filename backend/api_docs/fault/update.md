# Update fault

Updates fault. Fields *workPrice*, *name*, *mileage*, *material* and *resolvedAt* can be updated

**URL** : `/auth/fault/:id`

**Method** : `PATCH`

**Auth required** : `YES (TECHNICIAN, ADMIN)`

# Success Response

**Code** : `200 OK`

**Content example** :
*request body :*
```json
{
	"error": null,
	"data": {
		"resolvedAt": null,
		"name": "Oprava",
		"material": [
			{
				"name": "ziarovka dalsia joj",
				"price": 200
			}
		],
		"technicianId": "72e4eda6-5bd0-466c-8c56-b5405cd12e2f"
	}
}
```
*response body :*
```json
{
	"error": null,
	"data": {
		"resolvedAt": null,
		"name": "Change of autobattery",
		"material": [
			{
				"name": "Autobattery",
				"price": 100
			}
		],
		"technicianId": "72e4eda6-5bd0-466c-8c56-b5405cd12e2f"
	}
}
```

## Error Response


**Condition** : No query parameters were given

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
	"error": "Invalid Query",
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

**Condition** : Technician tries to update fault which is not assigned to him/her or user have role of CLIENT

**Code** : `403 Forbidden`

**Content** :
```json
{
	"error": "Forbidden",
	"data": null
}
```

**Condition** : Technician tries to update fault of vehicle that is already deleted

**Code** : `404 NOT FOUND`

**Content** :
```json
{
	"error": "The specified vehicle has already been deleted!",
	"data": null
}
```