## Open Endpoints

*Auth endpoints*:

* [Login](auth/login.md) : `POST /auth/login/`
* [Register](auth/register.md) : `POST /auth/registration`
* [Logout](auth/logout.md) : `POST /auth/logout`
* [readAuth](auth/readAuth.md) : `GET /auth/info`

*Admin endpoints*:

* [verification](admin/verification.md) : `POST /auth/admin/technician/verification`
* [technician](admin/technician.md) : `GET /auth/admin/technician`
* [createBrand](admin/createBrand.md) : `POST /auth/admin/brand/:id/brand-model`
* [createBrandModel](admin/createBrandModel.md) : ``

*Fault endpoints:*

*Vehicle endpoints:*
* [create](vehicle/create.md) : `POST /auth/vehicle`
* [delete](vehicle/delete.md) : `DELETE /auth/vehicle`
* [read all](vehicle/read.md) : `GET /auth/vehicle`
* [read specific](vehicle/readSpecific.md) : `GET /auth/vehicle`

*User endpoints:*

// TODO:
* [update](user/update.md) : `PATCH /auth/`