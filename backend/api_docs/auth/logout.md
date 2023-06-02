# Logout

Logs the user out and destroy it's cookie session

**URL** : `/auth/logout`

**Method** : `POST`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"error": null,
	"data": {
		"message": "Logged out"
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

