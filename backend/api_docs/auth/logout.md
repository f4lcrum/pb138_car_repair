# Logout

Logs the user out and destroy it's cookie session

**URL**: `/auth/logout`

**Method**: `POST`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "message": "Logged out"
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