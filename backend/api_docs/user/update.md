# Update user's information

updates user's personal information - first name, last name or phone number

**URL**: `/auth/user`

**Method** `PATCH`:

**Auth required**: `YES (CLIENT, ADMIN, TECHNICIAN)`

**Body constraints**

one of the fields *first name*, *last name* or *phone number* needs to be specified in the body

## Success Response

**Code**: `200 OK`

**Content example**:

```json
{
	"error": null,
	"data": {
		"lastName": "Slooota",
		"updatedAt": "2023-06-01T13:27:12.705Z"
	}
}
```

## Error Response

**Condition**: Body data is incorrect

**Code**: `400 BAD REQUEST`

**Content**:
```json
{
	"error": "Invalid body",
	"data": null
}
```

