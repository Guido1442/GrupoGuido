import { DiccionariosTablas } from "./diccionariosGetTablas.js";

function dom(tag:string, attrs?:Record<string, string>, children?:(HTMLElement|Text)[]) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs || {})) {
        el.setAttribute(key, value);
    }
    for (const child of children || []) {
        el.appendChild(child);
    }
    return el;
}

function text(text:string) {
    return document.createTextNode(text);
}

function cel(row:HTMLTableRowElement, textContent:string|undefined) {
    var celda = row.insertCell();
    celda.textContent = textContent || '-';
    return celda;
}

window.addEventListener('load', async function() {
    const tabla = window.location.pathname.split('/')[2];
    console.log(tabla);
    const datosTabla = DiccionariosTablas.find(t => t.tabla === tabla);
    document.body.innerHTML = ``;
    var table = dom('table', {id:'tabla'}, []) as HTMLTableElement;
    var comoOrdenar = dom('small', {}, [text("Para ordenar la tabla por una columna, haga click en el nombre de la columna.")]);
    var comoOrdenar2 = dom('small', {}, [text("Para ordenar de forma descendente, haga click nuevamente.")]);
    var main = dom('div', {className:'main'}, [
        dom('h1', {}, [text(datosTabla!.text)]),
        comoOrdenar,
        dom('br'),
        comoOrdenar2,
        dom('br'),
        dom('br'),
        table
    ]);
    document.body.appendChild(main);

    //Boton de creacion
    var botonCrear = dom('button', { class: 'boton-crear', type: 'button' }, [text(datosTabla!.crear)]) as HTMLButtonElement;
    botonCrear.onclick = () => {
        if(datosTabla != undefined){
            const urlCreacion = datosTabla.urlCreacion;
            console.log(`Abriendo ventana para crear un/una ${tabla}`);
            window.location.href = urlCreacion;
        }
    };

    // Boton para volver al menu
    var botonMenu = dom('button', { class: 'boton-menu', type: 'button' }, [text('<- Menu')]) as HTMLButtonElement;
    botonMenu.onclick = () => {
        window.location.href = 'menu'
    }

    main.appendChild(document.createElement('br'));
    main.appendChild(botonCrear);
    main.appendChild(botonMenu)
    var row = table.insertRow();

    //Sacar de la URL como se va a ordenar la tabla
    let ordenarPor = (new URLSearchParams(window.location.search)).get("ordenarpor");
    let isDesc = ordenarPor ? ordenarPor.endsWith("_desc") : false;
    if (ordenarPor && isDesc) ordenarPor = ordenarPor.slice(0, -5);
    let columnas: string[] = [];

    let i = 0;
    for (const campo of datosTabla!.campos){
        let celda = cel(row, campo);
        let indice = i
        celda.onclick = () => {
            let columna = columnas[indice]!;
            if (ordenarPor == columna && !isDesc) columna += "_desc"
            const url = new URL(window.location.href);
            url.searchParams.set("ordenarpor", columna);
            location.href = url.toString();
        }
        i++;
    }
    var req = await fetch('/api/v0/' + (datosTabla!.tabla === 'alumno' ? 'alumnos' : datosTabla!.tabla) + '/');
    var data = await req.json();

    // Funcion de sorting que maneja null, fechas, numeros y strings
    // Tomamos como fecha de ordenamiento el timezone argentino de dd/mm/yyyy
    const customSort = (a: any, b: any, columna: string) => {
        let valA = a[columna];
        let valB = b[columna];

        if (valA === null || valA === undefined) return (valB === null || valB === undefined) ? 0 : 1;
        if (valB === null || valB === undefined) return -1;

        const normalizeDate = (value: string): string => {
            if (typeof value === 'string' && value.length >= 10 && value.match(/^\d{2}\/\d{2}\/\d{4}/)) {
                const partes = value.slice(0, 10).split('/');
                if (partes.length === 3) {
                    return `${partes[2]}/${partes[1]}/${partes[0]}`;
                }
            }
            return value;
        };

        const normalizedA = normalizeDate(valA);
        const normalizedB = normalizeDate(valB);

        const dateA = new Date(normalizedA);
        const dateB = new Date(normalizedB);
        const isDate = !isNaN(dateA.getTime()) && !isNaN(dateB.getTime());

        let comparison = 0;

        if (isDate) {
            comparison = dateA.getTime() - dateB.getTime();
        }
        else {
            const isNumeric = !isNaN(parseFloat(valA)) && isFinite(valA);
            if (isNumeric) {
                const numA = parseFloat(valA);
                const numB = parseFloat(valB);
                comparison = numA - numB;
            }
            else {
                comparison = valA.toString().localeCompare(valB.toString());
            }
        }

        return comparison;
    };


    if (data.length > 0) {
        columnas = Object.keys(data[0]);
        if (ordenarPor) {
            data.sort((a:any, b:any) => customSort(a, b, ordenarPor!));
            if (isDesc) data.reverse();
        }
    }

    data.forEach((registro:Record<string, string>) => {
        var row = table.insertRow();
        for (const elemento of Object.entries(registro)){
            cel(row, elemento[1]);
        }

        // Creacion boton editar
        var botonEditar = dom('button', { class: 'boton-editar' }, [text('Editar')]) as HTMLButtonElement;

        botonEditar.onclick = () => {
            const pk = datosTabla!.pk;
            let id = '';
            let i = 0;
            pk.forEach(key => {
                id += registro[key];
                if(i < pk.length - 1){
                    id += '_';
                }
                i++;
            });
            const idCodificado = encodeURIComponent(id);
            const urlEdicion = datosTabla!.urlEdicion + idCodificado;
            console.log(`Abriendo ventana para editar al ID: ${id}`);
            window.location.href = urlEdicion;
        };
        if(tabla != 'materiasporcarrera' && tabla != 'alumnosporcarrera'){
            var celdaEditar = row.insertCell();
            celdaEditar.appendChild(botonEditar);
        }
        // Creacion boton borrar
        var celdaBorrar = row.insertCell();
        var botonBorrar = dom('button', { class: 'boton-borrar', type: 'button' }, [text('Borrar')]) as HTMLButtonElement;

        botonBorrar.onclick = async () => {
            const pk = datosTabla!.pk;
            let id = '';
            let i = 0;
            pk.forEach(key => {
                id += registro[key];
                if(i < pk.length - 1){
                    id += '_';
                }
                i++;
            });

            console.log(`Borrando al ${datosTabla!.tabla}: ${id}`);
            try{
                var req = await fetch('/api/v0/' + (datosTabla!.tabla === 'alumno' ? 'alumnos' : datosTabla!.tabla) + '/' + encodeURIComponent(id), {
                    method: 'DELETE'
                });
                console.log(req.status);
                if (req.ok) {
                    alert('Datos borrados correctamente.');
                    window.location.reload();
                }
            }
            catch(error){
                console.error('Error al borrar los datos: ', error);
                alert('Error al borrar los datos.');
            }
        };
        celdaBorrar.appendChild(botonBorrar);
    })
})