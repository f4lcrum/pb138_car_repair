# Read (search) specific vehicle

reads user's undeleted vehicle that meets filter conditions specified in the query parameters

**URL**: `/auth/vehicle/search`

**Method** `GET`:

**Auth required**: `YES (CLIENT, ADMIN)`

**Params constraints**

A valid user's UUID

**Query parameters constraints**

At least one query parameter has to be specified:

licensePlate : valid license plate of user's vehicle

vinCode : valid vin code of user's vehicle

# Success Response

**Code** : `200 OK`

**Content example** :
*Request* :
```code
http://localhost:3000/auth/vehicle/search?licensePlate=KE-333-KE
```
*Response* :
```json
{
	"error": null,
	"data": {
		"id": "ef0aff69-2657-403f-96e7-4dbb8d5ebb00",
		"brandId": "6f439f5e-f745-11ed-b67e-0242ac120002",
		"ownerId": "38b610c6-f744-11ed-b67e-0242ac120002",
		"licensePlate": "KE-333-KE",
		"vinCode": "111765",
		"manufacturedAt": "2019-03-05T16:00:00.000Z",
		"createdAt": "2016-03-05T16:00:00.000Z",
		"scrappedAt": null,
		"deletedAt": null
	}
}
```
(input and output do not have to correspond with your input and output)

## Error Response


**Condition**: No query parameters were given

**Code**: `400 BAD REQUEST`

**Content**:
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

**Condition** : Forbidden user access (Forbidden access: TECHNICIAN)

**Code** : `403 FORBIDDEN`

**Content** :
```json
{
	"error": "Forbidden",
	"data": null
}
```

**Condition**: No vehicle meets the conditions

**Code**: `404 NOT FOUND`

**Content**:
```json
{
	"error": "The specified vehicle does not exist!",
	"data": null
}
```

