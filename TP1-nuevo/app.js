/**
 * ==========================================================================
 * APLICACIÓN INTERACTIVA TP N° 1 - TEORÍA DE SISTEMAS OPERATIVOS (UNJu FI)
 * Cátedra: Ing. María Fernanda Vázquez | JTP: Ing. Fabio D. Argañaraz
 * ==========================================================================
 */

// ==================== DATOS Y ESTRUCTURAS DE EJERCICIOS ====================

const EJ2_ITEMS = [
  { id: 'gestion_procesos', label: '1. Creación, planificación y sincronización de procesos (CPU Scheduling)' },
  { id: 'administracion_memoria', label: '2. Asignación y liberación dinámica de espacio en memoria RAM' },
  { id: 'gestion_dispositivos_io', label: '3. Manejo de buffering, caching y comunicación con drivers de E/S' },
  { id: 'diseno_paginas_web', label: '4. Diseño visual de páginas web y hojas de estilo CSS' },
  { id: 'administracion_sistema_archivos', label: '5. Organización lógica de directorios y almacenamiento persistente' },
  { id: 'gestion_usuarios_permisos', label: '6. Control de acceso, autenticación y listas de permisos (ACL)' },
  { id: 'edicion_imagenes', label: '7. Edición y renderizado de filtros fotográficos y mapas de bits' },
  { id: 'deteccion_errores_proteccion', label: '8. Detección y recuperación ante fallos de hardware o división por cero' }
];

const EJ3_ROWS = [
  {
    dim: 'Definición & Arquitectura',
    mt_id: 'hardware_multithreading',
    mc_id: 'hardware_multicore',
    mt_options: [
      { val: '', label: '-- Seleccionar --' },
      { val: 'hw_multiple_cpu_cores', label: 'Múltiples núcleos de procesamiento físicos independientes en el mismo chip de silicio' },
      { val: 'hw_single_core_multi_regs', label: 'Un único núcleo físico con registros y Program Counter duplicados por hilo' },
      { val: 'hw_multiple_servers', label: 'Múltiples placas madre interconectadas por fibra óptica' }
    ],
    mc_options: [
      { val: '', label: '-- Seleccionar --' },
      { val: 'hw_single_core_multi_regs', label: 'Un único núcleo físico con registros y Program Counter duplicados por hilo' },
      { val: 'hw_virtual_emulated', label: 'Un emulador de software sobre una máquina virtual' },
      { val: 'hw_multiple_cpu_cores', label: 'Múltiples núcleos de procesamiento físicos independientes en el mismo chip de silicio' }
    ]
  },
  {
    dim: 'Tipo de Paralelismo',
    mt_id: 'paralelismo_multithreading',
    mc_id: 'paralelismo_multicore',
    mt_options: [
      { val: '', label: '-- Seleccionar --' },
      { val: 'par_fisico_simultaneo', label: 'Paralelismo físico real simultáneo (múltiples ALUs ejecutando a la vez)' },
      { val: 'par_logico_concurrencia', label: 'Paralelismo lógico / Concurrencia (aprovecha latencias de memoria en 1 sola ALU)' },
      { val: 'par_secuencial_puro', label: 'Ejecución estrictamente secuencial por lotes' }
    ],
    mc_options: [
      { val: '', label: '-- Seleccionar --' },
      { val: 'par_simulado_red', label: 'Paralelismo distribuido por paso de mensajes en red' },
      { val: 'par_fisico_simultaneo', label: 'Paralelismo físico real simultáneo (múltiples ALUs ejecutando a la vez)' },
      { val: 'par_logico_concurrencia', label: 'Paralelismo lógico / Concurrencia (aprovecha latencias de memoria en 1 sola ALU)' }
    ]
  },
  {
    dim: 'Rendimiento & Eficiencia',
    mt_id: 'rendimiento_multithreading',
    mc_id: 'rendimiento_multicore',
    mt_options: [
      { val: '', label: '-- Seleccionar --' },
      { val: 'perf_alto_paralelo', label: 'Incremento sustancial casi lineal proporcional a la cantidad de núcleos físicos' },
      { val: 'perf_nulo', label: 'Sin impacto en el rendimiento global' },
      { val: 'perf_moderado_latencia', label: 'Incremento moderado (~15-30%) al ocultar tiempos de espera de memoria caché/RAM' }
    ],
    mc_options: [
      { val: '', label: '-- Seleccionar --' },
      { val: 'perf_fijo', label: 'Rendimiento idéntico a un uniprocesador' },
      { val: 'perf_moderado_latencia', label: 'Incremento moderado (~15-30%) al ocultar tiempos de espera de memoria caché/RAM' },
      { val: 'perf_alto_paralelo', label: 'Incremento sustancial casi lineal proporcional a la cantidad de núcleos físicos' }
    ]
  },
  {
    dim: 'Costo de Silicio & Consumo',
    mt_id: 'costo_multithreading',
    mc_id: 'costo_multicore',
    mt_options: [
      { val: '', label: '-- Seleccionar --' },
      { val: 'cost_alto_mayor_silicio', label: 'Alto costo en área de chip y mayor consumo energético/disipación térmica' },
      { val: 'cost_bajo_menor_silicio', label: 'Bajo costo extra de silicio (~5%) y bajo impacto en disipación térmica' },
      { val: 'cost_gratuito', label: 'Costo cero sin modificación física' }
    ],
    mc_options: [
      { val: '', label: '-- Seleccionar --' },
      { val: 'cost_medio_variable', label: 'Costo dependiente únicamente de la memoria ROM' },
      { val: 'cost_alto_mayor_silicio', label: 'Alto costo en área de chip y mayor consumo energético/disipación térmica' },
      { val: 'cost_bajo_menor_silicio', label: 'Bajo costo extra de silicio (~5%) y bajo impacto en disipación térmica' }
    ]
  }
];

const EJ4_ITEMS = [
  { id: 'item_chrome_exe', text: 'El archivo "Chrome.exe" almacenado en el disco rígido' },
  { id: 'item_chrome_ram', text: 'Google Chrome abierto cargando pestañas y consumiendo memoria RAM' },
  { id: 'item_word_exe', text: 'El archivo ejecutable "Word.exe" guardado en Archivos de Programa' },
  { id: 'item_word_editing', text: 'Microsoft Word ejecutándose con un documento abierto mientras se escribe' },
  { id: 'item_game_installed', text: 'Un videojuego instalado y alojado en la unidad SSD' },
  { id: 'item_game_running', text: 'El videojuego en ejecución interactuando con la GPU y el procesador' }
];

