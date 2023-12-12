const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.static('public'));
app.use(express.json());
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "W3llc0m3@",
    database: "nakama_store",
});
connection.connect((err) => {
    if (err) {
        return console.err(`err: ${message.err}`);
    };
    console.log(`Connect to MYSQL!!`);
});
/**--------------------------------------------------Funciones útiles----------------------------------------------------------------------------*/
let handleSQLError = (response, error, result, callback) => {
    if (error) {
        response.status(400).send(`error: ${error.message}`);
        return;
    };
    callback(result);
};
/**---------------------------------------------------Fin funciones útiles------------------------------------------------------------------*/
/**-------------------------------------------------Endpoint Login y Registro-------------------------------------------------------------------------------*/
/*-----------------------------------------------------------Login--------------------------------------------------------------------------------*/
app.post(`/login`, (request, response) => {
    console.log(request.body)
    let email = request.body.email;
    let password = request.body.password;
    connection.query(`select id as userId,nombre as name from usuarios where email='${email}' and password='${password}'`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            console.log(result);
            if (result.length == 0) {
                response.send({ message: `El usuario no se encuentra registrado` })
            } else {
                response.send(result[0])
            };
        });
    });
});
/*----------------------------------------------------Registro usuario--------------------------------------------------------------------------*/
app.post(`/registrar`, (request, response) => {
    let nombre = request.body.nombre;
    let apellidos = request.body.apellidos;
    let email = request.body.email;
    let password = request.body.password;
    connection.query(`select id from usuarios where email='${email}'`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            if (result.length == 0) {
                connection.query(`insert into usuarios (nombre,apellidos,email,password) values ('${nombre}','${apellidos}','${email}','${password}')`, (error, result, fields) => {
                    handleSQLError(response, error, result, (result) => {
                        response.send({ message: `Usuario registrado con éxito.` });
                    });
                });
            } else {
                response.send({ message: `El email ya está registrado.` });
            };
        });
    });
});
/**---------------------------------------------------Endpoints productos-----------------------------------------------------------------*/
/*----------------------------------------------------Query de productos-----------------------------------------------------------------*/
app.get(`/productos`, (request, response) => {
    connection.query(`SELECT * FROM productos`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            response.send(result);
        });
    });
});
/**-----------------------------------------------------Seleccion productos-----------------------------------------------------------------------------------*/
app.get(`/seleccionProducto/:cant/:num`,(request,response)=>{
    connection.query(`select * from productos limit ${request.params.cant} offset ${request.params.num}`,(error,result,fields)=>{
        handleSQLError(response,error,result,(result)=>{
            response.send(result)
        });
    });
});
/**-----------------------------------------------------Query de ofertas-------------------------------------------------------------------------------*/
app.get(`/ofertas`, (request, response) => {
    connection.query(`select nombre,precio,imagen_producto,tipo,id from productos where oferta=1`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            response.send(result);
        });
    });
});
/*-----------------------------------------------------Query de un producto------------------------------------------------------------------*/
app.get(`/productos/:id`, (request, response) => {
    let productoId = request.params.id;
    connection.query(`select * from productos where id=${productoId}`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            response.send(result[0]);
        });
    });
});
/*------------------------------------------------------Query registrar producto nuevo----------------------------------------------------------*/
app.post(`/productos`, (request, response) => {
    let productoRef = request.body.referencia;
    connection.query(`select id from productos where referencia='${productoRef}'`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            if (result.length == 0) {
                console.log(request.body);
                connection.query(`insert into productos (nombre,precio,descripcion_corta,imagen_producto,descripcion_larga,stock,cantidad,referencia,tipo,oferta,personaje) 
                values('${request.body.nombre}',${request.body.precio},'${request.body.descripcion_corta}','${request.body.imagen_producto}','${request.body.descripcion_larga}',${request.body.stock},
                ${request.body.cantidad},'${request.body.referencia}','${request.body.tipo}',${request.body.oferta},'${request.body.personaje}')`, (error, result, fields) => {
                    handleSQLError(response, error, result, (result) => {
                        response.send({ message: `El producto se ha añadido correctamente.` });
                    });
                });
            } else {
                response.send({ message: `El producto ya se encuentra registrado.` })
            };
        });
    });
});
/*----------------------------------------------------------Query de update producto-----------------------------------------------------------*/
app.post(`/productos/:id`, (request, response) => {
    let productoId = request.params.id;
    connection.query(`Select referencia from productos where id='${productoId}'`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            if (result.length == 0) {
                response.send({ message: `El producto no se encuentra registrado.` });
            } else {
                connection.query(`update productos set nombre='${request.body.nombre}',precio='${request.body.precio}',
                    descripcion_corta='${request.body.descripcion_corta}',imagen_producto='${request.body.imagen_producto}',descripcion_larga='${request.body.descripcion_larga}',
                    stock='${request.body.stock}',cantidad='${request.body.cantidad}',referencia='${request.body.referencia}',tipo='${request.body.tipo}',oferta='${request.body.oferta}', personaje='${request.body.personaje}' where id='${productoId}'`, (error, result, fields) => {
                    handleSQLError(response, error, result, (result) => {
                        response.send({ message: `El producto ha sido actualizado con éxito.` })
                    });
                });
            };
        });
    });
});
/*----------------------------------------------------------Eliminar un producto---------------------------------------------------------*/
app.post(`/eliminarPorducto/:id`, (request, response) => {
    let productoId = request.params.id;
    connection.query(`delete from productos where id=${productoId}`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            response.send({ messagge: `El producto ha sido eliminado.` });
        });
    });
});
/**---------------------------------------------------------Fin Endpoints productos------------------------------------------------------------------*/
/**---------------------------------------------------------Endpoints de carrito-------------------------------------------------------------- */
/**Selecciono la compra sin finalizar de un usuario--------------------------------------------------------------------------------*/
app.get(`/compra/:id`, (request, response) => {
    let userId = request.params.id;
    connection.query(`select id from compra where usuario_id=${userId} and pagado =0`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            if (result.length == 0) {
                response.send({ id: 0 })
            } else {
                response.send(result[0]);
            }

        });
    });
});
/**Creo una compra nueva--------------------------------------------------------------------------------------------------------*/
app.post(`/compraNueva/:id/:producto`, (request, response) => {
    let user = request.params.id;
    let producto = request.params.producto;
    connection.query(`insert into compra (usuario_id) values (${user})`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            response.send(result);
        });
    });
});
/**Añado productos al carrito */
app.post(`/addProducto/:id/:producto`, (request, response) => {
    let compra = request.params.id;
    let producto = request.params.producto;
    connection.query(`select id,cantidad from compraproducto where compra_id=${compra} and producto_id=${producto}`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {

            if (result.length == 0) {
                connection.query(`insert into compraproducto(compra_id,producto_id,cantidad) values (${compra},${producto},1)`, (error, result, fields) => {
                    handleSQLError(response, error, result, (result) => {
                        response.send({ message: `Artículo añadido correctamente` });
                    });
                });
            } else {
                let comProd = result[0].id;
                let cantidad = result[0].cantidad + 1;
                connection.query(`update compraproducto set cantidad =${cantidad} where id=${comProd}`, (error, result, fields) => {
                    handleSQLError(response, error, result, (result) => {
                        response.send({ message: `Artículo actualizado correctamente` });
                    });
                });

            }
        })
    })

})
/**Me traigo el número de elementos en el carrito-------------------------------------------------------------------------------- */
app.get(`/elementos/:id`, (request, response) => {
    connection.query(`select sum(cantidad) as cantidad from compraproducto join compra on compraproducto.compra_id=compra.id where compra.id=${request.params.id}`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            response.send(result[0]);
        });
    });
})
/**Me traigo los datos de una compra determinada-------------------------------------------------------------------------------------------*/
app.get(`/carrito/:id`, (request, response) => {
    let carrId = request.params.id;
    connection.query(`SELECT productos.id,productos.imagen_producto, productos.nombre,productos.precio,compraproducto.cantidad from compra JOIN compraproducto ON compra.id=compraproducto.compra_id JOIN productos ON compraproducto.producto_id=productos.id WHERE compra.id = '${carrId}'`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            if (result.length == 0) {
                response.send({ message: `No hay compra` })
            } else {
                response.send(result);
            }

        });
    });
});

