# Technician

Gets all unverified technicians

**URL**: `/auth/admin/technician`

**Method**: `GET`

**Auth required** : `YES (ADMIN)`

## Success Response

**Code** : `200 OK`

**Content example**
```json
[
	{
		"firstName": "Sherlock Holmes",
		"lastName": "sherlock",
		"email": "jozsio@azet.sk",
		"role": "TECHNICIAN",
		"isVerified": false
	},
	{
		"firstName": "Vladqo",
		"lastName": "sherlock",
		"email": "jozsissadfo@azet.sk",
		"role": "TECHNICIAN",
		"isVerified": false
	},
	{
		"firstName": "Vladqo",
		"lastName": "sherlock",
		"email": "jozsissdo@azet.sk",
		"role": "TECHNICIAN",
		"isVerified": false
	}
]
```

**Condition** : If Prisma or Postgresql endures a fatal error.

**Code**: `500 INTERNAL SERVER ERROR`

**Content** :
```json
{
    "status": "Internal error"
}
```