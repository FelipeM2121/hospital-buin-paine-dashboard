import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.mjs", import.meta.url).href;
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const RAW = [{"item":"HSLB13000","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio simple 120x70 cm","proveedor":"MELMAN SPA","cantidad":3,"piso":7,"recinto":"SALA VOLUNTARIADO","fechaInstalacion":"03/08/2026"},{"item":"HSLB13009","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":2,"piso":3,"recinto":"OFICINA SUBDIRECTOR MÉDICO","fechaInstalacion":"17/07/2026"},{"item":"HSLB13018","zona":"NC-Áreas Administrativas en General","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":3,"piso":3,"recinto":"OFICINA COMUNICACIONES","fechaInstalacion":"17/07/2026"},{"item":"HSLB13027","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"OFICINA SECRETARÍA","fechaInstalacion":"17/07/2026"},{"item":"HSLB13037","zona":"CM-Salas de Procedimientos no Invasivos","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio de Consultas","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA PROCEDIMIENTOS GINECO-OBSTÉTRICO","fechaInstalacion":"01/07/2026"},{"item":"HSLB13049","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio de Consultas","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"BOX CIRUGÍA ADULTOS","fechaInstalacion":"01/07/2026"},{"item":"HSLB13064","zona":"CM-Salas de Procedimientos no Invasivos","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio simple 120x70 cm","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA DE PROCEDIMIENTOS OFTALMO COMPLEJO","fechaInstalacion":"01/07/2026"},{"item":"HSLB13081","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"SALA MULTIPROPÓSITO","fechaInstalacion":"01/07/2026"},{"item":"HSLB13090","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio de Consultas","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"BOX ENFERMERA SALUD MENTAL","fechaInstalacion":"01/07/2026"},{"item":"HSLB13100","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio de Consultas","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"BOX ENFERMERA INFANTO JUVENIL","fechaInstalacion":"01/07/2026"},{"item":"HSLB13109","zona":"CN-Salas y Habitaciones de Hospitalización","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio de Consultas","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"SALA DE ATENCIÓN","fechaInstalacion":"01/07/2026"},{"item":"HSLB13119","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio de Consultas","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"BOX ATENCIÓN ","fechaInstalacion":"01/07/2026"},{"item":"HSLB13128","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":1,"piso":6,"recinto":"OFICINA JEFE CR ATENCIÓN CERRADA","fechaInstalacion":"03/08/2026"},{"item":"HSLB13138","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":1,"piso":5,"recinto":"OFICINA JEFE MQ INFANTIL","fechaInstalacion":"17/07/2026"},{"item":"HSLB15216","zona":"CA-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Banca Madera C","proveedor":"MELMAN SPA","cantidad":1,"piso":4,"recinto":"VESTUARIO FUNCIONARIOS","fechaInstalacion":"17/07/2026"},{"item":"HSLB13155","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"OF. JEFE CR AT. URGENCIA","fechaInstalacion":"01/07/2026"},{"item":"HSLB13165","zona":"CN-Laboratorios","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio simple 120x70 cm","proveedor":"MELMAN SPA","cantidad":6,"piso":2,"recinto":"MÓDULO DE TRABAJO TECNÓLOGO MÉDICO","fechaInstalacion":"01/07/2026"},{"item":"HSLB13174","zona":"CN-Imagenología","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio simple 120x70 cm","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"SALA ECOTOMOGRAFO GINECO-OBSTETRICO (EQUIPO/VESTIDOR)","fechaInstalacion":"01/07/2026"},{"item":"HSLB13181","zona":"CA-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"OFICINA COORDINADOR ESTERILIZACIÓN","fechaInstalacion":"17/07/2026"},{"item":"HSLB13191","zona":"CM-Áreas de Rehabilitación","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio de Consultas","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"BOX INDIFERENCIADO (FONOAUDIO Y TERAPIA OCU)(1)","fechaInstalacion":"01/07/2026"},{"item":"HSLB13201","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"OFICINA SUPERVISORA","fechaInstalacion":"01/07/2026"},{"item":"HSLB13210","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"OFICINA JEFE TIC","fechaInstalacion":"01/07/2026"},{"item":"HSLB13219","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio simple 120x70 cm","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"OFICINA COORDINADOR ROPERÍA","fechaInstalacion":"01/07/2026"},{"item":"HSLB13231","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"OF. JEFE ABASTECIMIENTO","fechaInstalacion":"01/07/2026"},{"item":"HSLB13241","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio simple 120x70 cm","proveedor":"MELMAN SPA","cantidad":4,"piso":2,"recinto":"MÓDULO DE TRABAJO EJECUTIVO DE COMPRA","fechaInstalacion":"01/07/2026"},{"item":"HSLB13249","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"OFICINA COORDINADOR CENTRAL","fechaInstalacion":"01/07/2026"},{"item":"HSLB13258","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio de Consultas","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"BOX DE ATENCIÓN","fechaInstalacion":"01/07/2026"},{"item":"HSLB13267","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio simple 120x70 cm","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"SALA DE CAPACITACIÓN MASIVA","fechaInstalacion":"17/07/2026"},{"item":"HSLB13276","zona":"NC-Áreas Administrativas en General","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"MÓDULO DE TRABAJO ADMINISTRATIVOS MANTENCIÓN DE AGENDA","fechaInstalacion":"01/07/2026"},{"item":"HSLB13285","zona":"CA-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio en L Administrativo","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"SALA DE ENTREVISTAS","fechaInstalacion":"17/07/2026"},{"item":"HSLB13295","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Lateral","proveedor":"MELMAN SPA","cantidad":1,"piso":5,"recinto":"SALA DE ESTAR FAMILIARES Y ENTREVISTAS","fechaInstalacion":"17/07/2026"},{"item":"HSLB13304","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Párvulo Tipo I","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"OFICINA ASISTENTE SOCIAL PSICOPEDAGOGÍA","fechaInstalacion":"01/07/2026"},{"item":"HSLB13313","zona":"CN-Urgencia","servicio":"Urgencia","familia":"Mesa","nombre":"Mesa Plegable","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"BODEGA CATÁSTROFES ( Mesa Plegable Rectangular)","fechaInstalacion":"01/07/2026"},{"item":"HSLB13322","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Reuniones Tipo I","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"OFICINA SUBDIRECTOR MÉDICO","fechaInstalacion":"17/07/2026"},{"item":"HSLB15221","zona":"CA-Áreas de Tratamiento Especial","servicio":"Diálisis","familia":"Mesa","nombre":"Mesa Tipo Casino","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"KITCHENETTE","fechaInstalacion":"01/07/2026"},{"item":"HSLB13338","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Reuniones Tipo I","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA ESTIMULACIÓN COGNITIVA","fechaInstalacion":"01/07/2026"},{"item":"HSLB13347","zona":"CA-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Reuniones Tipo I","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"SALA DE ESTAR FAMILIARES","fechaInstalacion":"17/07/2026"},{"item":"HSLB13356","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Reuniones Plegable","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"SALA MULTIUSO","fechaInstalacion":"01/07/2026"},{"item":"HSLB13365","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Reuniones Tipo I","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA MULTIUSO (labores administrativas)","fechaInstalacion":"01/07/2026"},{"item":"HSLB13374","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Reuniones Tipo II","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA DE REUNIONES","fechaInstalacion":"01/07/2026"},{"item":"HSLB13383","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Reuniones Tipo II","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA DE REUNIONES C/KITCHENETTE","fechaInstalacion":"01/07/2026"},{"item":"HSLB13392","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Reuniones Tipo III","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"SALA DE CAPACITACIÓN PERSONALIZADA","fechaInstalacion":"17/07/2026"},{"item":"HSLB13400","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Tipo Casino Circular","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"SALA DE ESTAR /COMEDOR","fechaInstalacion":"01/07/2026"},{"item":"HSLB13409","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Tipo Casino Circular","proveedor":"MELMAN SPA","cantidad":1,"piso":5,"recinto":"ESTAR PERSONAL C/ KITCHENETTE","fechaInstalacion":"17/07/2026"},{"item":"HSLB13417","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Tipo Casino","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"ESTAR PERSONAL C/ KITCHENETTE","fechaInstalacion":"01/07/2026"},{"item":"HSLB13424","zona":"CA-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Tipo Casino Circular","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"ESTAR PERSONAL C/ KITCHENETTE","fechaInstalacion":"17/07/2026"},{"item":"HSLB13436","zona":"NC-SAMU","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Tipo Casino Circular","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"ESTAR PERSONAL","fechaInstalacion":"01/07/2026"},{"item":"HSLB13450","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Mobiliario","nombre":"Caja Fuerte Tipo I","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"MÓDULO DE TRABAJO SOME RECAUDACIÓN","fechaInstalacion":"01/07/2026"},{"item":"HSLB13459","zona":"CM-Sala Cuna y Jardín Infantil","servicio":"Administración y apoyo general","familia":"Mobiliario","nombre":"Cama Apilable","proveedor":"MELMAN SPA","cantidad":14,"piso":1,"recinto":"NIVEL MEDIO MAYOR","fechaInstalacion":"01/07/2026"},{"item":"HSLB13468","zona":"CN-Urgencia","servicio":"Urgencia","familia":"Mobiliario","nombre":"Escalera Tijera","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"BODEGA DE INSUMOS CLÍNICOS","fechaInstalacion":"01/07/2026"},{"item":"HSLB13481","zona":"NC-Casino","servicio":"Comedor para funcionarios y público","familia":"Otro","nombre":"Carro Bandejero","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"E. CARROS SUCIOS","fechaInstalacion":"01/07/2026"},{"item":"HSLB13490","zona":"CM-Central de Alimentación","servicio":"Central de Alimentación ","familia":"Otro","nombre":"Carro de Transporte","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"ÁREA ARMADO DESAYUNOS, POSTRES Y COLACIONES","fechaInstalacion":"01/07/2026"},{"item":"HSLB13499","zona":"CM-Sala Cuna y Jardín Infantil","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Colchoneta Reposo A","proveedor":"MELMAN SPA","cantidad":14,"piso":1,"recinto":"NIVEL MEDIO MAYOR (120 x 60 cm)","fechaInstalacion":"01/07/2026"},{"item":"HSLB13508","zona":"CM-Sala Cuna y Jardín Infantil","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Librero","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"NIVEL MEDIO MAYOR","fechaInstalacion":"01/07/2026"},{"item":"HSLB13517","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":2,"piso":3,"recinto":"SECRETARÍA C/ARCHIVO Y FOTOCOP.","fechaInstalacion":"17/07/2026"},{"item":"HSLB13526","zona":"NC-Áreas Administrativas en General","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":3,"piso":3,"recinto":"MÓD. TRABAJO (calidad)","fechaInstalacion":"17/07/2026"},{"item":"HSLB13533","zona":"NC-Áreas Administrativas en General","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"COORDINADOR GESTIÓN DE PACIENTES","fechaInstalacion":"17/07/2026"},{"item":"HSLB13539","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"OFICINA JEFE CAE","fechaInstalacion":"17/07/2026"},{"item":"HSLB15226","zona":"CA-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"OFICINA JEFE CUIDADOS PALIATIVOS","fechaInstalacion":"01/07/2026"},{"item":"HSLB13556","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca B","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"BOX PSICÓLOGO ADULTO","fechaInstalacion":"01/07/2026"},{"item":"HSLB13563","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca B","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"BOX TERAPEUTA OCUPACIONAL","fechaInstalacion":"01/07/2026"},{"item":"HSLB13572","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"OFICINA ENFERMERA COORDINADORA","fechaInstalacion":"01/07/2026"},{"item":"HSLB13579","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca B","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA ESTIMULACIÓN COGNITIVA","fechaInstalacion":"01/07/2026"},{"item":"HSLB13588","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":6,"recinto":"OFICINA JEFE MQ ADULTO","fechaInstalacion":"03/08/2026"},{"item":"HSLB13718","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":4,"recinto":"SALA DE ENTREVISTAS","fechaInstalacion":"17/07/2026"},{"item":"HSLB13600","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"OF. JEFE CR AT. URGENCIA","fechaInstalacion":"01/07/2026"},{"item":"HSLB13610","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"OFICINA SECRETARÍA","fechaInstalacion":"01/07/2026"},{"item":"HSLB13619","zona":"CN-Imagenología","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":4,"piso":1,"recinto":"MÓDULO DE TRABAJO (INFORMES)","fechaInstalacion":"01/07/2026"},{"item":"HSLB13627","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"MESÓN C/ARCHIVO Y FOTOCOPIADORA","fechaInstalacion":"01/07/2026"},{"item":"HSLB13640","zona":"CA-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":4,"recinto":"OFICINA NUTRICIONISTA","fechaInstalacion":"17/07/2026"},{"item":"HSLB13649","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":4,"piso":3,"recinto":"MÓDULOS DE TRABAJO (sala de digitalización datos)","fechaInstalacion":"17/07/2026"},{"item":"HSLB13658","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"SECRETARIA C/ARCHIVO, FOTOCOP.","fechaInstalacion":"17/07/2026"},{"item":"HSLB13667","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"SECRETARIA C/ARCHIVO, FOTOCOP.","fechaInstalacion":"17/07/2026"},{"item":"HSLB13679","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"COORDINADOR TESORERÍA","fechaInstalacion":"17/07/2026"},{"item":"HSLB13687","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"OFICINA ADMINISTRADOR DE CONTRATOS","fechaInstalacion":"01/07/2026"},{"item":"HSLB14126","zona":"CM-Áreas de Rehabilitación","servicio":"Med física y rehabilitación","familia":"Otro","nombre":"Pizarra Acrílica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"GIMNASIO ADULTO REHABILITACIÓN CARDIOVASCULAR","fechaInstalacion":"01/07/2026"},{"item":"HSLB14135","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Velador","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"RESIDENCIA MÉDICA C/BAÑO","fechaInstalacion":"01/07/2026"},{"item":"HSLB14144","zona":"CM-Residencias Médicas","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Velador","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"RESIDENCIA MÉDICA C/BAÑO","fechaInstalacion":"01/07/2026"},{"item":"HSLB14153","zona":"CN-Imagenología","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Banca Madera A","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"SALA ECOTOMOGRAFO GINECO-OBSTETRICO (EQUIPO/VESTIDOR)","fechaInstalacion":"01/07/2026"},{"item":"HSLB14162","zona":"CM-Áreas de Rehabilitación","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Apilable de Base Ancha","proveedor":"MELMAN SPA","cantidad":10,"piso":1,"recinto":"GIMNASIO PEDIATRICO","fechaInstalacion":"01/07/2026"},{"item":"HSLB14171","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"OFICINA DIRECTOR C/BAÑO","fechaInstalacion":"17/07/2026"},{"item":"HSLB14180","zona":"NC-Áreas Administrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"MÓD. TRABAJO (Winsig)","fechaInstalacion":"17/07/2026"},{"item":"HSLB14189","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":2,"piso":3,"recinto":"COORDINADOR GESTIÓN DEL CUIDADO AT. ABIERTA","fechaInstalacion":"17/07/2026"},{"item":"HSLB14198","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"MÓDULO DE TRABAJO OIRS","fechaInstalacion":"01/07/2026"},{"item":"HSLB14207","zona":"CM-Salas de Procedimientos no Invasivos","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA PROCEDIMIENTOS GINECO-OBSTÉTRICO","fechaInstalacion":"01/07/2026"},{"item":"HSLB14220","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"BOX CIRUGÍA ADULTOS","fechaInstalacion":"01/07/2026"},{"item":"HSLB14233","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"BOX CARDIO OTORRINO","fechaInstalacion":"01/07/2026"},{"item":"HSLB14242","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"RECAUDACIÓN ODONTOLOGÍA","fechaInstalacion":"01/07/2026"},{"item":"HSLB14251","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"OFICINA ENFERMERA","fechaInstalacion":"01/07/2026"},{"item":"HSLB14260","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"OFICINA JEFE SALUD MENTAL","fechaInstalacion":"01/07/2026"},{"item":"HSLB14269","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"BOX PSICÓLOGO INFANTO JUVENIL","fechaInstalacion":"01/07/2026"},{"item":"HSLB14278","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"BOX PSIQUIATRÍA ADULTO","fechaInstalacion":"01/07/2026"},{"item":"HSLB14287","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"ESTACIÓN DE ENFERMERÍA","fechaInstalacion":"01/07/2026"},{"item":"HSLB14295","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA DE ENTREVISTAS","fechaInstalacion":"01/07/2026"},{"item":"HSLB14304","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":6,"recinto":"OFICINA JEFE CR ATENCIÓN CERRADA","fechaInstalacion":"03/08/2026"},{"item":"HSLB14314","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":6,"piso":5,"recinto":"ESTACIÓN DE ENFERMERÍA","fechaInstalacion":"17/07/2026"},{"item":"HSLB14324","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":5,"recinto":"MÓDULO TRABAJO SUPERVISOR","fechaInstalacion":"17/07/2026"},{"item":"HSLB14333","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":4,"recinto":"LACTARIO","fechaInstalacion":"17/07/2026"},{"item":"HSLB14342","zona":"CA-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":3,"piso":3,"recinto":"ESTACIÓN DE ENFERMERÍA","fechaInstalacion":"17/07/2026"},{"item":"HSLB14351","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"COORDINADOR CR AT. URGENCIA","fechaInstalacion":"01/07/2026"},{"item":"HSLB14360","zona":"CN-Urgencia","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"SALA ENTREVISTA ACOGIDA","fechaInstalacion":"01/07/2026"},{"item":"HSLB14369","zona":"CN-Laboratorios","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SECCIÓN BIOQUÍMICA","fechaInstalacion":"01/07/2026"},{"item":"HSLB14378","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"MESÓN RECEPCIÓN","fechaInstalacion":"01/07/2026"},{"item":"HSLB14387","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"OFICINA JEFE IMAGENOLOGÍA","fechaInstalacion":"01/07/2026"},{"item":"HSLB14396","zona":"CN-Imagenología","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"SALA ECOTOMOGRAFO INDIFERENCIADO (EQUIPO/VESTIDOR)","fechaInstalacion":"01/07/2026"},{"item":"HSLB14406","zona":"CM-Farmacia General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":4,"piso":2,"recinto":"RECEPCIÓN DESPACHO DIGITACIÓN (VENTANILLAS)","fechaInstalacion":"01/07/2026"},{"item":"HSLB14416","zona":"CA-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"MESÓN RECEPCIÓN","fechaInstalacion":"17/07/2026"},{"item":"HSLB15242","zona":"CA-Otros Servicios Adyacentes","servicio":"Pabellones","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"SALA RECUPERACIÓN URGENCIA","fechaInstalacion":"17/07/2026"},{"item":"HSLB14425","zona":"CM-Áreas de Rehabilitación","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"SALA DE TERAPIA GRUPAL (12 MAX)","fechaInstalacion":"01/07/2026"},{"item":"HSLB14434","zona":"CM-Áreas de Rehabilitación","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"SALA PREPARACIÓN DE PACIENTES","fechaInstalacion":"01/07/2026"},{"item":"HSLB14443","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SECRETARIA C/ARCH. Y FOTO","fechaInstalacion":"01/07/2026"},{"item":"HSLB14452","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"MESÓN DE RECEPCIÓN","fechaInstalacion":"17/07/2026"},{"item":"HSLB14461","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"SECRETARIA C/ARCHIVO, FOTOCOP.","fechaInstalacion":"17/07/2026"},{"item":"HSLB14470","zona":"NC-Locales Externos","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"PORTERÍA c/BAÑO (1)","fechaInstalacion":"01/07/2026"},{"item":"HSLB14479","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"SECRETARIA C/ARCHIVO, FOTOCOP.","fechaInstalacion":"17/07/2026"},{"item":"HSLB14496","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"MÓDULO DE TRABAJO (presupuesto)","fechaInstalacion":"17/07/2026"},{"item":"HSLB14505","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SECRETARÍA C/ARCHIVO Y FOTOCOPIADORA","fechaInstalacion":"01/07/2026"},{"item":"HSLB14513","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"OFICINA COORDINADOR CENTRAL","fechaInstalacion":"01/07/2026"},{"item":"HSLB14522","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"COORDINADOR SALUD DEL TRABAJADOR","fechaInstalacion":"01/07/2026"},{"item":"HSLB14531","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"COORDINADOR CAPACITACIÓN Y FORMACIÓN","fechaInstalacion":"17/07/2026"},{"item":"HSLB14540","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA MULTIUSO (labores administrativas)","fechaInstalacion":"01/07/2026"},{"item":"HSLB14549","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":6,"piso":4,"recinto":"ESTACIÓN DE ENFERMERÍA","fechaInstalacion":"17/07/2026"},{"item":"HSLB14558","zona":"NC-Áreas Administrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"MÓDULO DE TRABAJO PROFESIONALES  DEMANDA CONSULTAS MÉDICAS","fechaInstalacion":"01/07/2026"},{"item":"HSLB14567","zona":"CM-Sala Cuna y Jardín Infantil","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Lactante","proveedor":"MELMAN SPA","cantidad":9,"piso":1,"recinto":"NIVEL SALA CUNA 2","fechaInstalacion":"01/07/2026"},{"item":"HSLB14576","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Párvulo","proveedor":"MELMAN SPA","cantidad":4,"piso":5,"recinto":"AULA HOSPITALARIA","fechaInstalacion":"17/07/2026"},{"item":"HSLB14585","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla tipo Casino","proveedor":"MELMAN SPA","cantidad":4,"piso":1,"recinto":"SALA DE ESTAR FAMILIARES","fechaInstalacion":"01/07/2026"},{"item":"HSLB14594","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla tipo Casino","proveedor":"MELMAN SPA","cantidad":4,"piso":6,"recinto":"SALA DE ESTAR FAMILIARES Y ENTREVISTAS","fechaInstalacion":"03/08/2026"},{"item":"HSLB14605","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla tipo Casino","proveedor":"MELMAN SPA","cantidad":4,"piso":2,"recinto":"ESTAR PERSONAL C/ KITCHENETTE","fechaInstalacion":"01/07/2026"},{"item":"HSLB14615","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla tipo Casino","proveedor":"MELMAN SPA","cantidad":4,"piso":1,"recinto":"ESTAR PERSONAL C/ KITCHENETTE","fechaInstalacion":"01/07/2026"},{"item":"HSLB14625","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Tipo Universitaria","proveedor":"MELMAN SPA","cantidad":25,"piso":3,"recinto":"SALA DE CAPACITACIÓN MASIVA","fechaInstalacion":"17/07/2026"},{"item":"HSLB14634","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":4,"piso":3,"recinto":"OFICINA SUBDIRECTOR MÉDICO","fechaInstalacion":"17/07/2026"},{"item":"HSLB14644","zona":"NC-Áreas Administrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":3,"recinto":"OFICINA ASESOR JURÍDICO","fechaInstalacion":"17/07/2026"},{"item":"HSLB14653","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":3,"recinto":"OFICINA SECRETARÍA","fechaInstalacion":"17/07/2026"},{"item":"HSLB14662","zona":"CM-Salas de Procedimientos no Invasivos","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA PROCEDIMIENTOS MONITOREO FETAL","fechaInstalacion":"01/07/2026"},{"item":"HSLB14671","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"BOX MEDICINA ADULTOS","fechaInstalacion":"01/07/2026"},{"item":"HSLB14680","zona":"CM-Salas de Procedimientos no Invasivos","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA PROCEDIMIENTOS TRAUMATOLOGÍA INFANTIL","fechaInstalacion":"01/07/2026"},{"item":"HSLB15251","zona":"CM-Otros Servicios Adyacentes","servicio":"Odontología","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":3,"piso":2,"recinto":"ESTAC. SILLA DE RUEDAS","fechaInstalacion":"01/07/2026"},{"item":"HSLB14698","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"OFICINA ENFERMERA","fechaInstalacion":"01/07/2026"},{"item":"HSLB14707","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"BOX ENFERMERA SALUD MENTAL","fechaInstalacion":"01/07/2026"},{"item":"HSLB14716","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"BOX ENFERMERA INFANTO JUVENIL","fechaInstalacion":"01/07/2026"},{"item":"HSLB14725","zona":"CN-Salas y Habitaciones de Hospitalización","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"SALA DE ATENCIÓN","fechaInstalacion":"01/07/2026"},{"item":"HSLB14734","zona":"CN-Salas y Habitaciones de Hospitalización","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":4,"piso":1,"recinto":"TALLER COMPUTACIÓN","fechaInstalacion":"01/07/2026"},{"item":"HSLB14743","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":4,"piso":2,"recinto":"SALA MULTIUSO","fechaInstalacion":"01/07/2026"},{"item":"HSLB14752","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":8,"piso":2,"recinto":"SALA DE REUNIONES","fechaInstalacion":"01/07/2026"},{"item":"HSLB14761","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":6,"recinto":"OFICINA JEFE MQ ADULTO","fechaInstalacion":"03/08/2026"},{"item":"HSLB14770","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":4,"recinto":"OFICINA CHILE CRECE CONTIGO","fechaInstalacion":"17/07/2026"},{"item":"HSLB14777","zona":"CA-Sala Parto o Pabellón de Parto","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":3,"recinto":"SALA MULTIUSO","fechaInstalacion":"17/07/2026"},{"item":"HSLB14786","zona":"CN-Urgencia","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"MODULO DE TRABAJO OIRS","fechaInstalacion":"01/07/2026"},{"item":"HSLB14795","zona":"CN-Urgencia","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"BOX URGENCIA(3)","fechaInstalacion":"01/07/2026"},{"item":"HSLB14803","zona":"CN-Urgencia","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"SALA OBSERVACIÓN (INFANTIL)","fechaInstalacion":"04/05/2026"},{"item":"HSLB14813","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"OFICINA JEFE LABORATORIO","fechaInstalacion":"01/07/2026"},{"item":"HSLB14821","zona":"CN-Laboratorios","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"TOMA DE MUESTRA COMUN","fechaInstalacion":"01/07/2026"},{"item":"HSLB14830","zona":"CM-Farmacia General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"MÓDULOS DE ENTREVISTA Y EDUCACIÓN","fechaInstalacion":"01/07/2026"},{"item":"HSLB14839","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"OFICINA JEFE REHABILITACIÓN","fechaInstalacion":"01/07/2026"},{"item":"HSLB14848","zona":"CM-Áreas de Rehabilitación","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"SALA PREPARACIÓN DE PACIENTES","fechaInstalacion":"01/07/2026"},{"item":"HSLB14856","zona":"CM-Sala Mortuoria","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"MESÓN RECEPCIÓN DE REGISTRO DE INFORMES","fechaInstalacion":"01/07/2026"},{"item":"HSLB14866","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":3,"recinto":"OFICINA MEDIOAMBIENTAL","fechaInstalacion":"17/07/2026"},{"item":"HSLB14875","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":3,"recinto":"SECRETARIA C/ARCHIVO, FOTOCOP.","fechaInstalacion":"17/07/2026"},{"item":"HSLB14887","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":3,"recinto":"MÓDULO DE TRABAJO (gestión financiera)","fechaInstalacion":"17/07/2026"},{"item":"HSLB14896","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"OFICINA ADMINISTRADOR DE CONTRATOS","fechaInstalacion":"01/07/2026"},{"item":"HSLB14905","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":4,"piso":3,"recinto":"OF. JEFE CR GESTIÓN DE LAS PERSONAS","fechaInstalacion":"17/07/2026"},{"item":"HSLB14914","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"COORD. SALUD OCUP. Y PREVEN. DE RIESGOS","fechaInstalacion":"01/07/2026"},{"item":"HSLB14923","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":20,"piso":3,"recinto":"AUDITORIO","fechaInstalacion":"17/07/2026"},{"item":"HSLB14932","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":4,"piso":2,"recinto":"SALA MULTIUSO (labores administrativas)","fechaInstalacion":"01/07/2026"},{"item":"HSLB14941","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"OFICINA 2 EDUCADORAS","fechaInstalacion":"01/07/2026"},{"item":"HSLB14950","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"OFICINA ENFERMERA COORDINADORA","fechaInstalacion":"01/07/2026"},{"item":"HSLB14959","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón 1 Cuerpo","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"BOX PSICÓLOGO ADULTO","fechaInstalacion":"01/07/2026"},{"item":"HSLB14968","zona":"CN-Salas y Habitaciones de Hospitalización","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón 1 Cuerpo","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"SALA ESTAR COMEDOR","fechaInstalacion":"01/07/2026"},{"item":"HSLB14976","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón 1 Cuerpo","proveedor":"MELMAN SPA","cantidad":3,"piso":2,"recinto":"SALA DE LECTURA","fechaInstalacion":"01/07/2026"},{"item":"HSLB14985","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón 2 Cuerpo","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA ENTREVISTA A PACIENTES","fechaInstalacion":"01/07/2026"},{"item":"HSLB14994","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón 2 Cuerpo","proveedor":"MELMAN SPA","cantidad":6,"piso":5,"recinto":"SALA DE ESPERA","fechaInstalacion":"17/07/2026"},{"item":"HSLB15003","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón 2 Cuerpo","proveedor":"MELMAN SPA","cantidad":2,"piso":6,"recinto":"SALA DE ESTAR FAMILIARES Y ENTREVISTAS","fechaInstalacion":"03/08/2026"},{"item":"HSLB15010","zona":"CA-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón 2 Cuerpo","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"ESTAR PERSONAL C/ KITCHENETTE","fechaInstalacion":"17/07/2026"},{"item":"HSLB15019","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón 2 Cuerpo","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"ESTAR PERSONAL C/ KITCHENETTE","fechaInstalacion":"01/07/2026"},{"item":"HSLB15029","zona":"CM-Áreas de Rehabilitación","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón 2 Cuerpo","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"BOX PSICOLOGO / A. SOCIAL","fechaInstalacion":"01/07/2026"},{"item":"HSLB15041","zona":"CN-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón 2 Cuerpo","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"ESTAR PERSONAL C/ KITCHENETTE","fechaInstalacion":"01/07/2026"},{"item":"HSLB15050","zona":"CN-Pensionado","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón Bergere","proveedor":"MELMAN SPA","cantidad":1,"piso":5,"recinto":"SALA 1 CAMA","fechaInstalacion":"17/07/2026"},{"item":"HSLB15059","zona":"CN-Salas y Habitaciones de Hospitalización","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón Bergere","proveedor":"MELMAN SPA","cantidad":4,"piso":7,"recinto":"SALA 4 CAMAS","fechaInstalacion":"03/08/2026"},{"item":"HSLB15068","zona":"CN-Salas y Habitaciones de Hospitalización","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón Bergere","proveedor":"MELMAN SPA","cantidad":1,"piso":7,"recinto":"SALA 1 CAMA","fechaInstalacion":"03/08/2026"},{"item":"HSLB15080","zona":"CN-Salas y Habitaciones de Hospitalización","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón Bergere","proveedor":"MELMAN SPA","cantidad":4,"piso":6,"recinto":"SALA 4 CAMAS","fechaInstalacion":"03/08/2026"},{"item":"HSLB15093","zona":"CN-Salas y Habitaciones de Hospitalización","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón Bergere","proveedor":"MELMAN SPA","cantidad":1,"piso":5,"recinto":"SALA 1 CAMA","fechaInstalacion":"17/07/2026"},{"item":"HSLB15102","zona":"CN-Salas y Habitaciones de Hospitalización","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón Bergere","proveedor":"MELMAN SPA","cantidad":4,"piso":4,"recinto":"SALA 4 CAMAS","fechaInstalacion":"17/07/2026"},{"item":"HSLB15112","zona":"CA-Unidad de Paciente Crítico","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón Bergere","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"SALA 1 CAMA","fechaInstalacion":"01/07/2026"},{"item":"HSLB15121","zona":"CA-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón Bergere","proveedor":"MELMAN SPA","cantidad":1,"piso":3,"recinto":"RESIDENCIA MÉDICA","fechaInstalacion":"17/07/2026"},{"item":"HSLB15143","zona":"CM-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Sillón Tipo Poltrona","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"SALA ENTREVISTA A PACIENTES","fechaInstalacion":"01/07/2026"},{"item":"HSLB15265","zona":"NC-SAMU","servicio":"Urgencia","familia":"Mobiliario","nombre":"Cama 1 1/2 Plaza","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"RESIDENCIA DOBLE","fechaInstalacion":"01/07/2026"},{"item":"HSLB15274","zona":"CM-Sala Cuna y Jardín Infantil","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Contenedor","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"NIVEL SALA CUNA 2","fechaInstalacion":"01/07/2026"},{"item":"HSLB15172","zona":"CN-Laboratorios","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Escritorio simple 120x70 cm","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"TOMA DE MUESTRA COMUN","fechaInstalacion":"01/07/2026"},{"item":"HSLB15275","zona":"CM-Sala Cuna y Jardín Infantil","servicio":"Administración y apoyo general","familia":"Mesa","nombre":"Mesa Párvulo Inclusión","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"NIVEL SALA CUNA 2","fechaInstalacion":"01/07/2026"},{"item":"HSLB13698","zona":"NC-Áreas Adminitrativas en General","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"COORDINADOR SALUD DEL TRABAJADOR","fechaInstalacion":"01/07/2026"},{"item":"HSLB15278","zona":"NC-Otros Servicios Adyacentes","servicio":"Administración y apoyo general","familia":"Otro","nombre":"Mueble Tipo Biblioteca A","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA MULTIUSO (labores administrativas)","fechaInstalacion":"01/07/2026"},{"item":"HSLB15282","zona":"CM-Otros Servicios Adyacentes","servicio":"Psiquiatría","familia":"Silla","nombre":"Silla Alta Cafeteria","proveedor":"MELMAN SPA","cantidad":6,"piso":2,"recinto":"TALLER DE COCINA","fechaInstalacion":"01/06/2026"},{"item":"HSLB15292","zona":"CN-Salas y Habitaciones de Hospitalización","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"SALA DE ATENCIÓN","fechaInstalacion":"01/07/2026"},{"item":"HSLB15305","zona":"CA-Central de Esterilización","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":2,"piso":3,"recinto":"ÁREA EQUIPO AIRE COMPRIMIDO- OSMOSIS INVERSA","fechaInstalacion":"17/07/2026"},{"item":"HSLB15312","zona":"NC-Áreas de Servicios Generales","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Ergonómica","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"PREPARACIÓN DE CARROS","fechaInstalacion":"01/07/2026"},{"item":"HSLB15321","zona":"CN-Salas de Procedimientos Invasivos y/o de Mayor Complejidad","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA PROCEDIMIENTOS ENDOSCOPÍA INDIFERENCIADO","fechaInstalacion":"01/07/2026"},{"item":"HSLB15330","zona":"CM-Servicio Dental","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":2,"recinto":"BOX DENTAL POLIFUNCIONAL(5)","fechaInstalacion":"01/06/2026"},{"item":"HSLB15339","zona":"CM-Consultas Ambulatorias","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":1,"piso":2,"recinto":"SALA DE PROCEDIMIENTO","fechaInstalacion":"01/07/2026"},{"item":"HSLB15346","zona":"CN-Urgencia","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":1,"piso":1,"recinto":"BOX MONITOREO FETAL C / BAÑO","fechaInstalacion":"01/07/2026"},{"item":"HSLB15355","zona":"CN-Urgencia","servicio":"Administración y apoyo general","familia":"Silla","nombre":"Silla Visita","proveedor":"MELMAN SPA","cantidad":2,"piso":1,"recinto":"BOX AT. ACOGIDA C/BAÑO Y DUCHA","fechaInstalacion":"01/07/2026"}];
const SUMMARY = {
  totalItems: 1973,
  totalQty: 4456,
  uniqueRecintos: 812,
  uniqueNombres: 79,
  uniqueServicios: 39,
  uniqueZonas: 29,
  pisos: 7,
  proveedores: 3,
  familias: 4,
  byFamilia: [
    { name: "Silla", qty: 3233 },
    { name: "Mesa", qty: 694 },
    { name: "Otro", qty: 426 },
    { name: "Mobiliario", qty: 103 },
  ],
  byProveedor: [
    { name: "MELMAN SPA", qty: 4256 },
    { name: "ALLMEDICA", qty: 106 },
    { name: "COMERCIAL HAGELIN", qty: 94 },
  ],
  byPiso: [
    { name: "Piso 1", piso: 1, qty: 1466 },
    { name: "Piso 2", piso: 2, qty: 1547 },
    { name: "Piso 3", piso: 3, qty: 845 },
    { name: "Piso 4", piso: 4, qty: 184 },
    { name: "Piso 5", piso: 5, qty: 137 },
    { name: "Piso 6", piso: 6, qty: 150 },
    { name: "Piso 7", piso: 7, qty: 127 },
  ],
  byServicio: [
    { name: "Administración y apoyo general", qty: 825 },
    { name: "Consultas medicas generales", qty: 376 },
    { name: "Urgencia", qty: 311 },
    { name: "Comedor funcionarios/público", qty: 307 },
    { name: "Sala Cuna", qty: 296 },
    { name: "Hospitalización", qty: 230 },
    { name: "Hospital de día", qty: 212 },
    { name: "Psiquiatría", qty: 179 },
    { name: "UHCIP", qty: 170 },
    { name: "Laboratorio", qty: 166 },
    { name: "Med física y rehabilitación", qty: 144 },
    { name: "Imagenología", qty: 90 },
    { name: "Pabellones", qty: 86 },
    { name: "Contabilidad", qty: 83 },
    { name: "Diálisis", qty: 76 },
    { name: "Farmacia", qty: 75 },
    { name: "UTI", qty: 71 },
    { name: "Central de Alimentación", qty: 69 },
    { name: "Odontología", qty: 68 },
    { name: "Cafetería", qty: 66 },
    { name: "Consultas Ambulatorias", qty: 59 },
    { name: "Mantenimiento", qty: 52 },
    { name: "Biblioteca", qty: 52 },
    { name: "Parto Integral", qty: 48 },
    { name: "Laboratorio UMT", qty: 46 },
    { name: "Cuidados Paliativos", qty: 45 },
    { name: "Vestuario", qty: 41 },
    { name: "Auditorio", qty: 40 },
    { name: "Abastecimiento", qty: 32 },
    { name: "Esterilización", qty: 29 },
    { name: "Chile Crece Contigo", qty: 26 },
    { name: "Neonatología", qty: 25 },
    { name: "SEDILE", qty: 14 },
    { name: "Lavandería", qty: 12 },
    { name: "Morgue", qty: 11 },
    { name: "Telemedicina", qty: 8 },
    { name: "Circulación Rehabilitación", qty: 8 },
    { name: "Exterior portería", qty: 6 },
    { name: "Cirugía menor", qty: 2 },
  ],
  byNombre: [
    { name: "Silla Visita", qty: 1285 },
    { name: "Silla Ergonómica", qty: 631 },
    { name: "Silla tipo Casino", qty: 478 },
    { name: "Mueble Tipo Biblioteca A", qty: 272 },
    { name: "Silla Butaca Espera 3 Cuerpos", qty: 223 },
    { name: "Sillón Bergere", qty: 185 },
    { name: "Escritorio en L Administrativo", qty: 178 },
    { name: "Escritorio simple 120x70 cm", qty: 122 },
    { name: "Sillón 2 Cuerpo", qty: 103 },
    { name: "Mesa Tipo Casino", qty: 74 },
    { name: "Punto de Registro", qty: 67 },
    { name: "Banca Madera B", qty: 59 },
    { name: "Escritorio de Consultas", qty: 58 },
    { name: "Colchoneta Reposo A", qty: 56 },
    { name: "Mesa Reuniones Tipo I", qty: 54 },
    { name: "Silla Párvulo", qty: 52 },
    { name: "Mesa Tipo Casino Circular", qty: 41 },
    { name: "Silla Tipo Universitaria", qty: 33 },
    { name: "Mesa Lateral", qty: 31 },
    { name: "Sillón 1 Cuerpo", qty: 31 },
    { name: "Banca Madera A", qty: 29 },
    { name: "Cama Apilable", qty: 28 },
    { name: "Banca Madera C", qty: 21 },
    { name: "Perchero", qty: 20 },
    { name: "Velador", qty: 20 },
  ],
  byZona: [
    { name: "CN-Otros Serv. Adyacentes", qty: 539 },
    { name: "NC-Otros Serv. Adyacentes", qty: 536 },
    { name: "NC-Áreas Admin. en General*", qty: 559 },
    { name: "CM-Consultas Ambulatorias", qty: 387 },
    { name: "CM-Otros Serv. Adyacentes", qty: 366 },
    { name: "CN-Salas y Hab. Hospitalización", qty: 312 },
    { name: "NC-Casino", qty: 300 },
    { name: "CM-Sala Cuna y Jardín Infantil", qty: 265 },
    { name: "CA-Otros Serv. Adyacentes", qty: 251 },
    { name: "NC-Áreas Serv. Generales", qty: 206 },
    { name: "CN-Urgencia", qty: 161 },
    { name: "CM-Áreas de Rehabilitación", qty: 94 },
    { name: "CN-Laboratorios", qty: 78 },
    { name: "CM-Salas Proc. no Invasivos", qty: 59 },
    { name: "CM-Farmacia General", qty: 56 },
    { name: "CN-Imagenología", qty: 55 },
    { name: "NC-SAMU", qty: 49 },
    { name: "CA-Áreas Tratamiento Especial", qty: 45 },
    { name: "CN-Pensionado", qty: 35 },
    { name: "Otras zonificaciones", qty: 157 },
  ],
  // Datos de fechas de instalación
  byMes: [
    { name: "Mayo 2026", qty: 66 },
    { name: "Junio 2026", qty: 44 },
    { name: "Julio 2026", qty: 4069 },
    { name: "Agosto 2026", qty: 277 },
  ],
  bySemana: [
    { name: "29/06 - 05/07", qty: 2924 },
    { name: "13/07 - 19/07", qty: 1145 },
    { name: "03/08 - 09/08", qty: 277 },
    { name: "04/05 - 10/05", qty: 66 },
    { name: "01/06 - 07/06", qty: 44 },
  ],
  byDia: [
    { name: "01/07/2026", qty: 2924 },
    { name: "17/07/2026", qty: 1145 },
    { name: "03/08/2026", qty: 277 },
    { name: "04/05/2026", qty: 66 },
    { name: "01/06/2026", qty: 44 },
  ],
  fechaStats: {
    totalConFecha: 1973,
    fechaMin: "04/05/2026",
    fechaMax: "03/08/2026",
    totalMeses: 4,
    totalSemanas: 5,
  },
};

// Paleta Billy - colores limpios y profesionales
const COLORS = {
  primary: "#0090FF",       // Azul Billy
  primaryDark: "#0070DD",
  primaryLight: "#40A9FF",
  green: "#00C896",         // Verde esmeralda
  greenLight: "#5DDAB4",
  orange: "#FF9500",        // Naranja ámbar
  orangeLight: "#FFB340",
  red: "#FF3B30",          // Rojo alerta
  redLight: "#FF6B63",
  purple: "#8B5CF6",
  blue: "#0EA5E9",
  cyan: "#06B6D4",
  
  // Neutrales
  bg: "#F8F9FA",           // Fondo gris muy claro
  sidebar: "#EFF3F6",      // Sidebar gris claro
  white: "#FFFFFF",
  card: "#FFFFFF",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  
  // Textos
  text: "#1F2937",         // Gris oscuro
  textMuted: "#6B7280",    // Gris medio
  textLight: "#9CA3AF",    // Gris claro
};

const CHART_COLORS = [
  COLORS.primary,
  COLORS.green, 
  COLORS.orange,
  COLORS.purple,
  COLORS.cyan,
  COLORS.blue,
  "#F59E0B",
  "#EC4899",
  "#14B8A6",
  "#8B5CF6",
  "#0EA5E9",
  "#F97316"
];

const PIE_FAMILIA_COLORS = { 
  Silla: COLORS.primary,
  Mesa: COLORS.orange, 
  Otro: COLORS.green, 
  Mobiliario: COLORS.purple 
};

// Componente de icono cuadrado moderno (NO circular como WhatsApp)
function SquareIcon({ icon, color, size = 56 }) {
  return (
    <div style={{
      width: size,
      height: size,
      background: `linear-gradient(135deg, ${color} 0%, ${color}DD 100%)`,
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.5,
      boxShadow: `0 4px 12px ${color}30`,
    }}>
      {icon}
    </div>
  );
}

// KPI Card estilo Billy - limpio y espacioso
function KPICard({ label, value, sub, icon, color = COLORS.primary, compact = false }) {
  return (
    <div style={{
      background: COLORS.white,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 12,
      padding: compact ? "20px" : "24px",
      display: "flex",
      flexDirection: "column",
      gap: compact ? 12 : 16,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
      transition: "all 0.2s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)";
      e.currentTarget.style.transform = "translateY(0)";
    }}>
      
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <SquareIcon icon={icon} color={color} size={compact ? 44 : 56} />
        <div style={{ flex: 1 }}>
          <div style={{ 
            fontSize: 11, 
            color: COLORS.textLight, 
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 4,
          }}>
            {label}
          </div>
          <div style={{ 
            fontSize: compact ? 24 : 32, 
            fontWeight: 700, 
            color: COLORS.text,
            lineHeight: 1,
            fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
          }}>
            {typeof value === "number" ? value.toLocaleString("es-CL") : value}
            {sub && (
              <span style={{ 
                fontSize: compact ? 11 : 13, 
                color: COLORS.textMuted, 
                fontWeight: 500,
                marginLeft: 6,
              }}>
                {sub}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Status badge estilo Billy
function StatusBadge({ label, value, color, icon }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "16px 20px",
      background: COLORS.white,
      borderRadius: 12,
      border: `1px solid ${COLORS.borderLight}`,
    }}>
      <div style={{
        width: 48,
        height: 48,
        background: color,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        color: COLORS.white,
        fontWeight: 700,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ 
          fontSize: 28, 
          fontWeight: 700, 
          color: COLORS.text,
          lineHeight: 1,
          marginBottom: 4,
        }}>
          {value}
        </div>
        <div style={{ 
          fontSize: 12, 
          color: COLORS.textMuted,
          fontWeight: 500,
        }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// Sección de título limpia
function SectionTitle({ children, count, action, icon }) {
  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between",
      marginBottom: 20,
      marginTop: 32,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {icon && <span style={{ fontSize: 20 }}>{icon}</span>}
        <h2 style={{
          fontSize: 20,
          fontWeight: 700,
          color: COLORS.text,
          margin: 0,
          fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
        }}>
          {children}
        </h2>
        {count && (
          <span style={{
            background: COLORS.borderLight,
            color: COLORS.textMuted,
            padding: "4px 10px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
          }}>
            {count}
          </span>
        )}
      </div>
      {action && (
        <button style={{
          background: "transparent",
          color: COLORS.primary,
          border: "none",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          padding: "6px 12px",
          borderRadius: 6,
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = COLORS.borderLight}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
          {action}
        </button>
      )}
    </div>
  );
}

// Tooltip personalizado
function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0];
  return (
    <div style={{
      background: COLORS.white,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: "10px 14px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}>
      <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 4, fontWeight: 500 }}>
        {data.payload.name || data.name}
      </div>
      <div style={{ 
        fontSize: 18, 
        fontWeight: 700, 
        color: data.color || COLORS.primary,
      }}>
        {(data.value || data.payload.qty || data.payload.value || 0).toLocaleString("es-CL")}
      </div>
    </div>
  );
}

// Tabla estilo Billy
function DataTable({ data, columns, maxRows = 10 }) {
  const [showAll, setShowAll] = useState(false);
  const display = showAll ? data : data.slice(0, maxRows);

  return (
    <div style={{ 
      background: COLORS.white,
      borderRadius: 12,
      overflow: "hidden",
      border: `1px solid ${COLORS.border}`,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}>
      {/* Header */}
      <div style={{
        display: "grid",
        gridTemplateColumns: columns.map(c => c.width || "1fr").join(" "),
        columnGap: 24,
        background: COLORS.bg,
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "14px 20px",
        fontWeight: 600,
        fontSize: 11,
        color: COLORS.textMuted,
        letterSpacing: 0.5,
        textTransform: "uppercase",
      }}>
        {columns.map((col) => (
          <div key={col.key} style={{ textAlign: col.align || "left" }}>
            {col.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      {display.map((row, i) => (
        <div key={i} style={{
          display: "grid",
          gridTemplateColumns: columns.map(c => c.width || "1fr").join(" "),
          columnGap: 24,
          padding: "14px 20px",
          borderBottom: i < display.length - 1 ? `1px solid ${COLORS.borderLight}` : "none",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = COLORS.bg}
        onMouseLeave={(e) => e.currentTarget.style.background = COLORS.white}>
          {columns.map((col) => {
            const val = row[col.key];
            return (
              <div key={col.key} style={{ 
                textAlign: col.align || "left",
                fontSize: 14,
                color: col.highlight ? COLORS.text : COLORS.textMuted,
                fontWeight: col.highlight ? 600 : 400,
                fontFamily: col.mono ? "'SF Mono', 'Monaco', monospace" : "inherit",
              }}>
                {col.render ? col.render(val, row) : val}
              </div>
            );
          })}
        </div>
      ))}

      {/* Ver más */}
      {data.length > maxRows && (
        <div style={{
          padding: "14px 20px",
          textAlign: "center",
          borderTop: `1px solid ${COLORS.borderLight}`,
          background: COLORS.bg,
        }}>
          <button onClick={() => setShowAll(!showAll)} style={{
            background: COLORS.primary,
            color: COLORS.white,
            border: "none",
            padding: "8px 20px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = COLORS.primaryDark}
          onMouseLeave={(e) => e.currentTarget.style.background = COLORS.primary}>
            {showAll ? "Mostrar menos" : `Ver ${data.length - maxRows} más`}
          </button>
        </div>
      )}
    </div>
  );
}

// Barra de progreso
function ProgressBar({ value, max, color = COLORS.primary }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ 
      background: COLORS.borderLight, 
      borderRadius: 4, 
      height: 6, 
      overflow: "hidden",
    }}>
      <div style={{
        background: color,
        width: `${pct}%`,
        height: "100%",
        borderRadius: 4,
        transition: "width 0.4s ease",
      }} />
    </div>
  );
}

// Tabla de inventario con filtros
function InventoryDataTable({ data }) {
  const [filters, setFilters] = useState({
    zona: "",
    familia: "",
    proveedor: "",
    piso: "",
    servicio: "",
    search: "",
    fechaDesde: "",
    fechaHasta: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Obtener valores únicos para filtros
  const uniqueZonas = useMemo(() => [...new Set(data.map(d => d.zona))].filter(Boolean).sort(), [data]);
  const uniqueFamilias = useMemo(() => [...new Set(data.map(d => d.familia))].filter(Boolean).sort(), [data]);
  const uniqueProveedores = useMemo(() => [...new Set(data.map(d => d.proveedor))].filter(Boolean).sort(), [data]);
  const uniquePisos = useMemo(() => [...new Set(data.map(d => d.piso))].filter(Boolean).sort((a,b) => a-b), [data]);
  const uniqueServicios = useMemo(() => SUMMARY.byServicio.map(s => s.name).sort(), []);

  // Convertir fecha DD/MM/YYYY a Date para comparar
  const parseDate = (str: string) => {
    if (!str) return null;
    const [d, m, y] = str.split("/");
    return new Date(Number(y), Number(m) - 1, Number(d));
  };

  // Filtrar datos
  const filteredData = useMemo(() => {
    const desde = filters.fechaDesde ? new Date(filters.fechaDesde) : null;
    const hasta = filters.fechaHasta ? new Date(filters.fechaHasta) : null;
    return data.filter(item => {
      const matchZona = !filters.zona || item.zona === filters.zona;
      const matchFamilia = !filters.familia || item.familia === filters.familia;
      const matchProveedor = !filters.proveedor || item.proveedor === filters.proveedor;
      const matchPiso = !filters.piso || item.piso.toString() === filters.piso;
      const matchServicio = !filters.servicio || item.servicio === filters.servicio;
      const matchSearch = !filters.search ||
        item.nombre?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.recinto?.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.item?.toLowerCase().includes(filters.search.toLowerCase());
      const itemDate = parseDate(item.fechaInstalacion);
      const matchDesde = !desde || !itemDate || itemDate >= desde;
      const matchHasta = !hasta || !itemDate || itemDate <= hasta;
      return matchZona && matchFamilia && matchProveedor && matchPiso && matchServicio && matchSearch && matchDesde && matchHasta;
    });
  }, [data, filters]);

  // Paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset página cuando cambian filtros
  useEffect(() => { setCurrentPage(1); }, [filters]);

  const FilterSelect = ({ label, value, onChange, options, placeholder }) => (
    <div style={{ flex: 1, minWidth: 150 }}>
      <label style={{ 
        display: "block", 
        fontSize: 11, 
        fontWeight: 600, 
        color: COLORS.textMuted,
        marginBottom: 6,
        textTransform: "uppercase",
        letterSpacing: 0.5,
      }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 12px",
          borderRadius: 8,
          border: `1px solid ${COLORS.border}`,
          background: COLORS.white,
          fontSize: 13,
          color: COLORS.text,
          cursor: "pointer",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => e.target.style.borderColor = COLORS.primary}
        onBlur={(e) => e.target.style.borderColor = COLORS.border}>
        <option value="">{placeholder}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <SectionTitle icon="🔍">Datos Completos del Inventario</SectionTitle>
      
      <div style={{
        background: COLORS.white,
        borderRadius: 12,
        padding: 24,
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        marginBottom: 24,
      }}>
        {/* Barra de búsqueda */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, recinto o código..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 8,
              border: `1px solid ${COLORS.border}`,
              fontSize: 14,
              color: COLORS.text,
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => e.target.style.borderColor = COLORS.primary}
            onBlur={(e) => e.target.style.borderColor = COLORS.border}
          />
        </div>

        {/* Filtros */}
        <div style={{ 
          display: "flex", 
          gap: 12, 
          marginBottom: 20,
          flexWrap: "wrap",
        }}>
          <FilterSelect
            label="Familia"
            value={filters.familia}
            onChange={(v) => setFilters({ ...filters, familia: v })}
            options={uniqueFamilias}
            placeholder="Todas las familias"
          />
          <FilterSelect
            label="Piso"
            value={filters.piso}
            onChange={(v) => setFilters({ ...filters, piso: v })}
            options={uniquePisos.map(String)}
            placeholder="Todos los pisos"
          />
          <FilterSelect
            label="Proveedor"
            value={filters.proveedor}
            onChange={(v) => setFilters({ ...filters, proveedor: v })}
            options={uniqueProveedores}
            placeholder="Todos los proveedores"
          />
          <FilterSelect
            label="Zona"
            value={filters.zona}
            onChange={(v) => setFilters({ ...filters, zona: v })}
            options={uniqueZonas}
            placeholder="Todas las zonas"
          />
          <FilterSelect
            label="Servicio"
            value={filters.servicio}
            onChange={(v) => setFilters({ ...filters, servicio: v })}
            options={uniqueServicios}
            placeholder="Todos los servicios"
          />

          {/* Filtro fecha desde */}
          <div style={{ flex: 1, minWidth: 150 }}>
            <label style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              color: COLORS.textMuted,
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              Fecha Desde
            </label>
            <input
              type="date"
              value={filters.fechaDesde}
              onChange={(e) => setFilters({ ...filters, fechaDesde: e.target.value })}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: `1px solid ${COLORS.border}`,
                background: COLORS.white,
                fontSize: 13,
                color: COLORS.text,
                cursor: "pointer",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => e.target.style.borderColor = COLORS.primary}
              onBlur={(e) => e.target.style.borderColor = COLORS.border}
            />
          </div>

          {/* Filtro fecha hasta */}
          <div style={{ flex: 1, minWidth: 150 }}>
            <label style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              color: COLORS.textMuted,
              marginBottom: 6,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}>
              Fecha Hasta
            </label>
            <input
              type="date"
              value={filters.fechaHasta}
              onChange={(e) => setFilters({ ...filters, fechaHasta: e.target.value })}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 8,
                border: `1px solid ${COLORS.border}`,
                background: COLORS.white,
                fontSize: 13,
                color: COLORS.text,
                cursor: "pointer",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => e.target.style.borderColor = COLORS.primary}
              onBlur={(e) => e.target.style.borderColor = COLORS.border}
            />
          </div>

          {/* Botón limpiar filtros */}
          {Object.values(filters).some(v => v) && (
            <div style={{ flex: 1, minWidth: 150, display: "flex", alignItems: "flex-end" }}>
              <button
                onClick={() => setFilters({ zona: "", familia: "", proveedor: "", piso: "", servicio: "", search: "", fechaDesde: "", fechaHasta: "" })}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.white,
                  color: COLORS.textMuted,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = COLORS.red;
                  e.currentTarget.style.color = COLORS.white;
                  e.currentTarget.style.borderColor = COLORS.red;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = COLORS.white;
                  e.currentTarget.style.color = COLORS.textMuted;
                  e.currentTarget.style.borderColor = COLORS.border;
                }}>
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Contador de resultados */}
        <div style={{ 
          marginBottom: 16,
          fontSize: 13,
          color: COLORS.textMuted,
          fontWeight: 500,
        }}>
          Mostrando <span style={{ color: COLORS.primary, fontWeight: 700 }}>{filteredData.length}</span> de {data.length} registros
          {filteredData.length !== data.length && (
            <span style={{ marginLeft: 8 }}>
              ({((filteredData.length / data.length) * 100).toFixed(1)}% del total)
            </span>
          )}
        </div>

        {/* Tabla */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: COLORS.bg, borderBottom: `2px solid ${COLORS.border}` }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>Ítem</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>Nombre</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>Familia</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>Cant.</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>Piso</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>Recinto</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>Proveedor</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>Zona</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>Fecha Inst.</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? paginatedData.map((row, i) => (
                <tr key={i} style={{ 
                  borderBottom: `1px solid ${COLORS.borderLight}`,
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = COLORS.bg}
                onMouseLeave={(e) => e.currentTarget.style.background = COLORS.white}>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.textMuted, fontFamily: "'SF Mono', monospace" }}>{row.item}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.text, fontWeight: 600 }}>{row.nombre}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.text }}>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: PIE_FAMILIA_COLORS[row.familia] ? `${PIE_FAMILIA_COLORS[row.familia]}15` : COLORS.borderLight,
                      color: PIE_FAMILIA_COLORS[row.familia] || COLORS.textMuted,
                      fontSize: 12,
                      fontWeight: 600,
                    }}>
                      {row.familia}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 14, color: COLORS.text, textAlign: "center", fontWeight: 700 }}>{row.cantidad}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.text, textAlign: "center", fontWeight: 600 }}>{row.piso}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: COLORS.textMuted, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.recinto}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: COLORS.text }}>{row.proveedor}</td>
                  <td style={{ padding: "12px 16px", fontSize: 11, color: COLORS.textMuted, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.zona}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: COLORS.primary, textAlign: "center", fontWeight: 600, whiteSpace: "nowrap" }}>{row.fechaInstalacion}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} style={{ padding: "40px", textAlign: "center", color: COLORS.textMuted, fontSize: 14 }}>
                    No se encontraron resultados con los filtros aplicados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            marginTop: 20,
            paddingTop: 20,
            borderTop: `1px solid ${COLORS.borderLight}`,
          }}>
            <div style={{ fontSize: 13, color: COLORS.textMuted }}>
              Página {currentPage} de {totalPages}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  background: currentPage === 1 ? COLORS.borderLight : COLORS.white,
                  color: currentPage === 1 ? COLORS.textMuted : COLORS.text,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.background = COLORS.primary;
                    e.currentTarget.style.color = COLORS.white;
                    e.currentTarget.style.borderColor = COLORS.primary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.background = COLORS.white;
                    e.currentTarget.style.color = COLORS.text;
                    e.currentTarget.style.borderColor = COLORS.border;
                  }
                }}>
                ← Anterior
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  background: currentPage === totalPages ? COLORS.borderLight : COLORS.white,
                  color: currentPage === totalPages ? COLORS.textMuted : COLORS.text,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages) {
                    e.currentTarget.style.background = COLORS.primary;
                    e.currentTarget.style.color = COLORS.white;
                    e.currentTarget.style.borderColor = COLORS.primary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== totalPages) {
                    e.currentTarget.style.background = COLORS.white;
                    e.currentTarget.style.color = COLORS.text;
                    e.currentTarget.style.borderColor = COLORS.border;
                  }
                }}>
                Siguiente →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ── PDF Viewer con PDF.js ──────────────────────────────────────────────────