/**-------------------------------------------Modificar cantidades de una compra----------------------------------------------------------------------------*/
/**Añadir cantidad de un producto */
app.post(`/addCantidad/:id/:cantidad`, (request, response) => {
    let prodId = request.params.id;
    let prodCant = parseInt(request.params.cantidad) + 1;
    connection.query(`update compraproducto set cantidad =${prodCant} where producto_id=${prodId} and compra_id=${request.body.compra_id}`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            response.send({ message: `cantidad actualizada` })
        });
    });
});
/**Restar cantidad de un producto */
app.post(`/remCantidad/:id/:cantidad`, (request, response) => {
    let prodId = request.params.id;
    let prodCant = parseInt(request.params.cantidad) - 1;
    connection.query(`update compraproducto set cantidad =${prodCant} where producto_id=${prodId} and compra_id=${request.body.compra_id}`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            response.send({ message: `cantidad actualizada` })
        });
    });
});
/**Eliminar productos de carrito */
app.post(`/deleteProduct/:id`, (request, response) => {
    let prodId = request.params.id;
    connection.query(`delete from compraproducto where producto_id=${prodId} and compra_id=${request.body.compra_id}`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            response.send({ message: `artículo eliminado del carrito` });
        });
    });
})
/**Insertar precio en compra */
app.post(`/precio/:id`, (request, response) => {
    console.log(request.body)
    let comId = request.params.id;
    let precio = request.body.precio_final;
    connection.query(`update compra set precio_final=${precio} where id=${comId}`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            response.send({ message: `Precio añadido` })
        });
    });
});
/**Me traigo  las tarjetas de una compra */
app.get(`/formapago/:id`, (request, response) => {
    let comId = request.params.id;
    connection.query(`select * from formaspago where id=(select formapago_id from compra where id=${comId})`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            response.send(result[0]);
        });
    });
});
/**Me traigo todos los datos de una tarjeta en concreto */
app.get(`/tarjeta/:id`, (request, response) => {
    let cardId = request.params.id;
    connection.query(`select * from formaspago where id=${cardId}`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            let nuevaTarjeta = "";
            for (let i = 0; i < result[0].n_tarjeta.length; i++) {
                if (i < 12) {
                    nuevaTarjeta += "*";
                } else {
                    nuevaTarjeta += result[0].n_tarjeta[i]
                };
            };
            result[0].n_tarjeta = nuevaTarjeta,
                response.send(result[0]);
        });
    });
});
/**Me traigo todas las tarjetas de un usuario */
app.get(`/tarjetas/:id`, (request, response) => {
    let usuId = request.params.id;
    connection.query(`select * from formaspago where usuario_id=${usuId}`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            for (let i = 0; i < result.length; i++) {
                let nuevaTarjeta = "";
                for (let j = 0; j < result[i].n_tarjeta.length; j++) {
                    if (j < 12) {
                        nuevaTarjeta += "*";
                    } else {
                        nuevaTarjeta += result[i].n_tarjeta[j];
                    };
                };
                result[i].n_tarjeta = nuevaTarjeta;
            };
            response.send(result);
        });
    });
});
/**Ingresar una tarjeta nueva a un usuario */
app.post(`/tarjetas/:id/:numero`, (request, response) => {
    let id = request.params.id;
    console.log(id)
    let numero = request.params.numero;
    console.log(numero)
    connection.query(`select * from formaspago where usuario_id=${id} and n_tarjeta='${numero}'`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {
            console.log(result[0])
            if (result.length == 0) {
                connection.query(`insert into formaspago (usuario_id,n_tarjeta,titular_tarjeta,caducidad,cvv) values (${id},'${request.body.n_tarjeta}','${request.body.titular_tarjeta}',
                '${request.body.caducidad}','${request.body.cvv}')`, (error, result, fields) => {
                    handleSQLError(response, error, result, (result) => {
                        response.send({ message: `Tarjeta añadida.` });
                    });
                });
            } else {
                response.send({ message: `La tarjeta ya está registrada.` });
            };
        });
    });
});
/**Meter la tarjeta en compra */
app.post(`/tarjeta/:id`, (request, response) => {
    let compraId = request.params.id;
    let cvv = request.body.cvv;
    console.log(cvv)
    let cad = request.body.caducidad;
    console.log(cad)
    if (request.params.num == "") {
        response.send({ message: `Debe introducir un número de tarjeta válido` })
    } else {
        connection.query(`select id from formaspago where cvv=${cvv} and caducidad='${cad}'`, (error, result, fields) => {
            let pagoId = result[0].id;
            console.log(pagoId)
            handleSQLError(response, error, result, (result) => {
                connection.query(`update compra set formapago_id=${pagoId} where id=${compraId}`, (error, result, fields) => {
                    handleSQLError(response, error, result, (result) => {
                        response.send({ message: `Forma de pago añadida` })
                    });
                });
            });
        });
    };
});



