-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

-- DROP SEQUENCE public.uploads_idupload_seq;

CREATE SEQUENCE public.uploads_idupload_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.users_iduser_seq;

CREATE SEQUENCE public.users_iduser_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	iduser serial4 NOT NULL,
	firstname varchar(100) NOT NULL,
	lastname varchar(200) NOT NULL,
	age int2 NOT NULL,
	image varchar(255) NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT users_pkey PRIMARY KEY (iduser)
);


-- public.uploads definition

-- Drop table

-- DROP TABLE public.uploads;

CREATE TABLE public.uploads (
	idupload serial4 NOT NULL,
	iduser int4 NULL,
	uploadname varchar(255) NOT NULL,
	uploadurl varchar(255) NOT NULL,
	created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT uploads_pkey PRIMARY KEY (idupload),
	CONSTRAINT uploads_iduser_fkey FOREIGN KEY (iduser) REFERENCES public.users(iduser)
);



-- DROP FUNCTION public.uploads_delupload(int4);

CREATE OR REPLACE FUNCTION public.uploads_delupload(_upload_id integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
 	if exists(select idUpload from uploads where idUpload = _upload_id) then 
 		delete from uploads where idUpload = _upload_id;
 		RETURN to_json('{"status": true, "msg": "Upload deleted"}'::json);
 	else
 	 	RETURN to_json('{"status": false, "msg": "Upload not found"}'::json);
 	end if;
	
END;
$function$
;

-- DROP FUNCTION public.uploads_getupload(int4);

CREATE OR REPLACE FUNCTION public.uploads_getupload(_uploadid integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
  RETURN coalesce((select array_to_json(array_agg(tabla)) from (select up.idUpload, us.idUser, CONCAT(us.firstName, ' ', us.lastName) as userName, up.uploadName, up.uploadUrl from uploads up inner join users us on us.idUser = up.idUser where up.idUpload = _uploadId) as tabla), '[]'::json);
END;
$function$
;

-- DROP FUNCTION public.uploads_getuploads();

CREATE OR REPLACE FUNCTION public.uploads_getuploads()
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
  RETURN coalesce((select array_to_json(array_agg(tabla)) from (select up.idUpload, us.idUser, CONCAT(us.firstName, ' ', us.lastName) as userName, up.uploadName, up.uploadUrl from uploads up inner join users us on us.idUser = up.idUser) as tabla), '[]'::json);
END;
$function$
;

-- DROP FUNCTION public.uploads_getuploadsuser(int4);

CREATE OR REPLACE FUNCTION public.uploads_getuploadsuser(_userid integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
  RETURN coalesce((select array_to_json(array_agg(tabla)) from (select up.idUpload, us.idUser, CONCAT(us.firstName, ' ', us.lastName) as userName, up.uploadName, up.uploadUrl from uploads up inner join users us on us.idUser = up.idUser where us.idUser = _userId order by up.idUpload) as tabla), '[]'::json);
END;
$function$
;

-- DROP FUNCTION public.uploads_insupload(int4, varchar, varchar);

CREATE OR REPLACE FUNCTION public.uploads_insupload(_user_id integer, _upload_name character varying, _upload_url character varying)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
 
	if not exists(select idUser from users where idUser = _user_id) then 
 		RETURN to_json('{"status": false, "msg": "Invalid user"}'::json);
 	end if;
	
 	insert into uploads(idUser, uploadName, uploadUrl) values(_user_id,_upload_name,_upload_url);
 	RETURN to_json('{"status": true, "msg": "Upload Created"}'::json);
	
END;
$function$
;

-- DROP FUNCTION public.uploads_updupload(int4, varchar, varchar);

CREATE OR REPLACE FUNCTION public.uploads_updupload(_upload_id integer, _upload_name character varying, _upload_url character varying)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
 	if not exists(select idUpload from uploads where idUpload = _upload_id ) then 
 		RETURN to_json('{"status": false, "msg": "Upload not found"}'::json);
 	end if;
  
 	update uploads set uploadName = _upload_name, uploadUrl = _upload_url, updated_at = current_timestamp where idUpload = _upload_id;
 	RETURN to_json('{"status": true, "msg": "Upload Updated"}'::json);
	
END;
$function$
;

-- DROP FUNCTION public.user_profilephoto(int4, varchar);

CREATE OR REPLACE FUNCTION public.user_profilephoto(_userid integer, _upload_url character varying)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
declare 
begin 
	if not exists(select * from users where idUser = _userId ) then 
 		RETURN to_json('{"status": false, "msg": "User not found"}'::json);
 	end if;
 
 	update users set image  = _upload_url, updated_at = current_timestamp where idUser = _userId;
 	RETURN to_json('{"status": true, "msg": "Profile photo added"}'::json);
	
end;
$function$
;

-- DROP FUNCTION public.users_deluser(int4);

CREATE OR REPLACE FUNCTION public.users_deluser(_user_id integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
 	if exists(select * from users where idUser = _user_id) then 
 		delete from users where idUser = _user_id;
 		RETURN to_json('{"status": true, "msg": "User deleted"}'::json);
 	else
 	 	RETURN to_json('{"status": false, "msg": "User not found"}'::json);
 	end if;
	
END;
$function$
;

-- DROP FUNCTION public.users_getuser_v2(int4);

CREATE OR REPLACE FUNCTION public.users_getuser_v2(_userid integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
  RETURN coalesce((select array_to_json(array_agg(tabla)) from (select idUser, firstName, lastName, age, image from users where idUser = _userId) as tabla), '[]'::json);
END;
$function$
;

-- DROP FUNCTION public.users_getusers();

CREATE OR REPLACE FUNCTION public.users_getusers()
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
 RETURN COALESCE((SELECT json_agg(row_to_json(users.*)) FROM users), '[]'::JSON);
END;
$function$
;

-- DROP FUNCTION public.users_getusers_v2();

CREATE OR REPLACE FUNCTION public.users_getusers_v2()
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
  RETURN coalesce((select array_to_json(array_agg(tabla)) from (select idUser, firstName, lastName, age, image from users order by idUser) as tabla), '[]'::json);
END;
$function$
;

-- DROP FUNCTION public.users_insuser(varchar, varchar, int4);

CREATE OR REPLACE FUNCTION public.users_insuser(_firstname character varying, _lastname character varying, _age integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
 	if exists(select * from users where firstName = _firstName AND lastName = _lastName) then 
 		RETURN to_json('{"status": false, "msg": "There is already a user with that Name"}'::json);
 	end if;
 
 	insert into users(firstName, lastName, age) values (_firstName, _lastName, _age);
 	RETURN to_json('{"status": true, "msg": "User Created"}'::json);
	
END;
$function$
;

-- DROP FUNCTION public.users_upduser(int4, varchar, varchar, int4);

CREATE OR REPLACE FUNCTION public.users_upduser(_userid integer, _firstname character varying, _lastname character varying, _age integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
 	if not exists(select * from users where idUser = _userId ) then 
 		RETURN to_json('{"status": false, "msg": "User not found"}'::json);
 	end if;
 
 	if exists(select * from users where firstName = _firstName AND lastName = _lastName and idUser != _userId) then 
 		RETURN to_json('{"status": false, "msg": "There is already a user with that Name"}'::json);
 	end if;
 
 	update users set firstname  = _firstName, lastname  = _lastName, age = _age, updated_at = current_timestamp where idUser = _userId;
 	RETURN to_json('{"status": true, "msg": "User Updated"}'::json);
	
END;
$function$
;