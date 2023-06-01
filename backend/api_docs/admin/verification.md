# Verification

Verify given technician user and gives him authorization to resolve faults.

**URL**: `/auth/admin/technician/verification/:id`

**Method**: `POST`

**Auth required** : YES (ADMIN)

**Query requirements**

email: a valid email of existing unverified


## Success Response

**Code** : `201 CREATED`

**Query example** *request query :*

```code
localhost:3000/auth/admin/technician/verification/72e4eda6-5bd0-466c-8c56-b5405cd12e2f
```

**Content Example** *response body : *

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

**Condition** : Invalid format of UUID.

**Code** : `400 BAD REQUEST`

**Content** :
```json
{
	"error": "Invalid Params",
	"data": null
}
```

**Condition** : Technician already verified.

**Code** :  `400 BAD REQUEST`

**Content** :
```json
{
	"error": "Technician is already verified!",
	"data": null
}
```

**Condition** : UUID is valid however user belonging to UUID is not technician.

**Code** :  `400 BAD REQUEST`

**Content** :
```json
{
	"error": "User is not a technician!",
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

**Condition** : Forbidden user access (Forbidden access: CLIENT, TECHNICIAN)

**Code** : `403 FORBIDDEN`

**Content** :
```json
{
	"error": "Forbidden",
	"data": null
}
```

**Condition** : If UUID of user does not exists.

**Code**: `404 NOT FOUND`

**Content** :
```json
{
	"error": "User with input email does not exists!",
	"data": null
}
```