# Create vehicle

User creates a new vehicle

**URL** : `/auth/vehicle`

**Method** : `POST`

**Auth required** : `YES (CLIENT)`

**Data constraints**
```json
{
  "brandId": "[valid UUID of a brand model]",
  "licensePlate": "[string consisting of min 4 and max 10 chars]",
  "vinCode": "[string consisting of min 4 mac 17 chars]",
  "manufacturedAt": "[valid date lower than current date]"
}
```
## Success Response

**Code** : `201 CREATED`

**Content example** : *request body*
```json
{
	"brandId" : "875bc2f6-bd26-4f6a-ae29-1c3669021831",
	"licenslate" : "SC-123-II",
	"vinCode" : "339411",
	"manufacturedAt": "2001-03-09T16:00:00.000Z"
}
```

**Content example** : *response body*
```json
{
	"error": null,
	"data": {
		"id": "d72bea9b-40d8-41f4-9e85-a2ee59fe9adb",
		"brandId": "875bc2f6-bd26-4f6a-ae29-1c3669021831",
		"ownerId": "38b610c6-f744-11ed-b67e-0242ac120002",
		"licensePlate": "SC-123-II",
		"vinCode": "339411",
		"manufacturedAt": "2001-03-09T16:00:00.000Z",
		"createdAt": "2023-06-01T10:19:02.073Z",
		"scrappedAt": null,
		"deletedAt": null
	}
}
```
(input and output do not have to correspond with your input and output)
## Error Response

**Condition** : Invalid body is passed

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
	"error": "Invalid body",
	"data": null
}
```

**Condition** : Vehicle with given license plate or vin code is already registered

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
	"error": "Vehicle with given license plate or win code is already registered",
	"data": null
}
```

**Condition** : Brand model with given brand id does not exist

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
	"error": "Brand model does not exist!",
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

**Condition** : Forbidden user access (Forbidden access: TECHNICIAN, ADMIN)

**Code** : `403 FORBIDDEN`

**Content** :
```json
{
	"error": "Forbidden",
	"data": null
}
```