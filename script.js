const productos = [
  {nombre:"Balón Pro 1 GOLARY", precio:60000, categoria:"Accesorios futbolísticos", imagen:"https://i.imgur.com/ORgclXZ.png", elo:1000},
  {nombre:"Balón Pro 2", precio:60000, categoria:"Accesorios futbolísticos", imagen:"https://i.imgur.com/PTABqwG.png", elo:1000},
  {nombre:"Uniforme Blanco", precio:80000, categoria:"Indumentaria deportiva", imagen:"https://i.imgur.com/cuX7ggP.png", elo:1000},
  {nombre:"Uniforme Negro", precio:80000, categoria:"Indumentaria deportiva", imagen:"https://i.imgur.com/5t673Up.png", elo:1000},
  {nombre:"Uniforme Azul", precio:80000, categoria:"Indumentaria deportiva", imagen:"https://i.imgur.com/4jsmZ7c.png", elo:1000},
  {nombre:"Medias Azules", precio:20000, categoria:"Ropa deportiva", imagen:"https://i.imgur.com/RR9BGml.png", elo:1000},
  {nombre:"Medias Blanco con azul", precio:20000, categoria:"Ropa deportiva", imagen:"https://i.imgur.com/YLbSJr2.png", elo:1000},
  {nombre:"Medias Blanco con negro", precio:20000, categoria:"Ropa deportiva", imagen:"https://i.imgur.com/DPntDhJ.png", elo:1000},
  {nombre:"Medias Negras", precio:20000, categoria:"Ropa deportiva", imagen:"https://i.imgur.com/X3GThbL.png", elo:1000},
  {nombre:"Medias Grises", precio:20000, categoria:"Ropa deportiva", imagen:"https://i.imgur.com/GatOr9t.png", elo:1000},
  {nombre:"Chaqueta Azul", precio:120000, categoria:"Ropa deportiva", imagen:"https://i.imgur.com/4rMWBBu.png", elo:1000},
  {nombre:"Chaqueta Verde", precio:120000, categoria:"Ropa deportiva", imagen:"https://i.imgur.com/mqbaZdI.png", elo:1000},
  {nombre:"Tenis ", precio:150000, categoria:"Accesorios futbolísticos", imagen:"https://i.imgur.com/sM9J8CL.png", elo:1000},
 {nombre:"Tenis 2", precio:150000, categoria:"Accesorios futbolísticos", imagen:"https://i.imgur.com/ESBuxg6.png", elo:1000},
  {nombre:"Tenis 3", precio:150000, categoria:"Accesorios futbolísticos", imagen:"https://i.imgur.com/Fj59516.png", elo:1000}
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function formatear(precio){
  return precio.toLocaleString("es-CO");
}

/* =========================
   PRODUCTOS
========================= */
function mostrarProductos(lista){
  const cont=document.getElementById("productos");
  cont.innerHTML="";

  lista.forEach(p=>{
    const div=document.createElement("div");
    div.className="producto";

    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${formatear(p.precio)}</p>

${
(p.categoria.includes("Ropa") || p.categoria.includes("Indumentaria")) ? `
<div class="tallas">
  <span>Talla:</span>
  <select class="select-talla">
    <option value="">Seleccionar</option>
    <option value="S">S</option>
    <option value="M">M</option>
    <option value="L">L</option>
    <option value="XL">XL</option>
  </select>
</div>
` : (p.nombre.toLowerCase().includes("tenis")) ? `
<div class="tallas">
  <span>Talla:</span>
  <select class="select-talla">
    <option value="">Seleccionar</option>
    <option>36</option>
    <option>37</option>
    <option>38</option>
    <option>39</option>
    <option>40</option>
    <option>41</option>
    <option>42</option>
    <option>43</option>
    <option>44</option>
    <option>45</option>
  </select>
</div>
` : ''
}

      <button>Agregar</button>
    `;
    div.querySelectorAll(".talla-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    div.querySelectorAll(".talla-btn").forEach(b=>b.classList.remove("activa"));
    btn.classList.add("activa");
  });
});

    div.querySelector("button").addEventListener("click",()=>{
      let talla="";
      const selectTalla = div.querySelector(".select-talla");
      if(selectTalla) talla=selectTalla.value;

      agregarCarrito({...p, talla});
      
      const imagen = div.querySelector("img");
animarVuelo(imagen);
const boton = div.querySelector("button");

// animación rápida
boton.classList.add("animar");

// estado agregado
boton.classList.add("agregado");
boton.textContent = "✔ Agregado";

// quitar animación corta
setTimeout(()=>{
  boton.classList.remove("animar");
}, 300);

// volver a normal
setTimeout(()=>{
  boton.classList.remove("agregado");
  boton.textContent = "Agregar";
}, 1500);
    });

    cont.appendChild(div);
  });
}

function animarVuelo(imagenElemento){
  const carritoIcono = document.querySelector(".carrito-icono");

  const imgRect = imagenElemento.getBoundingClientRect();
  const carritoRect = carritoIcono.getBoundingClientRect();

  const img = imagenElemento.cloneNode(true);
  img.classList.add("fly-img");

  img.style.top = imgRect.top + "px";
  img.style.left = imgRect.left + "px";

  document.body.appendChild(img);

  setTimeout(()=>{
    img.style.top = carritoRect.top + "px";
    img.style.left = carritoRect.left + "px";
    img.style.width = "30px";
    img.style.height = "30px";
    img.style.opacity = "0.5";
  }, 50);

  setTimeout(()=>{
    img.remove();
  }, 900);
}
/* =========================
   CARRITO
========================= */
function agregarCarrito(producto){
  carrito.push(producto);
  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito(){
  const lista=document.getElementById("lista-carrito");
  const noti=document.getElementById("notificacion-carrito");

  lista.innerHTML="";
  let total=0;

  if(carrito.length > 0){
    noti.style.display = "block";
  } else {
    noti.style.display = "none";
  }

  carrito.forEach(p=>{
    total+=p.precio;

    const li=document.createElement("li");
   li.textContent = `${p.nombre} ${p.talla ? '(Talla: ' + p.talla + ')' : ''} - $${formatear(p.precio)}`;
    lista.appendChild(li);
  });

  document.getElementById("total").innerText="$"+formatear(total);
}

function guardarCarrito(){
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarrito(){
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

function toggleCarrito(){
  const dropdown = document.getElementById("carrito-dropdown");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

/* =========================
   PAGO WHATSAPP
========================= */
function pagar(){
  if(carrito.length===0){
    alert("Tu carrito está vacío");
    return;
  }

  let mensaje = "*Pedido Glaxon*\n\n*Artículos:*\n";

  carrito.forEach(item=>{
    mensaje += `- ${item.nombre}, ${item.talla || 'sin talla'}\n`;
  });

  let total = carrito.reduce((sum,item)=>sum+item.precio,0);

  mensaje += `\n*TOTAL=* ${total.toLocaleString('es-CO')} COP\n\n`;

  mensaje += "*Datos de ENVIO* (Completar los espacios)\n\n";
  mensaje += "Nombres:\nDocumento:\nTeléfono:\nDirección completa:\nBarrio:\nCiudad:\nDepartamento:\n\n";

  mensaje += "*Método de Pago* (Escribir solo el que desea usar)\n";
  mensaje += "Nequi, Daviplata, Bre-b o Contraentrega";

  const url = `https://wa.me/573142598596?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

/* =========================
   FILTROS
========================= */
function crearFiltros(){
  const nav=document.getElementById("filtros");
  const categorias=["Todos", ...new Set(productos.map(p=>p.categoria))];

  categorias.forEach(cat=>{
    const btn=document.createElement("button");
    btn.textContent=cat;

    btn.addEventListener("click",()=>{
      mostrarProductos(cat==="Todos"
        ? productos
        : productos.filter(p=>p.categoria===cat)
      );
    });

    nav.appendChild(btn);
  });
}

/* =========================
   TOP
========================= */
function mostrarTop(){
  const t = document.getElementById("top");
  const topP = [...productos].sort((a,b)=>b.elo-a.elo).slice(0,3);

  t.innerHTML = "";

  topP.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "card-top";

    div.innerHTML = `
      <span class="ranking">#${index + 1}</span>
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
    `;

    t.appendChild(div);
  });
}

/* =========================
   RECOMENDADOS
========================= */
function mostrarRecomendados(){
  const r = document.getElementById("recomendados");
  const rand = [...productos].sort(()=>0.5-Math.random()).slice(0,4);

  r.innerHTML = "";

  rand.forEach(p => {
    const div = document.createElement("div");
    div.className = "card-recomendado";

 div.innerHTML = `
  <img src="${p.imagen}" alt="${p.nombre}">
  <h3>${p.nombre}</h3>
`;

    r.appendChild(div);
  });
}

/* =========================
   DUELO
========================= */
function duelo(){
  const d=document.getElementById("duelo");

  let a=productos[Math.floor(Math.random()*productos.length)];
  let b=productos[Math.floor(Math.random()*productos.length)];

  while(a.nombre===b.nombre){
    b=productos[Math.floor(Math.random()*productos.length)];
  }

  d.innerHTML="";

  [a,b].forEach(p=>{
    const div=document.createElement("div");

   div.innerHTML = `
  <div class="producto duelo-card">
    <img src="${p.imagen}" alt="${p.nombre}">
    <h3>${p.nombre}</h3>
    <p>$${formatear(p.precio)}</p>
  </div>
`;

    div.addEventListener("click",()=>{
      p.elo+=10;
      mostrarTop();
      duelo();
    });

    d.appendChild(div);
  });
}

/* =========================
   INICIO
========================= */
crearFiltros();
mostrarProductos(productos);
mostrarTop();
mostrarRecomendados();
duelo();
actualizarCarrito();
