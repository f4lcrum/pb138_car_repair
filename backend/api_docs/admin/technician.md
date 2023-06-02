# Technician

Gets all unverified technicians

**URL**: `/auth/admin/technician`

**Method**: `GET`

**Auth required** : `YES (ADMIN)`

## Success Response

**Code** : `200 OK`

**Content example**
```json
{
	"error": null,
	"data": [
		{
			"firstName": "Jozef",
			"lastName": "Novak",
			"email": "jozino@azet.sk",
			"role": "TECHNICIAN",
			"isVerified": false
		}
	]
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

**Condition** : Forbidden user access (Forbidden access: CLIENT, TECHNICIAN)

**Code** : `403 FORBIDDEN`

**Content** :
```json
{
	"error": "Forbidden",
	"data": null
}
```