/*Ingresar dirección de envío nueva*/
app.post(`/direccion/:id`, (request, response) => {
    let comId = request.params.id;
    console.log(comId)
    let dirId = 0;
    connection.query(`select id from direccion_envio where email='${request.body.email}' and direccion='${request.body.direccion}' and cp='${request.body.cp}'`, (error, result, fields) => {
        handleSQLError(response, error, result, (result) => {


            if (result.length == 0) {
                connection.query(`insert into direccion_envio(nombre, apellidos, telefono, email, direccion, cp, poblacion, provincia) values ('${request.body.nombre}','${request.body.apellidos}','${request.body.telefono}','${request.body.email}','${request.body.direccion}','${request.body.cp}','${request.body.poblacion}','${request.body.provincia}')`, (error, result, fields) => {
                    handleSQLError(response, error, result, (result) => {
                        dirId = result.insertId;

                    })
                })
            } else {
                dirId = result[0].id

            }
            connection.query(`update compra set direccionenvio_id=${dirId} where id=${comId}`, (error, result, fields) => {
                handleSQLError(response, error, result, (result) => {
                    connection.query(`update compra set pagado=1 where id=${comId}`, (error, result, fields) => {
                        handleSQLError(response, error, result, (result) => {
                            response.send({ message: `Compra finalizada` })
                        })
                    })
                });
            });
        });
    });
});



/**---------------------------------------------------------Fin Endpoints carrito-----------------------------------------------------------------------------------------------------------*/
app.listen(3000, () => {
    console.log(`Server up and running on 3000!!`);
});