-- Tabla de roles
CREATE TABLE roles (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre_rol NVARCHAR(50) NOT NULL UNIQUE,
    fecha_creacion DATETIME DEFAULT GETDATE() not null,
	fecha_modificacion datetime null,
	fecha_baja datetime null
);

-- Tabla de Vista
Create table vistas(
	id int primary key identity(1,1),
	nombrevista nvarchar(max)null,
	icono nvarchar(max) null,
	ruta nvarchar(max)null,
	fecha_alta datetime default getdate() not null,
	fecha_modificacion datetime null,
	fecha_baja datetime null
);

create table permisos (
	id int primary key identity(1,1),
	accion nvarchar(max) null,
	controlador nvarchar(max) null,
	fecha_alta datetime default getdate() not null,
	fecha_modificacion datetime null,
	fecha_baja datetime null
);

create table rolesvistas(
	id int primary key identity(1,1),
	rol_id int not null,
	vista_id int not null,
	constraint FK_rolesvistas_rol Foreign Key (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
	constraint FK_rolesvistas_vista Foreign Key (vista_id) REFERENCES vistas(id) ON DELETE CASCADE,
	constraint UQ_rolvista Unique (rol_id, vista_id)
);

create table rolespermisos (
	id int primary key identity(1,1),
	rol_id int not null,
	permiso_id int not null,
	constraint FK_rolespermisos_rol Foreign Key (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
	constraint FK_rolespermisos_permiso Foreign Key (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE,
	constraint UQ_rolpermiso Unique (rol_id, permiso_id)
);

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    rol_id INT NOT NULL DEFAULT 2, -- Por defecto Usuario
    fullname NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    telefono NVARCHAR(20),
    fecha_registro DATETIME DEFAULT GETDATE(),
    fecha_baja DATETIME NULL,
    activo BIT DEFAULT 1,
    CONSTRAINT FK_usuarios_tol FOREIGN KEY (rol_id) REFERENCES roles(id),
    CONSTRAINT CK_Email CHECK (email LIKE '%@%.%')
);

-- Tabla de Turnos
CREATE TABLE turnos (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre_turno NVARCHAR(50) NOT NULL UNIQUE,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    activo BIT DEFAULT 1,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    fecha_modificacion DATETIME NULL,
    CONSTRAINT CK_turno_horario CHECK (hora_fin > hora_inicio)
);


-- Tabla del Salón
CREATE TABLE salones (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre_salon NVARCHAR(100) NOT NULL,
    activo BIT DEFAULT 1,
);

-- Tabla de Estados de Reserva
CREATE TABLE estadosreserva (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre_estado NVARCHAR(50) NOT NULL UNIQUE,
);

-- Tabla de Reservas
CREATE TABLE reservas (
    id INT PRIMARY KEY IDENTITY(1,1),
    usuario_id INT NOT NULL,
    salon_id INT NOT NULL,
    turno_id INT NOT NULL,
    fecha_reserva DATE NOT NULL,
    fecha_solicitud DATETIME DEFAULT GETDATE(),
    estado_id INT NOT NULL,
    observaciones NVARCHAR(500),
    CONSTRAINT FK_reservas_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT FK_Reservas_Salon FOREIGN KEY (salon_id) REFERENCES salones(id),
    CONSTRAINT FK_Reservas_Turno FOREIGN KEY (turno_id) REFERENCES turnos(id),
    CONSTRAINT FK_Reservas_Estado FOREIGN KEY (estado_id) REFERENCES estadosreserva(id),
    CONSTRAINT CK_Fecha_Reserva CHECK (fecha_reserva >= CAST(GETDATE() AS DATE))
);

-- =============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =============================================

CREATE INDEX IX_Reservas_Usuario ON reservas(usuario_id);
CREATE INDEX IX_Reservas_Fecha ON Reservas(fecha_reserva);
CREATE INDEX IX_Reservas_Estado ON Reservas(estado_id);
CREATE INDEX IX_Usuarios_Email ON Usuarios(email);
CREATE INDEX IX_Usuarios_Activo ON Usuarios(activo);
CREATE INDEX IX_Usuarios_Rol ON Usuarios(rol_id);

-- =============================================
-- Insercción de Roles
-- =============================================
insert into roles (nombre_rol,fecha_creacion) values ('Admin', getdate())
insert into roles (nombrerol,fecha_creacion) values ('Usuario', getdate())

-- =============================================
-- Insercción de Estados
-- =============================================
INSERT into estadosreserva (nombre_estado) VALUES 
('Cancelada'),
('Confirmada');

-- =============================================
-- Insercción de Turnos
-- =============================================
INSERT into turnos (nombre_Turno,hora_inicio,hora_fin,activo,fecha_creacion) values ('Mañana', '00:08:00', '12:00:59',1,GETDATE());
INSERT into turnos (nombre_turno,hora_inicio,hora_fin,activo,fecha_creacion) values ('Mediodía', '12:01:00', '16:00:59',1,getdate());
INSERT into turnos (nombre_turno,hora_inicio,hora_fin,activo,fecha_creacion) values ('Tarde', '16:01:00', '20:00:59',1,GETDATE());
INSERT into turnos (nombre_turno,hora_inicio,hora_fin,activo,fecha_creacion) values ('Noche', '20:01:00', '23:59:59',1,getdate());
INSERT into turnos (nombre_turno,hora_inicio,hora_fin,activo,fecha_creacion) values ('Matutino', '0:00:00', '07:00:00',1,getdate());


-- =============================================
-- Insercción de Salón
-- =============================================
INSERT INTO salones (nombre_salon, activo) VALUES
('Cubit', 1);

-- =============================================
-- Insercción de Vistas
-- =============================================
INSERT into vistas (nombre_vista,icono,ruta,fecha_alta) values ('home',null,'myreservation',getdate())
INSERT into vistas (nombre_vista,icono,ruta,fecha_alta) values ('lounge',null,'lounge-list',getdate())
INSERT into vistas (nombre_vista,icono,ruta,fecha_alta) values ('turns',null,'turns-list',getdate())
INSERT into vistas (nombre_vista,icono,ruta,fecha_alta) values ('reservations',null,'reservation-list',getdate())

-- =============================================
-- Insercción de Roles_Vistas
-- =============================================
--Insert Roles_Vistas para Admin
INSERT INTO rolesvistas (rol_id, vista_id)
SELECT 1, id
FROM vistas

--Inser Roles_Vista para Usuario
Insert Into rolesvistas(rol_id,vista_id) 
Select 2,id
From vistas where nombre_vista in('home')

-- =============================================
-- Insercción de Permisos
-- =============================================
insert into permisos (accion,controlador,fecha_alta) VALUES ('GetRoleList',	'Roles',GETDATE());
insert into permisos (accion,controlador,fecha_alta) VALUES ('GetRole', 'Roles', GETDATE());
insert into permisos (accion,controlador,fecha_alta) VALUES ('GetRoleViewList','Roles',getdate());
insert into permisos (accion,controlador,fecha_alta) VALUES ('GetRolePermissionList','Roles',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('GetMyReservationList','Reservations',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('GetAvailableTurnos','Reservations',getdate());
insert into permisos (accion,controlador,fecha_alta) VALUES ('CreateReservation','Reservations',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('DeleteReservation','Reservations',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('GetViewList','Vistas',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('GetPermissionList','Permissions', getdate());
insert into permisos (accion,controlador,fecha_alta) values ('GetUserRolId','Users', getdate());
insert into permisos (accion,controlador,fecha_alta) values ('GetSalonList','Salones' ,getdate());
insert into permisos (accion,controlador,fecha_alta) values ('CreateSalon','Salones',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('UpdateSalon','Salones',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('DeleteSalon','Salones',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('RecoverSalon','Salones',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('GetTurnoList','Turnos',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('CreateTurno','Turnos',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('UpdateTurno','Turnos',getdate());
insert into permisos (accion,controlador,fecha_alta) VALUES ('DeleteTurno','Turnos',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('RecoverTurno','Turnos',getdate());
insert into permisos (accion,controlador,fecha_alta) values ('GetReservationsList','Reservations',getdate());

-- =============================================
-- Insercción de Roles_Permisos
-- =============================================
Insert INTO rolespermisos (rol_id, permiso_id)
SELECT 1, id
FROM permisos 

Insert Into rolespermisos(rol_id,permiso_id) 
Select 2,id
From permisos 
where accion in ('GetRoleViewList',
'GetRoleViewList',
'GetMyReservationList',
'GetAvailableTurnos',
'CreateReservation',
'DeleteReservation',
'GetUserRolId',
'GetViewList',
'GetSalonList')
