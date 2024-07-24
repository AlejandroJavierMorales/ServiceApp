
![Logo](/assets/images/services.png)


# AppServices

Aplicación de Oferta de Servicios para dispositivos móviles Android y IOS.




## Descripción de General

### Rubros en 3 Niveles

En general, la apicación presenta en su pantalla principal una serie de cards con distintas categorías de servicios: Comercios, Deportes, Educación, Gastronomía, Recreación, Salud, Servicios y Turismo.
Cada Categoría puede tener subcategorías y a su vez, las subcategorías pueden tener sub-subcategorias. Esta estructura de 3 niveles máximo, conforma una cantidad de rubros compuestos por el últio eslabón de la cadena de relación entre categoria, subcategoría y subsubcategoría. De modo que, por ejemplo, como la categoría Deportes no tiene subcategorías asociadas, concideramos a Deportes como un Rubro en el que se podran insribir prestadores de servicios deportivos.
En el caso de la categoría Gastronomía, tiene asociadas algunas subcategorías entre las que podrán ver Restoranes. Como la subcategoría Restoranes no tiene subsubcategorias asociadas, Restoranes será otro de los rubros a los que se puedan inscribir quienes tengan un restorán.
Por último, el ejemplo de sub-subcategorías lo tenemos con Turismo, que tiene las subcategoría Alojamiento y esta a su vez la sub-subcategoría Cabañas, entre otras. Para este caso el rubro de tercer nivel será Cabañas.

![App Screenshot](/assets/images/screenshots/principal.png)

### Prestadores de Servicios

Los Publishers que se inscriban y asocien a cada rubro se mostrarán en un listado dentro del rubro correspondiente. Cada publisher tiene una breve descripción de lo que ofrecen, un ícono de Location de modo que se podrá ver, através de las coordenadas en base de datos, su ubicación en el mapa, un ícono de Whatsapp, a través del cual podrán ser contactados, y un ícono de Ver Detalle que mostrará la información del servicio mucho más detallada.


## Tecnología Utilizada

Desarrollada en React Native y Expo. La base de datos utilizada es Real Time database de Firebase. Firebase Storage para almacenar imagenes de perfil y Google Maps API para mostrar ubicaciones.
Para debug y simulación se utilizó VS Code como entorno de desarrollo, Expo Go para correr la aplicación en el dispositivo y Android Studio para correr la applicación en PC.

## Funcionalidades o Features

Esta aplicación administra Estados Globales a través de React-Redux y Redux ToolKit, Persistencia de Sesión de Usuario con SQLite y el almacenamiento de datos con Real Time Database de Firebase.
En Cada Publisher se implementó Location con Expo-Location y React-Native-Maps utilizando la API de Google para mostrar ubicaciones con datos de distancias.
En el User Profile se implemetan expo-image-picker y expo-camera para definir la imagen de perfil del usuario desde la galería del dispositivo o con la cámara del mismo. La persistencia de dichas imágenes se realiza en el Storage de Firebase.
Ademas se implementan Checkbox con Expo-Checkbox, Carrusel de Imagenes con React-Native-Swiper

### Navegación

Para Navegar la Aplicación, la misma presenta la siguiente estructura:

1. BottomTabNavigator: que permite acceder al Home, User o Search Screen desde el extremo inferior de la pantalla.
2. HomeStackNavigator: permite navegar entre Home (categorías), SubCategorías, Sub-SubCategoría y La Lista de Publishers y LocationScreen.
3. UserStackNavigator: Cuando a través del BottomTabNavigation se accede al la opción Usuario, si no está logueado mostrara la pantalla de Login. Una vez Logueado se mostrará la pantalla de Perfil de Usuario y este stack ppermitirá navegar entre el Perfil de Usuario y el Registro de Tareas (ToDoNotes Feature), mostrando una barra de navegación secundaria con estas opciones además de la opción para cerrar sessión de usuario.
4. AuthStackNavigator: Permite navegar entre las pantallas de Login (singIn) y Registro de Usuario (SignUp)

Además se implenetó un Menú Principal, del tipo hamburquesa desde el cual se puede navegar a Home, User Profile, Search Screen y posee una opción de "Publicar en la App" para que quien quera ofrecer sus servicios pueda contactarse.

![App Screenshot](/assets/images/screenshots/MenuPrincipal.png)

## Busqueda de un Prestador de Servicios