const EJ5_SITUATIONS = [
  { id: 'sit_guardar_carpeta', text: 'Guardar un archivo de texto en una carpeta del disco rígido o SSD', correctToken: 'FS_MGMT' },
  { id: 'sit_imprimir_pdf', text: 'Enviar un documento PDF a la cola de impresión física', correctToken: 'IO_MGMT' },
  { id: 'sit_abrir_simultaneo', text: 'Abrir y alternar simultáneamente entre un navegador y un IDE de programación', correctToken: 'PROC_MGMT' },
  { id: 'sit_usar_mouse_teclado', text: 'Mover el cursor o escribir un caracter mediante interrupciones de periféricos', correctToken: 'IO_INTERRUPT' },
  { id: 'sit_doble_clic_icono', text: 'Hacer doble clic en un ícono de la GUI para solicitar al kernel la carga de una app', correctToken: 'SYS_CALL_GUI' },
  { id: 'sit_asignar_ram_app', text: 'Reservar un bloque de memoria contigua o páginas para un proceso nuevo', correctToken: 'MEM_MGMT' }
];

const EJ5_OPTIONS = [
  { val: '', label: '-- Seleccionar Componente / Servicio --' },
  { val: 'FS_MGMT', label: '📁 Gestión del Sistema de Archivos y Directorios' },
  { val: 'IO_MGMT', label: '🖨️ Gestión de Entrada/Salida (E/S) y Buffering / Spooling' },
  { val: 'PROC_MGMT', label: '⚙️ Gestión de Procesos y Planificador de CPU (Scheduler)' },
  { val: 'MEM_MGMT', label: '🧠 Gestión de Memoria Principal (Asignación y Paginación)' },
  { val: 'IO_INTERRUPT', label: '⚡ Manejo de Interrupciones de Hardware y Controladores de E/S' },
  { val: 'SYS_CALL_GUI', label: '🖥️ Interfaz Gráfica (GUI) y Llamadas al Sistema (System Calls)' }
];

const EJ6_ACTIONS = [
  { id: 'act_1_word', text: '1. Escribir texto y dar formato en Microsoft Word' },
  { id: 'act_2_admin_ram', text: '2. Modificar las tablas de asignación de memoria RAM del sistema' },
  { id: 'act_3_vlc', text: '3. Decodificar fotogramas y reproducir una película en VLC Media Player' },
  { id: 'act_4_irq_teclado', text: '4. Atender una interrupción física generada por el controlador de teclado' },
  { id: 'act_5_crear_proceso', text: '5. Ejecutar la llamada fork()/CreateProcess() para crear un nuevo proceso' },
  { id: 'act_6_navegar_web', text: '6. Parsear código HTML y renderizar una página web en Chrome' },
  { id: 'act_7_controlador_disco', text: '7. Enviar comandos directos de bajo nivel al controlador de disco rígido' },
  { id: 'act_8_excel', text: '8. Realizar cálculos y fórmulas matemáticas en una planilla de Excel' },
  { id: 'act_9_asignar_cpu', text: '9. Realizar la conmutación de contexto (Context Switch) en el planificador' },
  { id: 'act_10_permisos_archivos', text: '10. Validar permisos de seguridad y atributos de acceso a un archivo del sistema' },
  { id: 'act_11_modificar_mapa_memoria', text: '11. Actualizar los registros Base y Límite de la Unidad de Gestión de Memoria (MMU)' },
  { id: 'act_12_cambiar_reloj_hw', text: '12. Reconfigurar el registro del temporizador de hardware (Timer)' },
  { id: 'act_13_escribir_busqueda', text: '13. Procesar un evento de interfaz de usuario en una pestaña del navegador' },
  { id: 'act_14_reconocer_usb', text: '14. Detectar la conexión Plug & Play de un dispositivo USB y cargar su driver' },
  { id: 'act_15_asignar_memoria_chrome', text: '15. Modificar el mapa de marcos libres para alojar las páginas de Chrome' }
];

const EJ7_VF_QUESTIONS = [
  { id: 'vf_1_kernel_admin_hw', text: '1. El kernel es el núcleo central del SO y se encarga de administrar de forma privilegiada los recursos de hardware.' },
  { id: 'vf_2_monolitico_user_space', text: '2. En un kernel monolítico puro, todos los servicios del sistema (archivos, drivers, red) se ejecutan en espacio de usuario.' },
  { id: 'vf_3_linux_monolitico', text: '3. Linux implementa una arquitectura basada fundamentalmente en kernel monolítico (con módulos cargables).' },
  { id: 'vf_4_microkernel_esenciales', text: '4. En un microkernel, solamente las funciones mínimas y esenciales (IPC, gestión básica de memoria y CPU) residen en modo núcleo.' },
  { id: 'vf_5_microkernel_seguridad', text: '5. Los microkernels suelen ofrecer mayor seguridad y tolerancia a fallos porque los drivers corren fuera del espacio del núcleo.' },
  { id: 'vf_6_fallo_monolitico_afecta_todo', text: '6. Un fallo crítico (kernel panic o pantalla azul) en un controlador dentro de un kernel monolítico puede colapsar todo el sistema.' },
  { id: 'vf_7_minix_qnx_microkernel', text: '7. MINIX y QNX son ejemplos clásicos y reconocidos de sistemas operativos estructurados como microkernel.' },
  { id: 'vf_8_hibridos_combinan', text: '8. Los kernels híbridos buscan combinar la velocidad de los monolíticos con aspectos modulares del microkernel.' },
  { id: 'vf_9_windows11_hibrido', text: '9. Las versiones modernas de Windows (incluyendo Windows 10 y 11) utilizan una arquitectura de kernel híbrido (núcleo NT).' },
  { id: 'vf_10_microkernel_mayor_rendimiento', text: '10. Los microkernels superan ampliamente en velocidad bruta a los monolíticos debido a que tienen menos líneas de código en el núcleo.' },
  { id: 'vf_11_microkernel_servicios_fuera', text: '11. En una arquitectura microkernel, el sistema de archivos y los controladores de dispositivos se ejecutan como procesos de usuario.' },
  { id: 'vf_12_comunicacion_monolitico_mas_rapida', text: '12. La comunicación entre componentes dentro de un kernel monolítico es más rápida porque se realiza mediante llamadas directas a funciones.' },
  { id: 'vf_13_macos_xnu_hibrido', text: '13. macOS utiliza el núcleo XNU, que combina elementos de Mach (microkernel) y FreeBSD (monolítico) en un diseño híbrido.' },
  { id: 'vf_14_microkernel_modularidad_mantenimiento', text: '14. La principal ventaja de los microkernels radica en su alta modularidad, facilidad de mantenimiento y verificación formal.' },
  { id: 'vf_15_hibridos_eliminan_desventajas_total', text: '15. Los kernels híbridos logran eliminar por completo y al 100% todas las desventajas tanto de los monolíticos como de los microkernels.' }
];

