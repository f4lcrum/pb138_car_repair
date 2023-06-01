# Delete vehicle

Deletes a specific vehicle

**URL**: `/auth/vehicle/:id`

**Method** `DELETE`:

//TODO: MAYBE REMOVE ADMIN FROM THIS, SINCE HE WONT HAVE ANY VEHICLES
AND WE ONLY DELETE VEHICLES OF USER WITH CORRESPONDING ID IN SESSION 

**Auth required**: `YES (CLIENT, ADMIN)`

**Params constraints**
A valid UUID of user's vehicle

## Success Response

**Code**: `200 OK`

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
		"deletedAt": "2023-06-01T10:53:23.467Z"
	}
}
```

## Error Response

**Condition**: Vehicle does not exist

**Code**: `400 BAD REQUEST`

**Content**: 
```json
{
	"status": "failure",
	"error": "The vehicle does not exists!"
}
```

**Condition**: Vehicle was already deleted

**Code**: `400 BAD REQUEST`

**Content**: 
```json
{
	"status": "failure",
	"error": "The specified vehicle has already been deleted!"
}
```

**Condition**: Vehicle is not user's vehicle

**Code**: `400 BAD REQUEST`

**Content**: 
```json
{
	"status": "failure",
	"error": "Ownership vehicle error"
}
```