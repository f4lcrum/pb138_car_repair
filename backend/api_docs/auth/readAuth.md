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
			"firstName": "Andrej",
			"lastName": "DJ",
			"email": "andrej@admin.com",
			"role": "ADMIN"
		},
		"message": "User Andrej is authorized"
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