const EJ8_ZONES = [
  { id: 'SO_RT_HARD', title: '⏱️ Tiempo Real Estricto (Hard Real-Time)' },
  { id: 'SO_MAINFRAME', title: '🏢 Mainframe / Grandes Servidores de Transacciones' },
  { id: 'SO_EMBEDDED', title: '🔌 Sistemas Embebidos / Integrados' },
  { id: 'SO_PC', title: '💻 Computación Personal (PC / Laptops)' },
  { id: 'SO_SERVER', title: '🌐 Servidores de Red / Cloud / E-Commerce' },
  { id: 'SO_SMARTCARD', title: '💳 Tarjetas Inteligentes (Smart Cards / SIM)' },
  { id: 'SO_MULTIPROC_DISTRIB', title: '🚀 Multiprocesadores / Supercómputo Distribuido' },
  { id: 'SO_MOBILE', title: '📱 Dispositivos Móviles (Smartphones / Tablets)' }
];

const EJ8_ITEMS = [
  { id: 'so_marcapasos', text: 'Sistema de control bio-electrónico de un marcapasos cardíaco' },
  { id: 'so_cajeros_banco', text: 'Sistema central de procesamiento masivo para cajeros de la red bancaria' },
  { id: 'so_horno_secado', text: 'Sistema integrado que controla los sensores y temperatura de un horno industrial' },
  { id: 'so_aeropuerto_vuelos', text: 'Sistema de radar y control de aproximación de aterrizaje en un aeropuerto' },
  { id: 'so_laptop_estudiante', text: 'Uso cotidiano de una computadora portátil para ofimática y estudio' },
  { id: 'so_ecommerce_web', text: 'Portal de comercio electrónico con soporte para miles de conexiones concurrentes' },
  { id: 'so_tarjeta_sim', text: 'Chip de gestión de seguridad criptográfica en una tarjeta SIM / tarjeta de crédito' },
  { id: 'so_supercomputadora', text: 'Clúster de cálculo científico para modelado climático con cientos de procesadores' },
  { id: 'so_horno_microondas', text: 'Microcontrolador integrado con lógica de control de un microondas inteligente' },
  { id: 'so_smartphone', text: 'Dispositivo Android o iOS con soporte para pantalla táctil, GPS y apps móviles' },
  { id: 'so_transparente_multiprocesador', text: 'Sistema operativo que gestiona múltiples CPUs físicas ocultando la complejidad al usuario' }
];

const EJ9_QUESTIONS = [
  {
    id: 'mc_dma',
    title: '1. ¿Cuál es el propósito y ventaja fundamental del mecanismo DMA (Direct Memory Access)?',
    options: [
      { val: 'dma_pipeline_sync', label: 'Obligar a la CPU a gestionar activamente cada ciclo de bus mediante sondeo continuo (polling) de los registros de estado del periférico para evitar desbordes en la memoria caché L3.' },
      { val: 'dma_libera_cpu', label: 'Permite transferir bloques enteros de datos entre periféricos y la memoria RAM sin intervención de la CPU por cada byte, interrumpiendo solo al finalizar el bloque.' },
      { val: 'dma_aumenta_reloj', label: 'Duplicar automáticamente la frecuencia del bus frontal del procesador para acelerar la decodificación y ejecución de instrucciones aritméticas complejas.' },
      { val: 'dma_elimina_ram', label: 'Eliminar la necesidad de utilizar memoria principal RAM mediante almacenamiento y mapeo directo exclusivo en la memoria de la placa gráfica (VRAM).' }
    ]
  },
  {
    id: 'mc_localidad_cache',
    title: '2. ¿Qué principio justifica y hace viable la utilización de la jerarquía de memoria y la memoria Caché?',
    options: [
      { val: 'costo_lineal_volatilidad', label: 'La premisa de que la memoria Caché es de menor costo por gigabyte y posee capacidad ilimitada para almacenar el código ejecutable de todos los procesos activos sin recurrir a memoria virtual.' },
      { val: 'volatilidad_nula', label: 'El hecho de que la memoria Caché es estática y no volátil, lo que permite restaurar el estado del núcleo de forma inalterable tras un apagado intempestivo del suministro eléctrico.' },
      { val: 'localidad_temporal_espacial', label: 'El principio de Localidad de Referencia (Localidad Temporal y Espacial): los programas acceden repetidamente a datos e instrucciones cercanas en el tiempo y espacio.' },
      { val: 'compresion_hardware', label: 'El algoritmo de compresión por hardware que reduce el tamaño de las instrucciones de 64 bits a nivel de microcódigo antes de ingresarlas a los registros del procesador.' }
    ]
  },
  {
    id: 'mc_registros_base_limite',
    title: '3. ¿Cómo protegen el hardware y el SO el espacio de memoria de un proceso frente a accesos indebidos de otros programas?',
    options: [
      { val: 'cifrado_disco', label: 'Cifrando las particiones del disco rígido mediante algoritmos asimétricos y exigiendo autenticación biométrica en cada lectura de archivos.' },
      { val: 'antivirus_ring3', label: 'Ejecutando un proceso demonio de supervisión continua en Modo Usuario que intercepta cada acceso a la RAM y finaliza los hilos que excedan el 80% del uso de CPU.' },
      { val: 'proteccion_espacio_memoria', label: 'Mediante pares de registros Base y Límite (o tablas de páginas con bits de protección) controlados por la MMU en Modo Kernel.' },
      { val: 'aislamiento_cableado', label: 'Separando físicamente las líneas de datos del bus de direcciones para que cada aplicación instalada acceda a un zócalo de memoria independiente.' }
    ]
  },
  {
    id: 'mc_temporizador_cpu',
    title: '4. ¿Cuál es la función del Temporizador de Hardware (Timer) en la protección de la CPU?',
    options: [
      { val: 'enfriar_procesador_throttling', label: 'Monitorear la temperatura térmica de los núcleos de silicio para reducir dinámicamente el voltaje y la frecuencia de reloj cuando el procesador supera los límites de disipación.' },
      { val: 'mostrar_reloj_pantalla', label: 'Únicamente sincronizar los protocolos de red NTP y mostrar la hora y fecha del sistema en la barra de tareas de la interfaz gráfica.' },
      { val: 'evita_monopolio_cpu', label: 'Generar interrupciones periódicas fijas para asegurar que el SO retome el control y ningún proceso monopolice la CPU indefinidamente.' },
      { val: 'medir_duracion_bateria', label: 'Calcular la tasa de consumo de energía en dispositivos portátiles midiendo los ciclos de carga y descarga de los condensadores de la placa madre.' }
    ]
  },
  {
    id: 'mc_sysgen_proposito',
    title: '5. ¿En qué consiste el proceso de Generación del Sistema Operativo (SYSGEN)?',
    options: [
      { val: 'generacion_usuarios_permisos_ldap', label: 'El procedimiento administrativo mediante el cual se configuran las cuentas de usuario, directivas de auditoría de seguridad y árboles de dominio en servidores LDAP corporativos.' },
      { val: 'adaptar_so_hardware_especifico', label: 'Configurar, seleccionar componentes y compilar el SO adaptándolo a la arquitectura de hardware específica de una máquina.' },
      { val: 'formatear_disco', label: 'Formatear una partición NTFS o ext4 creando la tabla de asignación de archivos antes de iniciar la instalación de software.' },
      { val: 'benchmark_rendimiento', label: 'Ejecutar pruebas sintéticas de estrés en la memoria RAM y disco para determinar la puntuación de rendimiento del equipo.' }
    ]
  }
];

