# Read user's vehicle

reads all user's undeleted vehicles that meet filter conditions specified in the query parameters

**URL**: `/auth/vehicle`

**Method** `GET`:

//TODO: MAYBE REMOVE ADMIN FROM THIS 

**Auth required**: `YES (CLIENT, ADMIN)`

**Params constraints**

A valid user's UUID

**Query parameters constraints**

All query parameters are optional:

brandName - filters only vehicle's of given brand

createdAt - sorts vehicles by date of creation

manufacturedAt - sorts vehicles by date of manufacture

If both sorting parameters are given, vehicles are firstly sorted by date of creation and then by date of manufacture

sortOrder - specifies whether the vehicles shoudl be sort in ascending or descending order

# Success Response

**Code**: `200 OK`

**Content example**:

*Request*:
```code
http://localhost:3000/auth/vehicle?manufacturedAt=true&sortOrder=asc
```
*Response*:
```json
{
	"error": null,
	"data": [
		{
			"id": "fc986e3f-f341-417b-b180-a52aef37e049",
			"brandId": "40fc1f92-dbc5-4595-ad7e-a61e677d2843",
			"ownerId": "38b610c6-f744-11ed-b67e-0242ac120002",
			"licensePlate": "KE-222-TT",
			"vinCode": "885765",
			"manufacturedAt": "2018-03-05T16:00:00.000Z",
			"createdAt": "2015-03-05T16:00:00.000Z",
			"scrappedAt": null,
			"deletedAt": null,
			"repairs": []
		},
		{
			"id": "ef0aff69-2657-403f-96e7-4dbb8d5ebb00",
			"brandId": "6f439f5e-f745-11ed-b67e-0242ac120002",
			"ownerId": "38b610c6-f744-11ed-b67e-0242ac120002",
			"licensePlate": "KE-333-KE",
			"vinCode": "111765",
			"manufacturedAt": "2019-03-05T16:00:00.000Z",
			"createdAt": "2016-03-05T16:00:00.000Z",
			"scrappedAt": null,
			"deletedAt": null,
			"repairs": []
		}
	]
}
```
