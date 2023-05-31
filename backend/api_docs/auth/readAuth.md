# ReadAuth

Gets info about current logged user

**URL**: `/auth/info`

**Method**: `POST`

**Auth required** : YES (ANY ROLE)

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"item": {
		"firstName": "Vladqo",
		"lastName": "sherlock",
		"email": "jozsissadfo@azet.sk",
		"role": "TECHNICIAN"
	},
	"message": "User Vladqo is authorized"
}
```

**Condition** : If Prisma or Postgresql endures a fatal error.

**Code**: `500 INTERNAL SERVER ERROR`

**Content** :
```json
{
    "status": "Internal error"
}
```
