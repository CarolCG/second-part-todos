import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	function ObtenerPost(){
		fetch("https://assets.breatheco.de/apis/fake/todos/user/belu", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
		    body: JSON.stringify([])})
		.then((response)=>response.json())
		.then((data)=>console.log(data))
	}
function ObtenerGet(){
	fetch("https://assets.breatheco.de/apis/fake/todos/user/belu", {
			method: "GET",
			headers: {"Content-Type": "application/json"},
		    })
		.then((response)=>response.json())
		.then((data)=>{console.log(data);setlistaTareas(data)})
}
function ObtenerPut(){
	fetch("https://assets.breatheco.de/apis/fake/todos/user/belu", {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
		    body: JSON.stringify(listaTareas)})
		.then((response)=>response.json())
		.then((data)=>console.log(data))
}
function ObtenerDelete(id){
	setlistaTareas([])
	if(listaTareas.length === 1){
		setnoTareas("")
	}
}
	useEffect(() => {
		ObtenerGet()
		}
	, [])

useEffect(()=>{
	ObtenerPut()
},listaTareas)

useEffect(()=>{
	ObtenerDelete()
},[])



	const [tareas, setTareas] = useState("")
	const [listaTareas, setlistaTareas] = useState([])
	const [noTareas, setnoTareas] = useState("")

	function handleTareas (e) {
		if(e.key === "Enter") {
			e.preventDefault()
			if(tareas === ""){
				alert("Falta informacion")
			}else{setlistaTareas([...listaTareas,{"label":tareas,"done":false}])
			console.log(listaTareas)
			setnoTareas("visually-hidden")
			setTareas("")
		}
			
		}

	}
	function eliminarTareas(id){
		setlistaTareas(listaTareas.filter((tarea,index) => index !== id))
		if(listaTareas.length === 1){
			setnoTareas("")
		}

	}
	return (
		<div className="container text-center">
			<h1 className="fw-light ">Todos</h1>
		<ul className="list-group list-group-flush">
  <li className="list-group-item fw-light"> <input className="w-100 border border-0 fs-5" type="text" placeholder="What needs to be done?" onChange={(e)=> setTareas(e.target.value)} value={tareas} onKeyDown={handleTareas} ></input></li>
  <li className={"list-group-item  fw-light "+ noTareas}>No hay tareas, añadir tareas</li>
  {listaTareas.map((tarea, id) => <li id="cruz" className="list-group-item fs-5 d-flex justify-content-between"  key={id}>{tarea.label}<button id="eliminarcruz" type="button" className="btn-close fs-6 mt-1 " aria-label="Close" onClick={()=> eliminarTareas(id)}></button></li>)}
  <li className="list-group-item  fw-light">{listaTareas.length} item left</li>
</ul>
<button onClick={ObtenerDelete}>Eliminar Todas las Tareas</button>
</div>
	);
};

export default Home;
