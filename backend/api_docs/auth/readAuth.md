# ReadAuth

Gets info about current logged user

**URL** : `/auth/info`

**Method** : `GET`

**Auth required** : YES (ANY ROLE)

## Success Response

**Code** : `200 OK`

**Content example** : *response body :*

```json
{
	"error": null,
	"data": {
		"item": {
			"id": "72e4eda6-5bd0-466c-8c56-b5405cd12e2f",
			"firstName": "Jozef",
			"lastName": "Novak",
			"email": "jozino@azet.sk",
			"role": "TECHNICIAN",
			"phoneNumber": "+421123456789"
		},
		"message": "User Jozef is authorized"
	}
}
```

## Error Response

**Condition** : User is logged of thus unauthorized

**Code** : `401 UNAUTHORIZED`

**Content** :
```json
{
	"error": "Unauthorized",
	"data": null
}
```