const EJ10_ITEMS = [
  { id: 'mvp_timer_hardware', text: '1. El hardware cuenta con un temporizador que emite una interrupción periódica al alcanzar cero.' },
  { id: 'mvp_quantum_20ms', text: '2. Se establece que cada proceso de usuario interactivo dispondrá de un Quantum de 20 milisegundos de CPU.' },
  { id: 'mvp_bit_modo_dual', text: '3. La CPU implementa un bit de modo físico en el registro de estado para distinguir Modo Usuario de Modo Kernel.' },
  { id: 'mvp_prioridad_proceso_alta', text: '4. Se otorga prioridad máxima de ejecución a los procesos del sistema frente a tareas de usuario en segundo plano.' },
  { id: 'mvp_registros_base_limite', text: '5. La MMU comprueba en cada ciclo que la dirección de memoria esté dentro del rango del Registro Base y Límite.' },
  { id: 'mvp_politica_reemplazo_lru', text: '6. Cuando la memoria se llena, se decide expulsar a disco la página que hace más tiempo no se utiliza (Algoritmo LRU).' }
];

// ==================== ESTADO GLOBAL DE LA APLICACIÓN ====================

const AppState = {
  student: {
    name: '',
    dni: '',
    career: '',
    github: ''
  },
  answers: {
    ej1_definicion: '',
    ej2_funciones_so: {},
    ej3_multithreading_vs_multicore: {},
    ej4_programa_vs_proceso: {},
    ej5_funciones_situaciones: {},
    ej6_modo_usuario_kernel: {},
    ej7_estructuras_kernel_vf: {},
    ej8_tipos_sistemas_operativos: {},
    ej9_arquitectura_proteccion_mc: {},
    ej10_mecanismos_vs_politicas: {}
  }
};

const STORAGE_KEY = 'TSO_TP1_2026_PROGRESS';

// ==================== INICIALIZACIÓN Y RENDERIZADO ====================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderAllExercises();
  loadSavedProgress();
  setupEventListeners();
  updateProgress();
});

function initTheme() {
  const savedTheme = localStorage.getItem('TSO_THEME') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('TSO_THEME', next);
    });
  }
}

function renderAllExercises() {
  renderEJ2();
  renderEJ3();
  renderEJ4();
  renderEJ5();
  renderEJ6();
  renderEJ7();
  renderEJ8();
  renderEJ9();
  renderEJ10();
  setupBiblioToggles();
}

