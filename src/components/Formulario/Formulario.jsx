import {useEffect, useState} from "react";
import Axios from "axios";

const Formulario = () => {
    const [actores, setActores]= useState([]);

    const [registro, setRegistro] = useState({
        nombre: "",
        apellido: "",
        pais: "",
        fechanacimiento: "2011-10-10",
        foto: "",
    });

    useEffect( () => {
        obtenerTodosLosActores();
    }, [])

    useEffect(() => {
        console.log(registro);
    }, [registro]);


    //LLAMADOS A LAS APIs
    //GET
    const obtenerTodosLosActores = async () => {
       const respuesta = await Axios.get("http://localhost:5000/actores");
       setActores(respuesta.data);
    };
    
    //POST
    const handleClickNuevo = async () => {
        const respuesta = await Axios.post(
          "http://localhost:5000/actores",
          registro
        );
        console.log(respuesta.data);
        obtenerTodosLosActores();
        limpiarCampos();
      };


    //FUNCIONES PROPIAS DEL FORMULARIO
    const handleClickEliminar = async (id) => {
        console.log(id);
        const respuesta = await Axios.delete(`http://localhost:5000/actores/${id}`);
        console.log(respuesta.data);
        obtenerTodosLosActores();
    };

    const limpiarCampos = () => {
    setRegistro({
        nombre: "",
        apellido: "",
        pais: "",
        fechanacimiento: "2011-10-10",
        foto: "",
    });
    };

    const handleChange = (e) => {
        setRegistro({ ...registro, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => e.preventDefault();

    return(
        <>
            <h1>Actores y actrices de TV Arg</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                name="nombre"
                placeholder="nombre"
                onChange={(e) => handleChange(e)}
                value={registro && registro.nombre} //PREGUNTAR cómo funciona. Si no está, no se limpian los input luego de enviar.
                />{" "}
                <br />
                <input
                name="apellido"
                placeholder="apellido"
                onChange={(e) => handleChange(e)}
                value={registro && registro.apellido}
                />
                <br />
                <input
                name="pais"
                placeholder="pais"
                onChange={(e) => handleChange(e)}
                value={registro && registro.pais}
                />
                <br />
                <input
                name="foto"
                placeholder="foto"
                onChange={(e) => handleChange(e)}
                value={registro && registro.foto}
                />
                <br />
                <button onClick={() => handleClickNuevo()}>Agregar</button>
            </form>


            {
                actores && actores.map((item) => {
                        return (
                            <>
                                <h3>Nombre y Apellido</h3>
                                <p> {item.nombre} {item.apellido} </p>
                                <h3>País de origen</h3>
                                <p> {item.pais} </p>
                                <h3> Fecha de nacimiento </h3>
                                <p> {item.fechanacimiento} </p>
                                <h3> Foto </h3>
                                <img src={item.foto} alt={item.nombre}/> <br/>

                                {/* PREGUNTAR! Si no paso "() =>" antes de handleClick... BORRA todo */}
                                {/* Eso sucede porque al no estar los (), se ejecuta la función de eliminar SIN que se haya producido el evento  */}
                                <button style= { {backgroundColor:"red", color:"white"} } onClick={ () => handleClickEliminar(item.id) }>
                                    Eliminar
                                </button>
                            </>
                        )
                    }
                )
            }
        </>
    );
};

export default Formulario;