function PdfViewer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<HTMLCanvasElement[]>([]);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [basePageWidth, setBasePageWidth] = useState(0); // ancho nativo a scale=1
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pdfRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);
  const renderTasksRef = useRef<Map<number, pdfjsLib.RenderTask>>(new Map());

  // Cancela renders anteriores y re-renderiza todas las páginas con la escala dada
  const renderAllPages = useCallback(async (pdf: pdfjsLib.PDFDocumentProxy, sc: number) => {
    // Cancelar tasks previas
    renderTasksRef.current.forEach(t => t.cancel());
    renderTasksRef.current.clear();
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: sc });
      const canvas = canvasRefs.current[i - 1];
      if (!canvas) continue;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = viewport.width + "px";
      canvas.style.height = viewport.height + "px";
      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);
      const task = page.render({ canvasContext: ctx, viewport });
      renderTasksRef.current.set(i, task);
      try { await task.promise; } catch { /* cancelado */ }
    }
  }, []);

  // Calcula escala ajustada al ancho del contenedor
  const calcFitScale = useCallback((pageWidth: number) => {
    const w = containerRef.current?.clientWidth ?? 900;
    return Math.max(0.3, (w - 24) / pageWidth);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setNumPages(0);
    canvasRefs.current = [];
    pdfRef.current = null;
    renderTasksRef.current.forEach(t => t.cancel());
    renderTasksRef.current.clear();

    pdfjsLib.getDocument(url).promise
      .then(async (pdf) => {
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
        const firstPage = await pdf.getPage(1);
        const baseVp = firstPage.getViewport({ scale: 1 });
        setBasePageWidth(baseVp.width);
        const autoScale = calcFitScale(baseVp.width);
        setScale(autoScale);
        setLoading(false);
        setTimeout(() => renderAllPages(pdf, autoScale), 60);
      })
      .catch(() => {
        setError("No se pudo cargar el PDF.");
        setLoading(false);
      });
  }, [url, renderAllPages, calcFitScale]);

  // ResizeObserver: re-ajusta escala si cambia el ancho del contenedor
  useEffect(() => {
    if (!containerRef.current || basePageWidth === 0) return;
    const ro = new ResizeObserver(() => {
      if (!pdfRef.current) return;
      const newScale = calcFitScale(basePageWidth);
      setScale(newScale);
      renderAllPages(pdfRef.current, newScale);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [basePageWidth, calcFitScale, renderAllPages]);

  const fitToWidth = useCallback(() => {
    if (!pdfRef.current || basePageWidth === 0) return;
    const ns = calcFitScale(basePageWidth);
    setScale(ns);
    renderAllPages(pdfRef.current, ns);
  }, [basePageWidth, calcFitScale, renderAllPages]);

  const zoom = useCallback((delta: number) => {
    setScale((prev) => {
      const next = Math.min(4, Math.max(0.3, parseFloat((prev + delta).toFixed(2))));
      if (pdfRef.current) renderAllPages(pdfRef.current, next);
      return next;
    });
  }, [renderAllPages]);

  // Scroll → página actual
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const cRect = container.getBoundingClientRect();
      canvasRefs.current.forEach((c, i) => {
        if (!c) return;
        const rect = c.getBoundingClientRect();
        if (rect.top <= cRect.top + cRect.height * 0.6 && rect.bottom >= cRect.top) {
          setCurrentPage(i + 1);
        }
      });
    };
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [numPages]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Toolbar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "10px 16px",
        borderBottom: "1px solid #e5e7eb", background: "#f8fafc", flexShrink: 0,
      }}>
        <button onClick={() => zoom(-0.15)} style={btnStyle} title="Alejar">−</button>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", minWidth: 48, textAlign: "center" }}>
          {Math.round(scale * 100)}%
        </span>
        <button onClick={() => zoom(0.15)} style={btnStyle} title="Acercar">+</button>
        <button onClick={fitToWidth} style={{ ...btnStyle, width: "auto", padding: "0 10px", fontSize: 12 }} title="Ajustar al ancho">⤢ Ajustar</button>
        <span style={{ flex: 1 }} />
        {numPages > 0 && (
          <span style={{ fontSize: 12, color: "#6b7280" }}>Pág. {currentPage} / {numPages}</span>
        )}
        <a href={url} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 12, color: "#2563eb", fontWeight: 600, textDecoration: "none", padding: "4px 10px", border: "1px solid #2563eb", borderRadius: 6 }}>
          ↗ Nueva pestaña
        </a>
      </div>

      {/* Área de scroll — sin overflow horizontal */}
      <div ref={containerRef} style={{
        flex: 1, overflowY: "auto", overflowX: "hidden",
        background: "#525659", padding: "16px 12px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12, minHeight: 600,
      }}>
        {loading && <div style={{ color: "#fff", marginTop: 60, fontSize: 15 }}>Cargando PDF…</div>}
        {error && <div style={{ color: "#fca5a5", marginTop: 60, fontSize: 15 }}>{error}</div>}
        {!loading && !error && Array.from({ length: numPages }).map((_, i) => (
          <canvas
            key={i}
            ref={(el) => { if (el) canvasRefs.current[i] = el; }}
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.4)", background: "#fff", display: "block", maxWidth: "100%" }}
          />
        ))}
      </div>
    </div>
  );
}
const btnStyle: React.CSSProperties = {
  width: 32, height: 32, border: "1px solid #d1d5db", borderRadius: 6,
  background: "#fff", cursor: "pointer", fontSize: 16, fontWeight: 700,
  display: "flex", alignItems: "center", justifyContent: "center",
};