// Render Ejercicio 2
function renderEJ2() {
  const tbody = document.getElementById('ej2-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  EJ2_ITEMS.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.label}</strong></td>
      <td style="text-align: center;">
        <div class="segmented-toggle">
          <label class="segmented-option">
            <input type="radio" name="ej2_${item.id}" value="true" onchange="handleEJ2Change('${item.id}', true)">
            <span class="segmented-label green-tag">Sí</span>
          </label>
          <label class="segmented-option">
            <input type="radio" name="ej2_${item.id}" value="false" onchange="handleEJ2Change('${item.id}', false)">
            <span class="segmented-label red-tag">No</span>
          </label>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function handleEJ2Change(itemId, val) {
  AppState.answers.ej2_funciones_so[itemId] = val;
  saveProgress();
  updateProgress();
}

// Render Ejercicio 3
function renderEJ3() {
  const tbody = document.getElementById('ej3-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  EJ3_ROWS.forEach(row => {
    const tr = document.createElement('tr');
    
    let mtOptsHtml = row.mt_options.map(o => `<option value="${o.val}">${o.label}</option>`).join('');
    let mcOptsHtml = row.mc_options.map(o => `<option value="${o.val}">${o.label}</option>`).join('');

    tr.innerHTML = `
      <td><strong>${row.dim}</strong></td>
      <td>
        <select class="situation-select" style="width: 100%;" id="ej3_${row.mt_id}" onchange="handleEJ3Change('${row.mt_id}', this.value)">
          ${mtOptsHtml}
        </select>
      </td>
      <td>
        <select class="situation-select" style="width: 100%;" id="ej3_${row.mc_id}" onchange="handleEJ3Change('${row.mc_id}', this.value)">
          ${mcOptsHtml}
        </select>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function handleEJ3Change(key, val) {
  AppState.answers.ej3_multithreading_vs_multicore[key] = val;
  saveProgress();
  updateProgress();
}

// Render Ejercicio 4
function renderEJ4() {
  const pool = document.getElementById('ej4-source-pool');
  if (!pool) return;
  pool.innerHTML = '';

  EJ4_ITEMS.forEach(item => {
    const el = createDragItem(item.id, item.text, 'ej4');
    pool.appendChild(el);
  });

  setupDropZone('zone-ej4-programa', 'PROGRAMA', 'ej4');
  setupDropZone('zone-ej4-proceso', 'PROCESO', 'ej4');
  setupDropZone('ej4-pool-wrapper', 'POOL', 'ej4');
}

// Render Ejercicio 5
function renderEJ5() {
  const container = document.getElementById('ej5-list');
  if (!container) return;
  container.innerHTML = '';

  EJ5_SITUATIONS.forEach((sit, idx) => {
    const div = document.createElement('div');
    div.className = 'situation-row';
    
    let opts = EJ5_OPTIONS.map(o => `<option value="${o.val}">${o.label}</option>`).join('');

    div.innerHTML = `
      <div class="situation-desc">
        <span class="badge-tag" style="min-width: 28px; text-align: center;">${idx + 1}</span>
        <span>${sit.text}</span>
      </div>
      <div>
        <select class="situation-select" id="ej5_${sit.id}" onchange="handleEJ5Change('${sit.id}', this.value)">
          ${opts}
        </select>
      </div>
    `;
    container.appendChild(div);
  });
}

function handleEJ5Change(id, val) {
  AppState.answers.ej5_funciones_situaciones[id] = val;
  saveProgress();
  updateProgress();
}

// Render Ejercicio 6
function renderEJ6() {
  const tbody = document.getElementById('ej6-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  EJ6_ACTIONS.forEach(act => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${act.text}</td>
      <td style="text-align: center;">
        <div class="segmented-toggle">
          <label class="segmented-option">
            <input type="radio" name="ej6_${act.id}" value="MU" onchange="handleEJ6Change('${act.id}', 'MU')">
            <span class="segmented-label green-tag">MU (Usuario)</span>
          </label>
          <label class="segmented-option">
            <input type="radio" name="ej6_${act.id}" value="MK" onchange="handleEJ6Change('${act.id}', 'MK')">
            <span class="segmented-label purple-tag">MK (Kernel)</span>
          </label>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function handleEJ6Change(id, val) {
  AppState.answers.ej6_modo_usuario_kernel[id] = val;
  saveProgress();
  updateProgress();
}

// Render Ejercicio 7
function renderEJ7() {
  const tbody = document.getElementById('ej7-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  EJ7_VF_QUESTIONS.forEach(q => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${q.text}</td>
      <td style="text-align: center;">
        <div class="segmented-toggle">
          <label class="segmented-option">
            <input type="radio" name="ej7_${q.id}" value="true" onchange="handleEJ7Change('${q.id}', true)">
            <span class="segmented-label green-tag">V (Verdadero)</span>
          </label>
          <label class="segmented-option">
            <input type="radio" name="ej7_${q.id}" value="false" onchange="handleEJ7Change('${q.id}', false)">
            <span class="segmented-label red-tag">F (Falso)</span>
          </label>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function handleEJ7Change(id, val) {
  AppState.answers.ej7_estructuras_kernel_vf[id] = val;
  saveProgress();
  updateProgress();
}

// Render Ejercicio 8
function renderEJ8() {
  const pool = document.getElementById('ej8-source-pool');
  const zonesGrid = document.getElementById('ej8-drop-zones');
  if (!pool || !zonesGrid) return;
  
  pool.innerHTML = '';
  zonesGrid.innerHTML = '';

  EJ8_ITEMS.forEach(item => {
    const el = createDragItem(item.id, item.text, 'ej8');
    pool.appendChild(el);
  });

  EJ8_ZONES.forEach(z => {
    const card = document.createElement('div');
    card.className = 'drop-zone-card';
    card.id = `zone-ej8-${z.id}`;
    card.setAttribute('data-zone-id', z.id);
    
    card.innerHTML = `
      <div class="drop-zone-header">
        <div class="drop-zone-title">${z.title}</div>
        <span class="drop-zone-counter" id="count-ej8-${z.id}">0</span>
      </div>
      <div class="drop-zone-items" id="items-ej8-${z.id}">
        <div class="drop-zone-placeholder">Arrastra aquí situaciones correspondientes</div>
      </div>
    `;
    zonesGrid.appendChild(card);
    setupDropZone(card.id, z.id, 'ej8');
  });

  setupDropZone('ej8-source-pool', 'POOL', 'ej8');
}

// Render Ejercicio 9
function renderEJ9() {
  const container = document.getElementById('ej9-questions-container');
  if (!container) return;
  container.innerHTML = '';

  EJ9_QUESTIONS.forEach(q => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.background = 'var(--bg-primary)';
    card.style.marginBottom = '0';
    
    let optsHtml = q.options.map(opt => `
      <label class="option-radio-card">
        <input type="radio" name="ej9_${q.id}" value="${opt.val}" onchange="handleEJ9Change('${q.id}', '${opt.val}')">
        <div class="option-content">
          <span class="option-text">${opt.label}</span>
        </div>
      </label>
    `).join('');

    card.innerHTML = `
      <h3 style="font-size: 0.98rem; font-weight: 700; margin-bottom: 12px; color: var(--text-primary);">${q.title}</h3>
      <div class="options-list">
        ${optsHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

function handleEJ9Change(qid, val) {
  AppState.answers.ej9_arquitectura_proteccion_mc[qid] = val;
  saveProgress();
  updateProgress();
}

// Render Ejercicio 10
function renderEJ10() {
  const tbody = document.getElementById('ej10-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  EJ10_ITEMS.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.text}</td>
      <td style="text-align: center;">
        <div class="segmented-toggle">
          <label class="segmented-option">
            <input type="radio" name="ej10_${item.id}" value="MECANISMO" onchange="handleEJ10Change('${item.id}', 'MECANISMO')">
            <span class="segmented-label green-tag">Mecanismo (CÓMO)</span>
          </label>
          <label class="segmented-option">
            <input type="radio" name="ej10_${item.id}" value="POLITICA" onchange="handleEJ10Change('${item.id}', 'POLITICA')">
            <span class="segmented-label purple-tag">Política (QUÉ)</span>
          </label>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function handleEJ10Change(id, val) {
  AppState.answers.ej10_mecanismos_vs_politicas[id] = val;
  saveProgress();
  updateProgress();
}

// ==================== DRAG & DROP ROBUSTO CON CLICK FALLBACK ====================

let draggedItemId = null;
let draggedExerciseType = null;

function createDragItem(id, text, exerciseType) {
  const div = document.createElement('div');
  div.className = 'drag-item';
  div.id = `drag-${exerciseType}-${id}`;
  div.setAttribute('draggable', 'true');
  div.setAttribute('data-item-id', id);
  div.setAttribute('data-exercise', exerciseType);

  div.innerHTML = `
    <span class="drag-icon">⠿</span>
    <span>${text}</span>
  `;

  // HTML5 Drag Events
  div.addEventListener('dragstart', (e) => {
    draggedItemId = id;
    draggedExerciseType = exerciseType;
    div.classList.add('is-dragging');
    e.dataTransfer.setData('text/plain', JSON.stringify({ id, exerciseType }));
    e.dataTransfer.effectAllowed = 'move';
  });

  div.addEventListener('dragend', () => {
    div.classList.remove('is-dragging');
    draggedItemId = null;
    draggedExerciseType = null;
  });

  // Click handler para mover fácilmente si no se usa mouse drag
  div.addEventListener('dblclick', () => {
    moveItemToNextZone(id, exerciseType);
  });

  return div;
}

function setupDropZone(zoneElementId, zoneId, exerciseType) {
  const el = document.getElementById(zoneElementId);
  if (!el) return;

  el.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (draggedExerciseType === exerciseType) {
      el.classList.add('drag-over');
      e.dataTransfer.dropEffect = 'move';
    }
  });

  el.addEventListener('dragleave', () => {
    el.classList.remove('drag-over');
  });

  el.addEventListener('drop', (e) => {
    e.preventDefault();
    el.classList.remove('drag-over');
    
    let raw = e.dataTransfer.getData('text/plain');
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data.exerciseType === exerciseType) {
        assignItemToZone(data.id, zoneId, exerciseType);
      }
    } catch(err) {
      console.error(err);
    }
  });
}

function assignItemToZone(itemId, targetZoneId, exerciseType) {
  const itemEl = document.getElementById(`drag-${exerciseType}-${itemId}`);
  if (!itemEl) return;

  if (exerciseType === 'ej4') {
    if (targetZoneId === 'POOL') {
      delete AppState.answers.ej4_programa_vs_proceso[itemId];
      const pool = document.getElementById('ej4-source-pool');
      pool.appendChild(itemEl);
    } else {
      AppState.answers.ej4_programa_vs_proceso[itemId] = targetZoneId;
      const targetItemsContainer = document.getElementById(`items-ej4-${targetZoneId.toLowerCase()}`);
      if (targetItemsContainer) {
        targetItemsContainer.appendChild(itemEl);
      }
    }
    updateEJ4Counters();
  } else if (exerciseType === 'ej8') {
    if (targetZoneId === 'POOL') {
      delete AppState.answers.ej8_tipos_sistemas_operativos[itemId];
      const pool = document.getElementById('ej8-source-pool');
      pool.appendChild(itemEl);
    } else {
      AppState.answers.ej8_tipos_sistemas_operativos[itemId] = targetZoneId;
      const targetContainer = document.getElementById(`items-ej8-${targetZoneId}`);
      if (targetContainer) {
        targetContainer.appendChild(itemEl);
      }
    }
    updateEJ8Counters();
  }

  saveProgress();
  updateProgress();
}

function updateEJ4Counters() {
  const pCount = Object.values(AppState.answers.ej4_programa_vs_proceso).filter(v => v === 'PROGRAMA').length;
  const prCount = Object.values(AppState.answers.ej4_programa_vs_proceso).filter(v => v === 'PROCESO').length;

  const countP = document.getElementById('count-ej4-programa');
  const countPR = document.getElementById('count-ej4-proceso');
  if (countP) countP.textContent = `${pCount} items`;
  if (countPR) countPR.textContent = `${prCount} items`;

  // Placeholders
  togglePlaceholder('items-ej4-programa', pCount === 0);
  togglePlaceholder('items-ej4-proceso', prCount === 0);
}

function updateEJ8Counters() {
  EJ8_ZONES.forEach(z => {
    const count = Object.values(AppState.answers.ej8_tipos_sistemas_operativos).filter(v => v === z.id).length;
    const badge = document.getElementById(`count-ej8-${z.id}`);
    if (badge) badge.textContent = `${count}`;
    togglePlaceholder(`items-ej8-${z.id}`, count === 0);
  });
}

function togglePlaceholder(containerId, show) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let ph = container.querySelector('.drop-zone-placeholder');
  if (show) {
    if (!ph) {
      ph = document.createElement('div');
      ph.className = 'drop-zone-placeholder';
      ph.textContent = 'Suelta aquí los elementos correspondientes';
      container.appendChild(ph);
    }
  } else {
    if (ph) ph.remove();
  }
}

// ==================== BIBLIOGRAPHIC ACCORDIONS ====================

function setupBiblioToggles() {
  document.querySelectorAll('.biblio-header').forEach(header => {
    header.addEventListener('click', () => {
      const guide = header.closest('.biblio-guide');
      const body = guide.querySelector('.biblio-body');
      if (body.style.display === 'none') {
        body.style.display = 'flex';
        header.querySelector('span:last-child').textContent = '▼';
      } else {
        body.style.display = 'none';
        header.querySelector('span:last-child').textContent = '▶';
      }
    });
  });

  const btnAll = document.getElementById('btn-open-biblio-all');
  if (btnAll) {
    let allOpen = true;
    btnAll.addEventListener('click', () => {
      allOpen = !allOpen;
      document.querySelectorAll('.biblio-body').forEach(b => {
        b.style.display = allOpen ? 'flex' : 'none';
      });
      document.querySelectorAll('.biblio-header span:last-child').forEach(s => {
        s.textContent = allOpen ? '▼' : '▶';
      });
      showToast(allOpen ? 'Guías bibliográficas expandidas' : 'Guías bibliográficas colapsadas');
    });
  }
}

// ==================== PROGRESS & COMPLETION TRACKER ====================

function updateProgress() {
  let completedCount = 0;
  const totalExercises = 10;

  // EJ 1
  const ej1Done = !!AppState.answers.ej1_definicion;
  updateStatusBadge('status-ej1', ej1Done);
  if (ej1Done) completedCount++;

  // EJ 2
  const ej2Done = Object.keys(AppState.answers.ej2_funciones_so).length === EJ2_ITEMS.length;
  updateStatusBadge('status-ej2', ej2Done);
  if (ej2Done) completedCount++;

  // EJ 3
  const ej3Done = Object.keys(AppState.answers.ej3_multithreading_vs_multicore).length === 8 &&
    Object.values(AppState.answers.ej3_multithreading_vs_multicore).every(v => v !== '');
  updateStatusBadge('status-ej3', ej3Done);
  if (ej3Done) completedCount++;

  // EJ 4
  const ej4Done = Object.keys(AppState.answers.ej4_programa_vs_proceso).length === EJ4_ITEMS.length;
  updateStatusBadge('status-ej4', ej4Done);
  if (ej4Done) completedCount++;

  // EJ 5
  const ej5Done = Object.keys(AppState.answers.ej5_funciones_situaciones).length === EJ5_SITUATIONS.length &&
    Object.values(AppState.answers.ej5_funciones_situaciones).every(v => v !== '');
  updateStatusBadge('status-ej5', ej5Done);
  if (ej5Done) completedCount++;

  // EJ 6
  const ej6Done = Object.keys(AppState.answers.ej6_modo_usuario_kernel).length === EJ6_ACTIONS.length;
  updateStatusBadge('status-ej6', ej6Done);
  if (ej6Done) completedCount++;

  // EJ 7
  const ej7Done = Object.keys(AppState.answers.ej7_estructuras_kernel_vf).length === EJ7_VF_QUESTIONS.length;
  updateStatusBadge('status-ej7', ej7Done);
  if (ej7Done) completedCount++;

  // EJ 8
  const ej8Done = Object.keys(AppState.answers.ej8_tipos_sistemas_operativos).length === EJ8_ITEMS.length;
  updateStatusBadge('status-ej8', ej8Done);
  if (ej8Done) completedCount++;

  // EJ 9
  const ej9Done = Object.keys(AppState.answers.ej9_arquitectura_proteccion_mc).length === EJ9_QUESTIONS.length;
  updateStatusBadge('status-ej9', ej9Done);
  if (ej9Done) completedCount++;

  // EJ 10
  const ej10Done = Object.keys(AppState.answers.ej10_mecanismos_vs_politicas).length === EJ10_ITEMS.length;
  updateStatusBadge('status-ej10', ej10Done);
  if (ej10Done) completedCount++;

  const pct = Math.round((completedCount / totalExercises) * 100);
  const bar = document.getElementById('progress-bar');
  const label = document.getElementById('progress-percentage');
  
  if (bar) bar.style.width = `${pct}%`;
  if (label) label.textContent = `${pct}% (${completedCount}/${totalExercises} completados)`;
}

function updateStatusBadge(badgeId, isDone) {
  const el = document.getElementById(badgeId);
  if (!el) return;
  if (isDone) {
    el.className = 'exercise-status completed';
    el.textContent = '✓ Completo';
  } else {
    el.className = 'exercise-status';
    el.textContent = 'Incompleto';
  }
}

// ==================== PERSISTENCIA LOCAL ====================

function saveProgress() {
  // Sync Student Data
  AppState.student.name = document.getElementById('student-name')?.value || '';
  AppState.student.dni = document.getElementById('student-dni')?.value || '';
  AppState.student.career = document.getElementById('student-career')?.value || '';
  AppState.student.github = document.getElementById('student-github')?.value || '';

  // Radio EJ1
  const selEj1 = document.querySelector('input[name="ej1_definicion"]:checked');
  if (selEj1) AppState.answers.ej1_definicion = selEj1.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState));
}

function loadSavedProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    if (saved.student) {
      AppState.student = saved.student;
      if (document.getElementById('student-name')) document.getElementById('student-name').value = saved.student.name || '';
      if (document.getElementById('student-dni')) document.getElementById('student-dni').value = saved.student.dni || '';
      if (document.getElementById('student-career')) document.getElementById('student-career').value = saved.student.career || saved.student.group || '';
      if (document.getElementById('student-github')) document.getElementById('student-github').value = saved.student.github || '';
    }
    if (saved.answers) {
      restoreAnswers(saved.answers);
    }
  } catch (err) {
    console.error('Error restaurando progreso:', err);
  }
}

function restoreAnswers(ans) {
  // EJ 1
  if (ans.ej1_definicion) {
    AppState.answers.ej1_definicion = ans.ej1_definicion;
    const r = document.querySelector(`input[name="ej1_definicion"][value="${ans.ej1_definicion}"]`);
    if (r) r.checked = true;
  }

  // EJ 2
  if (ans.ej2_funciones_so) {
    AppState.answers.ej2_funciones_so = ans.ej2_funciones_so;
    Object.entries(ans.ej2_funciones_so).forEach(([id, val]) => {
      const r = document.querySelector(`input[name="ej2_${id}"][value="${val}"]`);
      if (r) r.checked = true;
    });
  }

  // EJ 3
  if (ans.ej3_multithreading_vs_multicore) {
    AppState.answers.ej3_multithreading_vs_multicore = ans.ej3_multithreading_vs_multicore;
    Object.entries(ans.ej3_multithreading_vs_multicore).forEach(([id, val]) => {
      const sel = document.getElementById(`ej3_${id}`);
      if (sel) sel.value = val;
    });
  }

  // EJ 4
  if (ans.ej4_programa_vs_proceso) {
    AppState.answers.ej4_programa_vs_proceso = ans.ej4_programa_vs_proceso;
    Object.entries(ans.ej4_programa_vs_proceso).forEach(([id, zone]) => {
      assignItemToZone(id, zone, 'ej4');
    });
  }

  // EJ 5
  if (ans.ej5_funciones_situaciones) {
    AppState.answers.ej5_funciones_situaciones = ans.ej5_funciones_situaciones;
    Object.entries(ans.ej5_funciones_situaciones).forEach(([id, val]) => {
      const sel = document.getElementById(`ej5_${id}`);
      if (sel) sel.value = val;
    });
  }

  // EJ 6
  if (ans.ej6_modo_usuario_kernel) {
    AppState.answers.ej6_modo_usuario_kernel = ans.ej6_modo_usuario_kernel;
    Object.entries(ans.ej6_modo_usuario_kernel).forEach(([id, val]) => {
      const r = document.querySelector(`input[name="ej6_${id}"][value="${val}"]`);
      if (r) r.checked = true;
    });
  }

  // EJ 7
  if (ans.ej7_estructuras_kernel_vf) {
    AppState.answers.ej7_estructuras_kernel_vf = ans.ej7_estructuras_kernel_vf;
    Object.entries(ans.ej7_estructuras_kernel_vf).forEach(([id, val]) => {
      const r = document.querySelector(`input[name="ej7_${id}"][value="${val}"]`);
      if (r) r.checked = true;
    });
  }

  // EJ 8
  if (ans.ej8_tipos_sistemas_operativos) {
    AppState.answers.ej8_tipos_sistemas_operativos = ans.ej8_tipos_sistemas_operativos;
    Object.entries(ans.ej8_tipos_sistemas_operativos).forEach(([id, zone]) => {
      assignItemToZone(id, zone, 'ej8');
    });
  }

  // EJ 9
  if (ans.ej9_arquitectura_proteccion_mc) {
    AppState.answers.ej9_arquitectura_proteccion_mc = ans.ej9_arquitectura_proteccion_mc;
    Object.entries(ans.ej9_arquitectura_proteccion_mc).forEach(([qid, val]) => {
      const r = document.querySelector(`input[name="ej9_${qid}"][value="${val}"]`);
      if (r) r.checked = true;
    });
  }

  // EJ 10
  if (ans.ej10_mecanismos_vs_politicas) {
    AppState.answers.ej10_mecanismos_vs_politicas = ans.ej10_mecanismos_vs_politicas;
    Object.entries(ans.ej10_mecanismos_vs_politicas).forEach(([id, val]) => {
      const r = document.querySelector(`input[name="ej10_${id}"][value="${val}"]`);
      if (r) r.checked = true;
    });
  }
}