Quien desee buscar un prestador en la aplicación podrá hacerlo navegando las tarjetas de categorías o Rubros hasta llegar al servicio buscado donde se mostrarán los prestadores disponibles.
Los prestadores se dispondrán en un listado con el Nombre del Prestador, una pequeña descripción y la posibilidad de ver su ubicación, enviarle un whatsapp o ver en detalle la iformación del mismo.

![App Screenshot](/assets/images/screenshots/publisher_list.png)

### Search Screen (buscar servicio)

Esta alternativa peromite en forma más directa acceder a un prestador de servicios. La búsqueda se puede realizar por Rubro, Descripción o por ambas opciones, Rubro y Descripción.
Para el caso de la búsqueda por descripción la misma se realiza recorriendo array de palabras y/o frases clave cargadas en la propidedad keywords del documento Publisher.


![App Screenshot](/assets/images/screenshots/SearchScreen.png)

![App Screenshot](/assets/images/screenshots/SearchScreen_2.png)



## Location

En el listado de prestadores, haciendo click en el icono de Location, previa solicitud del permiso correspondiente, se mostrará en el mapa una referencia como centro del mapa (una ubicación conocida de color verde) y un marcador con la ubicación del Publisher (rojo) . Haciendo click sobre dicho marcador se podrá ver la informacion del mismo (Nombre, Dirección y Teléfono) y la distancia desde la ubicación de referencia.
Además en la parte superior de la pantalla encontrarán un switch para "Ver mi Ubicación" lo cual desplegara en el mapa u marcador (azul) con la ubicación actua. Ahora, haciendo click sobre el marcador del publisher la distancia se calculará desde mi posición.


![App Screenshot](/assets/images/screenshots/publisher_Location1.png)

![App Screenshot](/assets/images/screenshots/publisher_Location2.png)

![App Screenshot](/assets/images/screenshots/publisher_Location3.png)


## Login y Registro de Usuario

Para poder acceder a la funcionalidades personales de un usuario será necesario contar con una cuenta activa en la aplicación.
Para ello, al intentar acceder a las mismas se mostrará una pantalla de Login para quien ya tenga una cuenta creada, y una opción de Registro para crearla, si no la tuviera. 
En esta última debera ingresar un email válido y una contraseña, repitiendo la misma para confirmarla. Una vez realizado el registro podrá acceder realizando el Login con sus credenciales.
En caso de haber iniciado sesión anteriormente y no haber cerrado la misma, directamente accederá a las funciones de Usuario ya que la sessión quedó guardada en el dispositivo.


![App Screenshot](/assets/images/screenshots/Login.png)


## User Profile

Al ingresar en la opción Usuario (icono central de menu de la parte inferior de la pantalla), si esta logueado acederá a las funcionalidades habilitadas para un usuario de la aplicación.

Las mismas son:

1. Información de Perfil: El usuario podrá seleccionar una imagen de perfil utilizando la cámara del dispositivo, previa solicitud del permiso correspondiente, o desde la galería de imágenes del mismo.
2. Acceder al su registro de tarean en el cual podrá guardar anotaciones, moodificarlas o eliminarlas.


![App Screenshot](/assets/images/screenshots/userProfile.png)

![App Screenshot](/assets/images/screenshots/userNotes.png)


## IMPORTANTE! Información para el testing de Funcionalidad

En el mensaje de entrega se describe el link a los archivos con las API Key necesarias:
firebase.js
googlemap.js
realtimeDataBase.js
users.js
---------------------

Existen 3 usuarios cargados en base de datos:

user1@gmail.com (con imagen de perfil utilizando la camara)
pass: 123456

user2@gmail.com (con imagen de perfil utilizando la galería)
pass: 123456

user3@gmail.com (sin imagen de perfil)
pass: 123456

---------------------

Publishers: Para ver publishers y acceder las features de Location, WhatsAPP y Ver Datalles podrán hacerlo accediendo desde la pantalla principal en la dategoria Deportes, en la categoría Gartronomía/ subcategoría Restoranes y en la categoría Turismo/ subcategoría Alojamientos/ sub-subcategoría Cabañas.

Search Screen: Las busquedas por descripción se realizan segun un array de keywords cargadas en la propiedad keywords del documento publishers de RealTimaDataBase. Se deja a propósito la keyword "pp" en todos los publishers para que al buscar por descripción con esa clave se vean todos en el resultado.
Pueden buscar por "asado" y aparecerá el restoran, o "asador" y aparecerán el restoran y las cabañas.

keywords:
pizzas,empanadas,cabrito, asado, vacio,pastas,pp
cabañas con pileta,asador,parque,frente al rio,pp
futbol,paddle,tenis,voley,pp


