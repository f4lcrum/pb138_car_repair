# Update fault

Updates fault. Fields *workPrice*, *name*, *mileage*, *material* and *resolvedAt* can be updated

**URL**: `/auth/fault/:id`

**Method** `PATCH`:

**Auth required**: `YES (TECHNICIAN, ADMIN)`

//TODO: should id be specified in params constraints?


# Success Response

**Code**: `200 OK`

**Content example**:
*request body:*
```json
{
	"name": "Change of autobattery",
	"material": [
		{
			"description": "autobattery AAA 427X",
  		"name": "Autobattery",
  		"price": "100"
		}
	]
}
```
*response:*
```json
{
	"error": null,
	"data": {
		"resolvedAt": null,
		"name": "Change of autobattery",
		"material": [
			{
				"description": "autobattery AAA 427X",
				"name": "Autobattery",
				"price": 100
			}
		],
		"technicianId": "72e4eda6-5bd0-466c-8c56-b5405cd12e2f"
	}
}
```

## Error Response

**Condition**: Technician tries to update fault which is not assigned to him/her

**Code**: `403 Forbidden`

**Content**: 
```json
{
	"error": "Forbidden",
	"data": null
}
```

**Condition**: No query parameters were given

**Code**: `400 BAD REQUEST`

**Content**: 
```json
{
	"error": "Invalid Query",
	"data": null
}
```