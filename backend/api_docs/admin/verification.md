# Verification

Verify given technician user and gives him authorization to resolve faults.

**URL**: `/auth/admin/technician/verification`

**Method**: `POST`

**Auth required** : YES (ADMIN)

**Query requirements**

email: a valid email of existing unverified

**Query example**

localhost:3000/auth/admin/technician/verification/?email=jozino@azet.sk

## Success Response

**Code** : `201 CREATED`

**Content Example**

```json
{
	"error": null,
	"data": {
		"item": {
			"id": "72e4eda6-5bd0-466c-8c56-b5405cd12e2f",
			"isVerified": true
		},
		"message": "User 72e4eda6-5bd0-466c-8c56-b5405cd12e2f is verified"
	}
}
```


## Error Response

**Condition** : Invalid format of email.

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
	"status": "failure",
	"error": "Invalid Query"
}
```

**Condition** : Technician already verified.

**Code** :  `400 BAD REQUEST`

**Content** :
```json
{
	"status": "failure",
	"error": "Technician is already verified!"
}
```

**Condition** : Mail is valid however user belonging to mail is not technician.

**Code** :  `400 BAD REQUEST`

**Content** :
```json
{
	"status": "failure",
	"error": "User is not a technician!"
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

**Condition** : If email of user does not exists.

**Code**: `404 NOT FOUND`

**Content** :
```json
{
	"status": "Not found",
	"error": "NotFound"
}
```