export default function App() {
  const [activeTab, setActiveTab] = useState("Resumen");
  const S = SUMMARY;

  const tabs = [
    { name: "Resumen", icon: "📊" },
    { name: "Por Familia", icon: "🗂️" },
    { name: "Por Proveedor", icon: "🏢" },
    { name: "Por Piso", icon: "🏗️" },
    { name: "Por Servicio", icon: "🏥" },
    { name: "Por Producto", icon: "📦" },

    { name: "Por Fecha", icon: "📅" },
    { name: "Esp. Técnicas", icon: "📋" },
  ];

  const EETT_FILES = [
    { code: "201.001", name: "Estación de Trabajo", file: "EETT 201.001 ESTACION DE TRABAJO (REV2).pdf" },
    { code: "201.002", name: "Mesa Lateral", file: "EETT 201.002 MESA LATERAL (REV1).pdf" },
    { code: "201.003", name: "Mesa Párvulo Inclusión", file: "EETT 201.003 MESA PARVULO INCLUSION (REV1).pdf" },
    { code: "201.004", name: "Mesa Párvulo Tipo I", file: "EETT 201.004 MESA PARVULO TIPO I (REV1).pdf" },
    { code: "201.005", name: "Mesa Párvulo Tipo II", file: "EETT 201.005 MESA PARVULO TIPO II (REV1).pdf" },
    { code: "201.008", name: "Mesa Reuniones Tipo I", file: "EETT 201.008 MESA REUNIONES TIPO I (REV1).pdf" },
    { code: "201.009", name: "Mesa Reuniones Tipo II", file: "EETT 201.009 MESA REUNIONES TIPO II (REV3).pdf" },
    { code: "201.010", name: "Mesa Reuniones Tipo III", file: "EETT 201.010 MESA REUNIONES TIPO III (REV3).pdf" },
    { code: "201.011", name: "Mesa Tipo Casino", file: "EETT 201.011 MESA TIPO CASINO (REV1).pdf" },
    { code: "202.001", name: "Atril Graduable", file: "EETT 202.001 ATRIL GRADUABLE (REV1).pdf" },
    { code: "202.006", name: "Cama Apilable", file: "EETT 202.006 CAMA APILABLE (REV1).pdf" },
    { code: "202.008", name: "Cuna Alta", file: "EETT 202.008 CUNA ALTA (REV1).pdf" },
    { code: "202.009", name: "Cuna Baja", file: "EETT 202.009 CUNA BAJA (REV1).pdf" },
    { code: "202.012", name: "Mueble Locker", file: "EETT 202.012 MUEBLE LOCKER (REV1).pdf" },
    { code: "203.014", name: "Librero", file: "EETT 203.014 LIBRERO (REV1).pdf" },
    { code: "203.015", name: "Mueble Arrimo", file: "EETT 203.015 MUEBLE ARRIMO (REV1).pdf" },
    { code: "203.016", name: "Mueble Tipo Biblioteca", file: "EETT 203.016 MUEBLE TIPO BIBLIOTECA.pdf" },
    { code: "203.018", name: "Perchero", file: "EETT 203.018 PERCHERO (REV1).pdf" },
    { code: "203.022", name: "Contenedor", file: "EETT 203.022 CONTENEDOR.pdf" },
    { code: "204.001", name: "Banca", file: "EETT 204.001 BANCA (REV1).pdf" },
    { code: "204.002", name: "Banca Madera", file: "EETT 204.002 BANCA MADERA (REV1).pdf" },
    { code: "204.003", name: "Silla Adulto", file: "EETT 204.003 SILLA ADULTO (REV1).pdf" },
    { code: "204.005", name: "Silla Bacínica", file: "EETT 204.005 SILLA BACINICA (REV1).pdf" },
    { code: "204.006", name: "Silla Ergonómica", file: "EETT 204.006 SILLA ERGONOMICA (REV1).pdf" },
    { code: "204.007", name: "Silla Lactante", file: "EETT 204.007 SILLA LACTANTE (REV1).pdf" },
    { code: "204.009", name: "Silla Párvulo", file: "EETT 204.009 SILLA PARVULO (REV1).pdf" },
    { code: "204.010", name: "Silla Tipo Casino", file: "EETT 204.010 SILLA TIPO CASINO (REV1).pdf" },
    { code: "204.011", name: "Silla Tipo Universitaria", file: "EETT 204.011 SILLA TIPO UNIVERSITARIA (REV1).pdf" },
    { code: "204.012", name: "Silla Visita", file: "EETT 204.012 SILLA VISITA (REV1).pdf" },
    { code: "204.013", name: "Sillón 1 Cuerpo", file: "EETT 204.013 SILLON 1 CUERPO (REV1).pdf" },
    { code: "204.014", name: "Sillón 2 Cuerpo", file: "EETT 204.014 SILLON 2 CUERPO (REV1).pdf" },
    { code: "204.015", name: "Sillón Bergere", file: "EETT 204.015 SILLON BERGERE (REV1).pdf" },
    { code: "204.019", name: "Silla de Apoyo Hora Ingesta", file: "EETT 204.019 SILLA DE APOYO HORA INGESTA.pdf" },
    { code: "204.020", name: "Silla Butaca Espera 3 Cuerpos", file: "EETT 204.020 SILLA BUTACA ESPERA 3 CUERPOS.pdf" },
  ];

  const [selectedEETT, setSelectedEETT] = useState<string | null>(null);
  const [eettSearch, setEettSearch] = useState("");
  const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.bg,
      display: "flex",
    }}>
      
      {/* Sidebar */}
      <div style={{
        width: 240,
        background: COLORS.sidebar,
        borderRight: `1px solid ${COLORS.border}`,
        padding: "24px 0",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Logo */}
        <div style={{ 
          padding: "0 24px 32px 24px",
          borderBottom: `1px solid ${COLORS.border}`,
        }}>
          <img
            src="/logo-buin-paine.png"
            alt="Hospital Buin Paine"
            style={{ width: "100%", maxWidth: 160, display: "block" }}
          />
        </div>

        {/* Nav Items */}
        <div style={{ flex: 1, padding: "24px 16px" }}>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              style={{
                width: "100%",
                background: activeTab === tab.name ? `${COLORS.primary}10` : "transparent",
                color: activeTab === tab.name ? COLORS.primary : COLORS.textMuted,
                border: "none",
                padding: "12px 16px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 4,
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.name) {
                  e.currentTarget.style.background = COLORS.white;
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.name) {
                  e.currentTarget.style.background = "transparent";
                }
              }}>
              <span style={{ fontSize: 18 }}>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 40px" }}>
          
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ 
              fontSize: 32, 
              fontWeight: 700, 
              margin: 0,
              color: COLORS.text,
              fontFamily: "'Inter', sans-serif",
            }}>
              Dashboard Mobiliario No Clínico
            </h1>
            <p style={{ 
              fontSize: 14, 
              color: COLORS.textMuted, 
              margin: "8px 0 0 0",
              fontWeight: 500,
            }}>
              Hospital Buin Paine • Cronograma Dominion
            </p>
          </div>

          {/* Contenido */}
          {activeTab === "Resumen" && (
            <>
              {/* KPIs principales */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
                gap: 16,
                marginBottom: 32,
              }}>
                <KPICard 
                  label="Total Items" 
                  value={S.totalItems} 
                  sub="ítems" 
                  icon="📝" 
                  color={COLORS.primary} 
                />
                <KPICard 
                  label="Total Unidades" 
                  value={S.totalQty} 
                  sub="unidades" 
                  icon="📦" 
                  color={COLORS.green} 
                />
                <KPICard 
                  label="Recintos" 
                  value={S.uniqueRecintos} 
                  sub="espacios" 
                  icon="🏢" 
                  color={COLORS.orange} 
                />
                <KPICard 
                  label="Productos" 
                  value={S.uniqueNombres} 
                  sub="tipos" 
                  icon="🛋️" 
                  color={COLORS.purple} 
                />
              </div>

              {/* Status badges */}
              <SectionTitle action="Ver más">Estado del Inventario</SectionTitle>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: 16,
                marginBottom: 32,
              }}>
                <StatusBadge 
                  label="Familias" 
                  value={S.familias} 
                  color={COLORS.green} 
                  icon="✓" 
                />
                <StatusBadge 
                  label="Proveedores" 
                  value={S.proveedores} 
                  color={COLORS.orange} 
                  icon="⚡" 
                />
                <StatusBadge 
                  label="Servicios" 
                  value={S.uniqueServicios} 
                  color={COLORS.primary} 
                  icon="🏥" 
                />
                <StatusBadge 
                  label="Zonas" 
                  value={S.uniqueZonas} 
                  color={COLORS.purple} 
                  icon="⚠" 
                />
              </div>

              {/* Charts */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
                {/* Pie Chart */}
                <div style={{
                  background: COLORS.white,
                  borderRadius: 12,
                  padding: 24,
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}>
                  <h3 style={{ 
                    fontSize: 16, 
                    fontWeight: 700, 
                    color: COLORS.text, 
                    marginBottom: 20,
                    marginTop: 0,
                  }}>
                    Distribución por Familia
                  </h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={S.byFamilia}
                        dataKey="qty"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}>
                        {S.byFamilia.map((entry, i) => (
                          <Cell key={i} fill={PIE_FAMILIA_COLORS[entry.name] || CHART_COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        wrapperStyle={{ fontSize: 12, color: COLORS.textMuted }}
                        iconType="square"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div style={{
                  background: COLORS.white,
                  borderRadius: 12,
                  padding: 24,
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}>
                  <h3 style={{ 
                    fontSize: 16, 
                    fontWeight: 700, 
                    color: COLORS.text, 
                    marginBottom: 20,
                    marginTop: 0,
                  }}>
                    Top Proveedores
                  </h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={S.byProveedor}>
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: COLORS.textMuted, fontSize: 11 }}
                        axisLine={{ stroke: COLORS.border }}
                      />
                      <YAxis 
                        tick={{ fill: COLORS.textMuted, fontSize: 11 }}
                        axisLine={{ stroke: COLORS.border }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="qty" name="Cantidad" radius={[6, 6, 0, 0]}>
                        {S.byProveedor.map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top 5 */}
              <SectionTitle action="Ver todos">Top 5 Productos</SectionTitle>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
                gap: 16,
                marginBottom: 40,
              }}>
                {S.byNombre.slice(0, 5).map((p, i) => (
                  <KPICard 
                    key={i} 
                    label={p.name} 
                    value={p.qty} 
                    sub="uds" 
                    icon={["🥇", "🥈", "🥉", "4", "5"][i]}
                    color={CHART_COLORS[i]}
                    compact
                  />
                ))}
              </div>

              {/* Tabla de Datos Completa con Filtros */}
              <InventoryDataTable data={RAW} />
            </>
          )}

          {activeTab === "Por Familia" && (
            <>
              <SectionTitle count={S.familias}>Análisis por Familia</SectionTitle>
              
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "1.2fr 1fr", 
                gap: 20, 
                marginBottom: 32 
              }}>
                <div style={{
                  background: COLORS.white,
                  borderRadius: 12,
                  padding: 24,
                  border: `1px solid ${COLORS.border}`,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}>
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <Pie
                        data={S.byFamilia}
                        dataKey="qty"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={3}
                        label={(entry) => `${((entry.qty / S.totalQty) * 100).toFixed(1)}%`}>
                        {S.byFamilia.map((entry, i) => (
                          <Cell key={i} fill={PIE_FAMILIA_COLORS[entry.name] || CHART_COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: 13 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                  {S.byFamilia.map((f, i) => (
                    <KPICard
                      key={i}
                      label={f.name}
                      value={f.qty}
                      sub={`${((f.qty / S.totalQty) * 100).toFixed(1)}%`}
                      icon={["💺", "🪑", "🛋️", "📦"][i]}
                      color={PIE_FAMILIA_COLORS[f.name] || CHART_COLORS[i]}
                      compact
                    />
                  ))}
                </div>
              </div>

              <DataTable
                data={S.byFamilia.map((f, i) => ({
                  ...f,
                  rank: i + 1,
                  pctQty: ((f.qty / S.totalQty) * 100).toFixed(1) + "%",
                }))}
                columns={[
                  { key: "rank", label: "#", align: "center", mono: true, width: "60px" },
                  { key: "name", label: "Familia", highlight: true, width: "200px" },
                  { key: "qty", label: "Cantidad", align: "right", mono: true, width: "120px" },
                  { key: "pctQty", label: "% del Total", align: "right", mono: true, width: "120px" },
                  { 
                    key: "qty", 
                    label: "Distribución", 
                    render: (v) => <ProgressBar value={v} max={3233} color={COLORS.primary} /> 
                  },
                ]}
                maxRows={4}
              />
            </>
          )}

          {activeTab === "Por Proveedor" && (
            <>
              <SectionTitle count={S.proveedores}>Análisis por Proveedor</SectionTitle>
              
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
                gap: 16,
                marginBottom: 32,
              }}>
                {S.byProveedor.map((p, i) => (
                  <KPICard
                    key={i}
                    label={p.name}
                    value={p.qty}
                    sub={`${((p.qty / S.totalQty) * 100).toFixed(1)}%`}
                    icon={["🥇", "🥈", "🥉"][i] || "🏢"}
                    color={CHART_COLORS[i]}
                  />
                ))}
              </div>

              <div style={{
                background: COLORS.white,
                borderRadius: 12,
                padding: 24,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                marginBottom: 24,
              }}>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={S.byProveedor}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: COLORS.textMuted, fontSize: 11 }}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <YAxis 
                      tick={{ fill: COLORS.textMuted, fontSize: 11 }}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="qty" name="Cantidad" radius={[6, 6, 0, 0]}>
                      {S.byProveedor.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <DataTable
                data={S.byProveedor.map((p, i) => ({
                  ...p,
                  rank: i + 1,
                  pctQty: ((p.qty / S.totalQty) * 100).toFixed(1) + "%",
                }))}
                columns={[
                  { key: "rank", label: "#", align: "center", mono: true, width: "60px" },
                  { key: "name", label: "Proveedor", highlight: true },
                  { key: "qty", label: "Cantidad", align: "right", mono: true, width: "120px" },
                  { key: "pctQty", label: "% del Total", align: "right", mono: true, width: "120px" },
                  { 
                    key: "qty", 
                    label: "Distribución", 
                    render: (v) => <ProgressBar value={v} max={4256} color={COLORS.green} /> 
                  },
                ]}
                maxRows={3}
              />
            </>
          )}

          {activeTab === "Por Piso" && (
            <>
              <SectionTitle>Distribución por Piso</SectionTitle>
              
              <div style={{
                background: COLORS.white,
                borderRadius: 12,
                padding: 24,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                marginBottom: 24,
              }}>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={S.byPiso}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: COLORS.textMuted, fontSize: 12 }}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <YAxis 
                      tick={{ fill: COLORS.textMuted, fontSize: 11 }}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="qty" name="Cantidad" radius={[6, 6, 0, 0]}>
                      {S.byPiso.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <DataTable
                data={S.byPiso.map(p => ({
                  ...p,
                  pctQty: ((p.qty / S.totalQty) * 100).toFixed(1) + "%",
                }))}
                columns={[
                  { key: "name", label: "Piso", highlight: true, width: "150px" },
                  { key: "qty", label: "Cantidad", align: "right", mono: true, width: "120px" },
                  { key: "pctQty", label: "% del Total", align: "right", mono: true, width: "120px" },
                  { 
                    key: "qty", 
                    label: "Distribución", 
                    render: (v) => <ProgressBar value={v} max={1547} color={COLORS.orange} /> 
                  },
                ]}
              />

              <SectionTitle>Resumen por Piso</SectionTitle>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
                gap: 16,
              }}>
                {S.byPiso.map(p => (
                  <KPICard 
                    key={p.piso} 
                    label={p.name} 
                    value={p.qty} 
                    sub="unidades" 
                    icon={["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"][p.piso - 1]}
                    color={CHART_COLORS[p.piso - 1]} 
                    compact
                  />
                ))}
              </div>
            </>
          )}

          {activeTab === "Por Servicio" && (
            <>
              <SectionTitle count={S.uniqueServicios}>Cantidad por Servicio</SectionTitle>
              
              <div style={{
                background: COLORS.white,
                borderRadius: 12,
                padding: 24,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                marginBottom: 24,
              }}>
                <ResponsiveContainer width="100%" height={560}>
                  <BarChart data={S.byServicio.slice(0, 20)} layout="vertical" margin={{ left: 10 }}>
                    <XAxis 
                      type="number" 
                      tick={{ fill: COLORS.textMuted, fontSize: 11 }}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={200} 
                      tick={{ fill: COLORS.text, fontSize: 11 }}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="qty" name="Cantidad" radius={[0, 6, 6, 0]}>
                      {S.byServicio.slice(0, 20).map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <DataTable
                data={S.byServicio.map((s, i) => ({
                  ...s,
                  rank: i + 1,
                  pctQty: ((s.qty / S.totalQty) * 100).toFixed(1) + "%",
                }))}
                columns={[
                  { key: "rank", label: "#", align: "center", mono: true, width: "60px" },
                  { key: "name", label: "Servicio", highlight: true },
                  { key: "qty", label: "Cantidad", align: "right", mono: true, width: "120px" },
                  { key: "pctQty", label: "% del Total", align: "right", mono: true, width: "120px" },
                  { 
                    key: "qty", 
                    label: "Distribución", 
                    render: (v) => <ProgressBar value={v} max={825} color={COLORS.primary} /> 
                  },
                ]}
                maxRows={15}
              />
            </>
          )}

          {activeTab === "Por Producto" && (
            <>
              <SectionTitle count={S.uniqueNombres}>Top 25 Productos</SectionTitle>
              
              <div style={{
                background: COLORS.white,
                borderRadius: 12,
                padding: 24,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                marginBottom: 24,
              }}>
                <ResponsiveContainer width="100%" height={600}>
                  <BarChart data={S.byNombre} layout="vertical" margin={{ left: 10 }}>
                    <XAxis 
                      type="number" 
                      tick={{ fill: COLORS.textMuted, fontSize: 11 }}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={220} 
                      tick={{ fill: COLORS.text, fontSize: 11 }}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="qty" name="Cantidad" radius={[0, 6, 6, 0]}>
                      {S.byNombre.map((e, i) => {
                        const c = e.name.includes("Silla") || e.name.includes("Sillón") ? PIE_FAMILIA_COLORS.Silla
                          : e.name.includes("Escritorio") || e.name.includes("Mesa") ? PIE_FAMILIA_COLORS.Mesa
                          : e.name.includes("Mueble") || e.name.includes("Banca") ? PIE_FAMILIA_COLORS.Otro
                          : CHART_COLORS[i % CHART_COLORS.length];
                        return <Cell key={i} fill={c} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <DataTable
                data={S.byNombre.map((n, i) => ({
                  ...n,
                  rank: i + 1,
                  pctQty: ((n.qty / S.totalQty) * 100).toFixed(1) + "%",
                }))}
                columns={[
                  { key: "rank", label: "#", align: "center", mono: true, width: "60px" },
                  { key: "name", label: "Producto", highlight: true },
                  { key: "qty", label: "Cantidad", align: "right", mono: true, width: "120px" },
                  { key: "pctQty", label: "% del Total", align: "right", mono: true, width: "120px" },
                  { 
                    key: "qty", 
                    label: "Distribución", 
                    render: (v) => <ProgressBar value={v} max={1285} color={COLORS.orange} /> 
                  },
                ]}
                maxRows={15}
              />
            </>
          )}


          {activeTab === "Por Fecha" && (
            <>
              <SectionTitle icon="📅">Cronograma de Instalación</SectionTitle>
              
              {/* KPIs de fechas */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
                gap: 16,
                marginBottom: 32,
              }}>
                <KPICard 
                  label="Fecha Inicio" 
                  value={S.fechaStats.fechaMin} 
                  sub="primera instalación" 
                  icon="🚀" 
                  color={COLORS.green} 
                  compact
                />
                <KPICard 
                  label="Fecha Término" 
                  value={S.fechaStats.fechaMax} 
                  sub="última instalación" 
                  icon="🏁" 
                  color={COLORS.orange} 
                  compact
                />
                <KPICard 
                  label="Meses" 
                  value={S.fechaStats.totalMeses} 
                  sub="de instalación" 
                  icon="📆" 
                  color={COLORS.primary} 
                  compact
                />
                <KPICard 
                  label="Semanas" 
                  value={S.fechaStats.totalSemanas} 
                  sub="programadas" 
                  icon="📊" 
                  color={COLORS.purple} 
                  compact
                />
              </div>

              {/* Gráfico por mes */}
              <SectionTitle>Distribución Mensual</SectionTitle>
              <div style={{
                background: COLORS.white,
                borderRadius: 12,
                padding: 24,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                marginBottom: 24,
              }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={S.byMes}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: COLORS.textMuted, fontSize: 12 }}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <YAxis 
                      tick={{ fill: COLORS.textMuted, fontSize: 11 }}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="qty" name="Cantidad" radius={[6, 6, 0, 0]}>
                      {S.byMes.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Tabla mensual */}
              <DataTable
                data={S.byMes.map((m, i) => ({
                  ...m,
                  rank: i + 1,
                  pctQty: ((m.qty / S.totalQty) * 100).toFixed(1) + "%",
                }))}
                columns={[
                  { key: "rank", label: "#", align: "center", mono: true, width: "60px" },
                  { key: "name", label: "Mes", highlight: true, width: "200px" },
                  { key: "qty", label: "Cantidad", align: "right", mono: true, width: "120px" },
                  { key: "pctQty", label: "% del Total", align: "right", mono: true, width: "120px" },
                  { 
                    key: "qty", 
                    label: "Distribución", 
                    render: (v) => <ProgressBar value={v} max={4069} color={COLORS.primary} /> 
                  },
                ]}
                maxRows={4}
              />

              {/* Top semanas */}
              <SectionTitle>Top 5 Semanas con Más Instalaciones</SectionTitle>
              <div style={{
                background: COLORS.white,
                borderRadius: 12,
                padding: 24,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                marginBottom: 24,
              }}>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={S.bySemana}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: COLORS.textMuted, fontSize: 11 }}
                      axisLine={{ stroke: COLORS.border }}
                      angle={-15}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      tick={{ fill: COLORS.textMuted, fontSize: 11 }}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="qty" name="Cantidad" radius={[6, 6, 0, 0]}>
                      {S.bySemana.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Top días */}
              <SectionTitle>Top 5 Días con Más Instalaciones</SectionTitle>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                gap: 16,
                marginBottom: 24,
              }}>
                {S.byDia.map((d, i) => (
                  <StatusBadge
                    key={i}
                    label={d.name}
                    value={d.qty}
                    color={CHART_COLORS[i]}
                    icon={["🥇", "🥈", "🥉", "4", "5"][i]}
                  />
                ))}
              </div>

              {/* Alerta de pico */}
              <div style={{
                background: `${COLORS.orange}10`,
                border: `1px solid ${COLORS.orange}40`,
                borderRadius: 12,
                padding: 20,
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  background: COLORS.orange,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}>
                  ⚠️
                </div>
                <div>
                  <div style={{ 
                    fontSize: 16, 
                    fontWeight: 700, 
                    color: COLORS.text,
                    marginBottom: 6,
                  }}>
                    Pico de Instalación Detectado
                  </div>
                  <div style={{ 
                    fontSize: 14, 
                    color: COLORS.textMuted,
                    lineHeight: 1.5,
                  }}>
                    El 01/07/2026 concentra <strong style={{color: COLORS.text}}>2,924 unidades</strong> ({((2924/S.totalQty)*100).toFixed(1)}% del total). 
                    Se recomienda coordinar recursos adicionales de instalación para esta fecha.
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "Esp. Técnicas" && (
            <>
              <SectionTitle count={`${EETT_FILES.length}`}>Especificaciones Técnicas de Mobiliario</SectionTitle>

              {/* Barra de búsqueda + chips en una sola fila */}
              <div style={{
                background: COLORS.white,
                borderRadius: 12,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                height: 48,
              }}>
                {/* Input fijo a la izquierda */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "0 14px", borderRight: `1px solid ${COLORS.border}`,
                  flexShrink: 0, height: "100%",
                }}>
                  <span style={{ fontSize: 14, color: COLORS.textMuted }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={eettSearch}
                    onChange={(e) => setEettSearch(e.target.value)}
                    style={{
                      width: 140, padding: "0", border: "none", outline: "none",
                      fontSize: 13, color: COLORS.text, background: "transparent",
                    }}
                  />
                  {eettSearch && (
                    <button
                      onClick={() => setEettSearch("")}
                      style={{ border: "none", background: "none", cursor: "pointer", color: COLORS.textMuted, fontSize: 16, lineHeight: 1, padding: 0 }}
                    >×</button>
                  )}
                </div>

                {/* Chips desplazables horizontalmente */}
                <div style={{
                  display: "flex", gap: 6, alignItems: "center",
                  overflowX: "auto", padding: "0 12px", flex: 1, height: "100%",
                  scrollbarWidth: "none",
                }}>
                  {(() => {
                    const filtered = EETT_FILES.filter(f =>
                      normalize(f.name).includes(normalize(eettSearch)) ||
                      normalize(f.code).includes(normalize(eettSearch))
                    );
                    if (filtered.length === 0)
                      return <span style={{ fontSize: 12, color: COLORS.textMuted, whiteSpace: "nowrap" }}>Sin resultados para "{eettSearch}"</span>;
                    return filtered.map((f) => (
                      <button
                        key={f.code}
                        onClick={() => { setSelectedEETT(f.file); setEettSearch(""); }}
                        style={{
                          padding: "4px 11px", borderRadius: 20, flexShrink: 0,
                          border: `1px solid ${selectedEETT === f.file ? COLORS.primary : COLORS.border}`,
                          background: selectedEETT === f.file ? COLORS.primary : COLORS.bg,
                          color: selectedEETT === f.file ? COLORS.white : COLORS.text,
                          fontSize: 12, fontWeight: selectedEETT === f.file ? 600 : 400,
                          cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s ease",
                        }}
                      >
                        <span style={{ fontFamily: "monospace", fontSize: 10, opacity: 0.7, marginRight: 4 }}>{f.code}</span>
                        {f.name}
                      </button>
                    ));
                  })()}
                </div>
              </div>

              {/* Visor PDF — ancho completo */}
              <div style={{
                background: COLORS.white,
                borderRadius: 12,
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                minHeight: 700,
              }}>
                {selectedEETT ? (
                  <>
                    <div style={{
                      padding: "11px 16px",
                      borderBottom: `1px solid ${COLORS.border}`,
                      background: COLORS.bg,
                      fontSize: 13, fontWeight: 600, color: COLORS.text,
                      display: "flex", alignItems: "center", gap: 8,
                    }}>
                      <span style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.primary }}>
                        {EETT_FILES.find(f => f.file === selectedEETT)?.code}
                      </span>
                      <span style={{ color: COLORS.textMuted }}>—</span>
                      {EETT_FILES.find(f => f.file === selectedEETT)?.name}
                    </div>
                    <PdfViewer key={selectedEETT} url={`/eett/${encodeURIComponent(selectedEETT)}`} />
                  </>
                ) : (
                  <div style={{
                    flex: 1, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    color: COLORS.textMuted, gap: 12, minHeight: 500,
                  }}>
                    <div style={{ fontSize: 48 }}>📋</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.text }}>Selecciona una especificación</div>
                    <div style={{ fontSize: 13 }}>Busca por nombre o código y haz clic en el chip para ver la ficha técnica</div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Footer */}
          <div style={{
            marginTop: 48,
            padding: "20px 0",
            borderTop: `1px solid ${COLORS.border}`,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: COLORS.textMuted,
          }}>
            <span>Hospital Buin Paine • Mobiliario No Clínico</span>
            <span>Fuente: MNC_Claude_20260209.xlsx • {S.totalQty.toLocaleString("es-CL")} unidades</span>
          </div>
        </div>
      </div>
    </div>
  );
}