// ==================== EVENT LISTENERS & MODALES ====================

function setupEventListeners() {
  // Input fields student
  ['student-name', 'student-dni', 'student-career', 'student-github'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', saveProgress);
  });

  // Radios EJ1
  document.querySelectorAll('input[name="ej1_definicion"]').forEach(r => {
    r.addEventListener('change', (e) => {
      AppState.answers.ej1_definicion = e.target.value;
      saveProgress();
      updateProgress();
    });
  });

  // Modal Exportar
  const btnExport = document.getElementById('btn-export-json');
  const exportModal = document.getElementById('export-modal');
  const btnCloseExport = document.getElementById('btn-close-export-modal');
  const btnModalCancel = document.getElementById('btn-modal-cancel');
  const btnConfirmDownload = document.getElementById('btn-confirm-download');
  const btnCopyGitCmd = document.getElementById('btn-copy-git-cmd');

  if (btnExport) {
    btnExport.addEventListener('click', () => {
      saveProgress();
      if (!AppState.student.name || !AppState.student.dni) {
        showToast('⚠️ Por favor completa tu Nombre y DNI antes de exportar.', 'warning');
        document.getElementById('student-name')?.focus();
        return;
      }
      exportModal.classList.add('active');
    });
  }

  if (btnCloseExport) btnCloseExport.addEventListener('click', () => exportModal.classList.remove('active'));
  if (btnModalCancel) btnModalCancel.addEventListener('click', () => exportModal.classList.remove('active'));

  if (btnConfirmDownload) {
    btnConfirmDownload.addEventListener('click', () => {
      downloadJSONPayload();
      exportModal.classList.remove('active');
      showToast('🎉 ¡Archivo respuestas_tp1.json descargado con éxito!', 'success');
    });
  }

  if (btnCopyGitCmd) {
    btnCopyGitCmd.addEventListener('click', () => {
      const cmd = `git add respuestas_tp1.json && git commit -m "TP1 Resuelto - ${AppState.student.name || 'Alumno'}" && git push origin main`;
      navigator.clipboard.writeText(cmd).then(() => {
        showToast('📋 Comando Git copiado al portapapeles', 'success');
      });
    });
  }

  // Modal Guía Git
  const btnGitGuide = document.getElementById('btn-git-guide');
  const gitModal = document.getElementById('git-modal');
  const btnCloseGitModal = document.getElementById('btn-close-git-modal');
  const btnCloseGitGuide = document.getElementById('btn-close-git-guide');

  if (btnGitGuide) btnGitGuide.addEventListener('click', () => gitModal.classList.add('active'));
  if (btnCloseGitModal) btnCloseGitModal.addEventListener('click', () => gitModal.classList.remove('active'));
  if (btnCloseGitGuide) btnCloseGitGuide.addEventListener('click', () => gitModal.classList.remove('active'));

  // Importar JSON
  const btnImport = document.getElementById('btn-import-json');
  const fileInput = document.getElementById('file-input-json');

  if (btnImport && fileInput) {
    btnImport.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileImport);
  }
}

