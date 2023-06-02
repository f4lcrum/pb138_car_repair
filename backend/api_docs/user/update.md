# Update user's information

updates user's personal information - first name, last name or phone number. Return only updated info.

**URL** : `/auth/user`

**Method** : `PATCH`

**Auth required** : `YES (CLIENT, ADMIN, TECHNICIAN)`

**Body constraints**

one of the fields *first name*, *last name* or *phone number* needs to be specified in the body

## Success Response

**Code** : `200 OK`

**Content example** :
*request body:*
```json
{
	"lastName" : "Vostinar",
	"phoneNumber" : "+420123456789"
}
```
*response body:*
```json
{
	"error": null,
	"data": {
		"lastName": "Vostinar",
		"phoneNumber": "+420123456789",
		"updatedAt": "2023-06-01T19:22:18.642Z"
	}
}
```
(input and output do not have to correspond with your input and output)
## Error Response

**Condition** : Body data is incorrect

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
	"error": "Invalid body",
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
