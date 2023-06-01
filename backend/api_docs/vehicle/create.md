# Create vehicle

User creates a new vehicle

**URL**: `/auth/vehicle`

**Method** `POST`:

**Auth required**: `YES (CLIENT)`

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

**Code**: `201 CREATED`

**Content example**:
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

## Error Response

**Condition**: Invalid user id is passed

**Code**: `400 BAD REQUEST`

**Content**: 
```json
{
	"status": "failure",
	"error": "Invalid user id"
}
```

**Condition**: Invalid body is passed

**Code**: `400 BAD REQUEST`

**Content**: 
```json
{
	"status": "failure",
	"error": "Invalid body"
}
```

**Condition**: Vehicle with given license plate or vin code is already registered

**Code**: `400 BAD REQUEST`

**Content**: 
```json
{
	"status": "failure",
	"error": "Vehicle with given license plate or win code is already registered"
}
```

**Condition**: Brand model with given brand id does not exist 

**Code**: `400 BAD REQUEST`

**Content**: 
```json
{
	"status": "failure",
	"error": "Brand model does not exist!"
}
```

**Condition**: Other error - TODO: MAYBE CHANGE TO INTERNAL ERROR 

**Code**: `400 BAD REQUEST`

**Content**: 
```json
{
	"status": "failure",
	"error": "Something went wrong"
}
```