// ==================== EXPORTACIÓN / IMPORTACIÓN JSON ====================

function downloadJSONPayload() {
  saveProgress();

  const payload = {
    tp_metadata: {
      tp_id: 'TSO-2026-TP1',
      title: 'TP N° 1: Introducción a los Sistemas Operativos y Estructuras de Computación',
      catedra: 'Teoría de Sistemas Operativos - UNJu Facultad de Ingeniería',
      version: '1.0.0',
      submitted_at: new Date().toISOString()
    },
    student: {
      name: AppState.student.name.trim(),
      dni: AppState.student.dni.trim(),
      career: (AppState.student.career || '').trim(),
      github: AppState.student.github.trim()
    },
    answers: AppState.answers
  };

  const jsonStr = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'respuestas_tp1.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function handleFileImport(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (data.answers) {
        if (data.student) {
          AppState.student = data.student;
          if (document.getElementById('student-name')) document.getElementById('student-name').value = data.student.name || '';
          if (document.getElementById('student-dni')) document.getElementById('student-dni').value = data.student.dni || '';
          if (document.getElementById('student-career')) document.getElementById('student-career').value = data.student.career || data.student.group || '';
          if (document.getElementById('student-github')) document.getElementById('student-github').value = data.student.github || '';
        }
        restoreAnswers(data.answers);
        saveProgress();
        updateProgress();
        showToast('📥 Progreso restaurado exitosamente desde el archivo JSON', 'success');
      } else {
        showToast('❌ El archivo seleccionado no contiene el formato de respuestas válido.', 'error');
      }
    } catch (err) {
      showToast('❌ Error al procesar el archivo JSON: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
}

// ==================== TOAST NOTIFICATIONS ====================

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
